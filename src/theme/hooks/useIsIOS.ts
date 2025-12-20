import { useState, useEffect } from 'react';

/**
 * useIsIOS Hook
 *
 * Detects iOS devices including modern iPads that report as macOS.
 * All iOS browsers use Safari's WebKit engine and may have rendering issues
 * with certain CSS properties like background gradients.
 *
 * Uses useState + useEffect to avoid SSR/CSR hydration mismatches.
 * Initial state is false (matches SSR), then updates on client mount.
 *
 * @returns {boolean} True if the device is running iOS (iPhone, iPad, iPod)
 */
export const useIsIOS = (): boolean => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof navigator === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const ua = navigator.userAgent || '';

    // Classic iOS detection (iPhone, iPad, iPod)
    const isClassicIOS = /iPhone|iPad|iPod/i.test(ua);

    // iPadOS 13+ can report as "Macintosh" when "Request Desktop Website" is enabled
    // Check for macOS user agent + touch capabilities to detect these devices
    const isIPadOS =
      /Macintosh/.test(ua) && 'ontouchend' in document.documentElement;

    setIsIOS(isClassicIOS || isIPadOS);
  }, []);

  return isIOS;
};
