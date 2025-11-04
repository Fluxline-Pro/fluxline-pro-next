'use client';

import { useEffect } from 'react';

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
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if the target key matches
      if (event.key !== targetKey) {
        return;
      }

      // Check modifier keys if specified
      if (options?.ctrl && !event.ctrlKey) return;
      if (options?.shift && !event.shiftKey) return;
      if (options?.alt && !event.altKey) return;
      if (options?.meta && !event.metaKey) return;

      callback(event);
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [targetKey, callback, options]);
}
