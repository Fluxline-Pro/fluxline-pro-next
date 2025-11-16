'use client';

import React, { useEffect } from 'react';
import { ThemeProvider as FluentThemeProvider } from '@fluentui/react';
import { setIconOptions } from '@fluentui/react/lib/Styling';
import { useAppTheme } from '../hooks/useAppTheme';
import { applyThemeToDocument } from '../theme';

// Disable warnings about icon fonts to reduce noise
setIconOptions({
  disableWarnings: true,
});

/**
 * Theme Provider Component for Next.js App Router
 *
 * This component wraps the application with Fluent UI theming
 * and handles theme application to the document.
 *
 * Must be a Client Component to use hooks and browser APIs.
 * Waits for hydration to complete before applying persisted theme to avoid mismatches.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme, themeMode, fontScale } = useAppTheme();

  // Apply theme to document when theme mode or font scale changes
  useEffect(() => {
    applyThemeToDocument(themeMode, fontScale);
  }, [themeMode, fontScale]);

  return (
    <FluentThemeProvider theme={theme} suppressHydrationWarning>
      <div suppressHydrationWarning>{children}</div>
    </FluentThemeProvider>
  );
};

export default ThemeProvider;
