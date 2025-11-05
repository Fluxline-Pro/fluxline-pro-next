'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Manages state synchronized with localStorage.
 * Handles SSR gracefully and updates across browser tabs.
 *
 * @param key - The localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns A tuple of [value, setValue, removeValue]
 *
 * @example
 * ```tsx
 * const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light');
 *
 * return (
 *   <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
 *     Toggle Theme (current: {theme})
 *   </button>
 * );
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Subscribe to storage events
  const subscribe = useCallback(
    (callback: () => void) => {
      window.addEventListener('storage', callback);
      // Also listen to custom events for same-tab updates
      window.addEventListener(`localStorage-${key}`, callback);

      return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener(`localStorage-${key}`, callback);
      };
    },
    [key]
  );

  // Get the current snapshot (client-side)
  const getSnapshot = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  // Server-side snapshot (always returns initial value)
  const getServerSnapshot = useCallback((): T => {
    return initialValue;
  }, [initialValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Set value in localStorage
  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          newValue instanceof Function ? newValue(value) : newValue;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new Event(`localStorage-${key}`));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, value]
  );

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);

      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new Event(`localStorage-${key}`));
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key]);

  return [value, setValue, removeValue];
}
