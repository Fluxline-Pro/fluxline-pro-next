'use client';

import React from 'react';

// Timing constants for scrollable detection
const INITIAL_CHECK_DELAY = 50; // Wait for initial DOM paint
const SECONDARY_CHECK_DELAY = 200; // Wait for layout stabilization
const RESIZE_DEBOUNCE_DELAY = 50; // Debounce resize events

/**
 * Hook to detect if an element's content is scrollable
 * @param ref - Reference to the element to check
 * @returns boolean indicating if the content is scrollable
 */
export const useContentScrollable = (
  ref: React.RefObject<HTMLDivElement | null>
): boolean => {
  const [isScrollable, setIsScrollable] = React.useState(false);

  React.useEffect(() => {
    const checkScrollable = () => {
      if (!ref.current) {
        setIsScrollable(false);
        return;
      }

      const element = ref.current;
      // Check if content overflows vertically with a small threshold
      const hasVerticalScroll = element.scrollHeight > element.clientHeight + 5;
      setIsScrollable(hasVerticalScroll);
    };

    // Initial check with delays to ensure content is rendered
    const initialTimer = setTimeout(checkScrollable, INITIAL_CHECK_DELAY);
    const secondaryTimer = setTimeout(checkScrollable, SECONDARY_CHECK_DELAY);

    // Set up ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver(() => {
      // Small delay to ensure layout is complete after resize
      setTimeout(checkScrollable, RESIZE_DEBOUNCE_DELAY);
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    // Also listen for window resize
    window.addEventListener('resize', checkScrollable);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(secondaryTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', checkScrollable);
    };
  }, [ref]);

  return isScrollable;
};
