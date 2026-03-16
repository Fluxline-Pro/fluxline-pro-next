'use client';

import { useCallback, useEffect } from 'react';
import { useUserPreferencesStore } from '../../store/store-specs/userPreferencesStore';

export interface ReducedTransparencyResult {
  /** Whether the user has enabled reduced transparency */
  reducedTransparency: boolean;
  /** Toggle the reduced transparency preference */
  setReducedTransparency: (enabled: boolean) => void;
  /**
   * Returns `1` when reduced transparency is active, otherwise returns the
   * provided fallback opacity. Useful for inline styles on surfaces.
   *
   * @example
   * style={{ opacity: resolveOpacity(0.8) }}
   */
  resolveOpacity: (fallback: number) => number;
  /**
   * Returns `'none'` when reduced transparency is active, otherwise returns
   * the provided fallback backdrop-filter value.
   *
   * @example
   * style={{ backdropFilter: resolveBackdropFilter('blur(10px)') }}
   */
  resolveBackdropFilter: (fallback: string) => string;
}

/**
 * useReducedTransparency
 *
 * Accessibility hook that manages the "Reduce Transparency" user preference.
 *
 * When enabled:
 * - Adds `reduced-transparency` class to `document.body`, which global CSS
 *   uses to strip all `backdrop-filter` / `-webkit-backdrop-filter` effects
 *   site-wide and expose `--blur-strength` / `--surface-opacity` CSS variables.
 * - Returns helper functions (`resolveOpacity`, `resolveBackdropFilter`) so
 *   components with inline styles can also respect the preference.
 */
export const useReducedTransparency = (): ReducedTransparencyResult => {
  const { preferences, setPreference } = useUserPreferencesStore();
  const { reducedTransparency } = preferences;

  // Apply / remove body class whenever the preference changes
  useEffect(() => {
    if (reducedTransparency) {
      document.body.classList.add('reduced-transparency');
    } else {
      document.body.classList.remove('reduced-transparency');
    }
  }, [reducedTransparency]);

  const setReducedTransparency = useCallback(
    (enabled: boolean) => setPreference('reducedTransparency', enabled),
    [setPreference]
  );

  return {
    reducedTransparency,
    setReducedTransparency,
    resolveOpacity: (fallback: number) => (reducedTransparency ? 1 : fallback),
    resolveBackdropFilter: (fallback: string) =>
      reducedTransparency ? 'none' : fallback,
  };
};
