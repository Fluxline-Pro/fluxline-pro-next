'use client';

import { useIosDetection } from '@/theme/hooks/useIosDetection';

/**
 * Client component that detects iOS and adds appropriate class to HTML element
 * Must be included in root layout to ensure iOS detection runs on all pages
 */
export function IosDetector() {
  useIosDetection();
  return null; // This component renders nothing
}
