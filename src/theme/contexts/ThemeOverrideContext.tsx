'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeMode } from '../theme';

interface ThemeOverrideContextType {
  overrideThemeMode: ThemeMode | null;
  setOverrideThemeMode: (mode: ThemeMode | null) => void;
}

const ThemeOverrideContext = createContext<
  ThemeOverrideContextType | undefined
>(undefined);

/**
 * ThemeOverrideProvider
 *
 * Provides a temporary theme mode override that doesn't affect
 * the user's saved preferences. Used for pages that need to force
 * a specific theme (like the home page forcing dark mode).
 */
export const ThemeOverrideProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [overrideThemeMode, setOverrideThemeMode] = useState<ThemeMode | null>(
    null
  );

  return (
    <ThemeOverrideContext.Provider
      value={{ overrideThemeMode, setOverrideThemeMode }}
    >
      {children}
    </ThemeOverrideContext.Provider>
  );
};

/**
 * useThemeOverride
 *
 * Hook to access and set temporary theme overrides.
 * Returns a default context value if no provider is available (e.g., during SSR).
 * This prevents errors during server-side rendering and static prerendering.
 */
export const useThemeOverride = () => {
  const context = useContext(ThemeOverrideContext);
  // During SSR/prerendering, the context may not be available.
  // Return a default context that treats no override as active.
  if (context === undefined) {
    return {
      overrideThemeMode: null,
      setOverrideThemeMode: () => {},
    };
  }
  return context;
};
