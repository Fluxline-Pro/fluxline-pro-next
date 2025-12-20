import { useMemo } from 'react';

/**
 * useIsIOS Hook
 *
 * Detects iOS devices including modern iPads that report as macOS.
 * All iOS browsers use Safari's WebKit engine and may have rendering issues
 * with certain CSS properties like background gradients.
 *
 * @returns {boolean} True if the device is running iOS (iPhone, iPad, iPod)
 */
export const useIsIOS = (): boolean => {
  return useMemo(() => {
    if (typeof navigator === 'undefined' || typeof document === 'undefined') {
      return false;
    }

    const ua = navigator.userAgent || '';

    // Classic iOS detection (iPhone, iPad, iPod)
    const isClassicIOS = /iPhone|iPad|iPod/i.test(ua);

    // iPadOS 13+ can report as "Macintosh" when "Request Desktop Website" is enabled
    // Check for macOS user agent + touch capabilities to detect these devices
    const isIPadOS =
      /Macintosh/.test(ua) && 'ontouchend' in document.documentElement;

    return isClassicIOS || isIPadOS;
  }, []);
};
