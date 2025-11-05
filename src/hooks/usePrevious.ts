'use client';

import { useRef } from 'react';

/**
 * Returns the previous value of a state or prop.
 * Useful for comparing current and previous values in effects.
 *
 * Note: This hook uses a pattern that stores the previous value
 * during render in a way that's safe with React's rules.
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
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T | undefined>(undefined);

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
}
