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
 * Returns null if no override is active.
 */
export const useThemeOverride = () => {
  const context = useContext(ThemeOverrideContext);
  if (context === undefined) {
    throw new Error(
      'useThemeOverride must be used within a ThemeOverrideProvider'
    );
  }
  return context;
};
