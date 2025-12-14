'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to calculate the actual footer height dynamically
 * This ensures proper spacing for the home page content where the footer is always visible
 *
 * Note: This hook is specifically designed for the home page fixed footer.
 * Other pages use a collapsible modal footer that doesn't need layout adjustments.
 */
export const useFooterHeight = (): string => {
  const [footerHeight, setFooterHeight] = useState('200px'); // Default fallback based on current design

  useEffect(() => {
    const calculateFooterHeight = () => {
      // Look for the footer element - try multiple selectors
      const footerElement =
        document.querySelector('footer') ||
        document.querySelector('[role="contentinfo"]') ||
        document.querySelector('[data-footer]');

      if (footerElement) {
        const height = footerElement.getBoundingClientRect().height;
        setFooterHeight(`${height}px`);
      }
    };

    // Calculate on mount
    calculateFooterHeight();

    // Recalculate on resize
    const handleResize = () => calculateFooterHeight();
    window.addEventListener('resize', handleResize);

    // Use ResizeObserver if available for more accurate detection
    let resizeObserver: ResizeObserver | null = null;
    const footerElement = document.querySelector('footer');

    if (footerElement && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        calculateFooterHeight();
      });
      resizeObserver.observe(footerElement);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return footerHeight;
};
