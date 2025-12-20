'use client';

import { useEffect } from 'react';

/**
 * Hook to detect iOS devices and add appropriate class to HTML element
 * Adds 'not-ios' class for non-iOS devices; iOS devices use default styles
 */
export function useIosDetection() {
  useEffect(() => {
    // Detect iOS devices including iPadOS 13+
    const isIOS =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    const htmlElement = document.documentElement;

    if (isIOS) {
      htmlElement.classList.remove('not-ios');
    } else {
      htmlElement.classList.add('not-ios');
    }
  }, []);
}
