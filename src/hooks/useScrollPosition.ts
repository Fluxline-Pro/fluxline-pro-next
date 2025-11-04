'use client';

import { useEffect, useState } from 'react';

/**
 * Returns the current scroll position of the window.
 * Useful for implementing scroll-based animations and effects.
 *
 * @param throttleMs - Throttle delay in milliseconds (default: 100ms)
 * @returns Object containing scrollX and scrollY positions
 *
 * @example
 * ```tsx
 * const { scrollY } = useScrollPosition();
 *
 * return (
 *   <div
 *     style={{
 *       opacity: scrollY > 100 ? 0.5 : 1,
 *       transition: 'opacity 0.3s'
 *     }}
 *   >
 *     Content fades when scrolled past 100px
 *   </div>
 * );
 * ```
 */
export function useScrollPosition(throttleMs: number = 100) {
  const [scrollPosition, setScrollPosition] = useState({
    scrollX: 0,
    scrollY: 0,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      setScrollPosition({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    };

    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, throttleMs);
      }
    };

    // Set initial position after mount
    handleScroll();

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [throttleMs]);

  return scrollPosition;
}
