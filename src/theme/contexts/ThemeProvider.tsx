'use client';

import React, { useEffect } from 'react';
import { useAppTheme } from '../hooks/useAppTheme';
import { useReducedTransparency } from '../hooks/useReducedTransparency';
import { applyThemeToDocument } from '../theme';

/**
 * Theme Provider Component for Next.js App Router
 *
 * Handles theme application to the document via DSM tokens.
 * Must be a Client Component to use hooks and browser APIs.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { themeMode } = useAppTheme();

  useReducedTransparency();

  useEffect(() => {
    applyThemeToDocument(themeMode);
  }, [themeMode]);

  return <>{children}</>;
};

export default ThemeProvider;
