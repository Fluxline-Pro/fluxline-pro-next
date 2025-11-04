'use client';

import { useEffect, useRef } from 'react';

/**
 * Returns the previous value of a state or prop.
 * Useful for comparing current and previous values in effects.
 *
 * @param value - The value to track
 * @returns The previous value
 *
 * @example
 * ```tsx
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * useEffect(() => {
 *   if (prevCount !== undefined) {
 *     console.log(`Count changed from ${prevCount} to ${count}`);
 *   }
 * }, [count, prevCount]);
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
