'use client';

import React, { useEffect } from 'react';
import { ThemeProvider as FluentThemeProvider } from '@fluentui/react';
import { useAppTheme } from '../hooks/useAppTheme';
import { applyThemeToDocument } from '../theme';

/**
 * Theme Provider Component for Next.js App Router
 * 
 * This component wraps the application with Fluent UI theming
 * and handles theme application to the document.
 * 
 * Must be a Client Component to use hooks and browser APIs.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const { theme, themeMode } = useAppTheme();

  // Apply theme to document when it changes
  useEffect(() => {
    applyThemeToDocument(themeMode);
  }, [themeMode]);

  return (
    <FluentThemeProvider theme={theme}>
      {children}
    </FluentThemeProvider>
  );
};

export default ThemeProvider;
