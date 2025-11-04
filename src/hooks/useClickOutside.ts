'use client';

import { useEffect, useRef } from 'react';

/**
 * Detects clicks outside of a referenced element.
 * Useful for closing dropdowns, modals, and popovers when clicking outside.
 *
 * @param callback - Function to call when a click outside is detected
 *
 * @example
 * ```tsx
 * const ref = useClickOutside<HTMLDivElement>(() => {
 *   setIsOpen(false);
 * });
 *
 * return (
 *   <div ref={ref}>
 *     <DropdownContent />
 *   </div>
 * );
 * ```
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback]);

  return ref;
}
