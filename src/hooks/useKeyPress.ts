'use client';

import { useEffect, useRef } from 'react';

/**
 * Listens for specific keyboard key presses.
 * Useful for keyboard shortcuts and accessibility features.
 *
 * @param targetKey - The key to listen for (e.g., 'Escape', 'Enter')
 * @param callback - Function to call when the key is pressed
 * @param options - Optional configuration
 *
 * @example
 * ```tsx
 * useKeyPress('Escape', () => {
 *   closeModal();
 * });
 *
 * useKeyPress('Enter', () => {
 *   submitForm();
 * }, { ctrl: true }); // Only trigger when Ctrl+Enter is pressed
 * ```
 */
export function useKeyPress(
  targetKey: string,
  callback: (event: KeyboardEvent) => void,
  options?: {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
  }
): void {
  // Store callback in ref to avoid re-running effect when it changes
  const callbackRef = useRef(callback);
  const optionsRef = useRef(options);

  // Keep refs up to date
  useEffect(() => {
    callbackRef.current = callback;
    optionsRef.current = options;
  }, [callback, options]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the target key matches
      if (event.key !== targetKey) {
        return;
      }

      // Check modifier keys if specified
      const opts = optionsRef.current;
      if (opts?.ctrl && !event.ctrlKey) return;
      if (opts?.shift && !event.shiftKey) return;
      if (opts?.alt && !event.altKey) return;
      if (opts?.meta && !event.metaKey) return;

      callbackRef.current(event);
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [targetKey, callback, options?.ctrl, options?.shift, options?.alt, options?.meta]);
}
