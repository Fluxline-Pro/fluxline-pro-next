'use client';

import { useEffect } from 'react';
import { usePressReleaseStore } from '../store/store';

/**
 * Custom hook for Press Release data management
 *
 * NOTE: This hook is legacy and not currently used by the press release pages.
 * Press release pages now use Server Components with markdown loaders.
 * See: src/app/press-release/lib/pressReleaseLoader.ts
 *
 * This hook is kept for potential future client-side API integration
 * or for other components that might need press release data.
 */
export const usePressReleaseApi = () => {
  const {
    pressReleases,
    isLoading,
    error,
    setPressReleases,
    setLoading,
    setError,
    setSelectedPressRelease,
  } = usePressReleaseStore();

  /**
   * Note: Press release data is now loaded from markdown files via Server Components.
   * This hook can be updated in the future for client-side API calls if needed.
   */

  return {
    // State
    pressReleases,
    isLoading,
    error,

    // Actions available but not currently used
    setPressReleases,
    setLoading,
    setError,
    setSelectedPressRelease,
  };
};
