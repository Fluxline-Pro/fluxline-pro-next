'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Manages state synchronized with sessionStorage.
 * Handles SSR gracefully. Unlike localStorage, doesn't sync across tabs.
 *
 * @param key - The sessionStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns A tuple of [value, setValue, removeValue]
 *
 * @example
 * ```tsx
 * const [formData, setFormData, clearFormData] = useSessionStorage('formDraft', {});
 *
 * return (
 *   <form>
 *     <input
 *       value={formData.name || ''}
 *       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 *     />
 *     <button type="button" onClick={clearFormData}>Clear Draft</button>
 *   </form>
 * );
 * ```
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Subscribe to custom storage events (sessionStorage doesn't fire storage events)
  const subscribe = useCallback(
    (callback: () => void) => {
      window.addEventListener(`sessionStorage-${key}`, callback);

      return () => {
        window.removeEventListener(`sessionStorage-${key}`, callback);
      };
    },
    [key]
  );

  // Get the current snapshot (client-side)
  const getSnapshot = useCallback((): T => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // Server-side snapshot (always returns initial value)
  const getServerSnapshot = useCallback((): T => {
    return initialValue;
  }, [initialValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Set value in sessionStorage
  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          newValue instanceof Function ? newValue(value) : newValue;

        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));

        // Dispatch custom event for updates
        window.dispatchEvent(new Event(`sessionStorage-${key}`));
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, value]
  );

  // Remove value from sessionStorage
  const removeValue = useCallback(() => {
    try {
      window.sessionStorage.removeItem(key);

      // Dispatch custom event for updates
      window.dispatchEvent(new Event(`sessionStorage-${key}`));
    } catch (error) {
      console.warn(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key]);

  return [value, setValue, removeValue];
}
