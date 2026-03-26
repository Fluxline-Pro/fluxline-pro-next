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
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

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

    const scheduleCheck = (delay = RESIZE_DEBOUNCE_DELAY) => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }

      resizeTimer = setTimeout(checkScrollable, delay);
    };

    const handleResize = () => {
      scheduleCheck();
    };

    // Initial check with delays to ensure content is rendered
    const initialTimer = setTimeout(checkScrollable, INITIAL_CHECK_DELAY);
    const secondaryTimer = setTimeout(checkScrollable, SECONDARY_CHECK_DELAY);

    // Set up ResizeObserver to monitor size changes
    const resizeObserver = new ResizeObserver(() => {
      scheduleCheck();
    });

    const mutationObserver = new MutationObserver(() => {
      scheduleCheck();
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);

      // Observe the immediate content node as well because scrollHeight can change
      // without the wrapper element's own box dimensions changing.
      const contentNode = ref.current.firstElementChild;
      if (contentNode instanceof HTMLElement) {
        resizeObserver.observe(contentNode);
      }

      mutationObserver.observe(ref.current, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    // Also listen for window resize
    window.addEventListener('resize', handleResize);

    // Browser zoom and devtools docking can change the visual viewport without
    // producing descendant resize events in time for our existing checks.
    window.visualViewport?.addEventListener('resize', handleResize);

    // Re-check after fonts finish loading because text reflow can change whether
    // the content area needs scrolling.
    document.fonts?.ready.then(() => scheduleCheck(0));

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(secondaryTimer);
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return isScrollable;
};
