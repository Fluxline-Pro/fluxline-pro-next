'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /**
   * Whether to freeze the observer after the first intersection
   */
  freezeOnceVisible?: boolean;
}

/**
 * Hook to track element visibility using Intersection Observer API.
 * Useful for lazy loading, scroll animations, and analytics.
 *
 * @param options - Intersection observer options
 * @returns A tuple of [ref, isIntersecting, entry]
 *
 * @example
 * ```tsx
 * const [ref, isVisible] = useIntersectionObserver({
 *   threshold: 0.5,
 *   freezeOnceVisible: true
 * });
 *
 * return (
 *   <div ref={ref} className={isVisible ? 'fade-in' : 'fade-out'}>
 *     I'll animate when visible
 *   </div>
 * );
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<T>, boolean, IntersectionObserverEntry | undefined] {
  const { freezeOnceVisible = false, ...observerOptions } = options;

  const ref = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = freezeOnceVisible && isIntersecting;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Don't create observer if frozen
    if (frozen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
      },
      observerOptions
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [frozen, observerOptions.threshold, observerOptions.root, observerOptions.rootMargin]);

  return [ref, isIntersecting, entry];
}
