'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Throttles a callback function, ensuring it's called at most once per specified interval.
 * Useful for rate-limiting expensive operations like scroll handlers or resize listeners.
 *
 * @param callback - The function to throttle
 * @param delay - Minimum time between calls in milliseconds (default: 500ms)
 * @returns The throttled function
 *
 * @example
 * ```tsx
 * const handleScroll = useThrottle(() => {
 *   console.log('Scroll position:', window.scrollY);
 * }, 100);
 *
 * useEffect(() => {
 *   window.addEventListener('scroll', handleScroll);
 *   return () => window.removeEventListener('scroll', handleScroll);
 * }, [handleScroll]);
 * ```
 */
export function useThrottle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number = 500
): T {
  const lastRan = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    ((...args: unknown[]) => {
      const now = Date.now();

      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(
          () => {
            callback(...args);
            lastRan.current = Date.now();
          },
          delay - (now - lastRan.current)
        );
      }
    }) as T,
    [callback, delay]
  );
}
