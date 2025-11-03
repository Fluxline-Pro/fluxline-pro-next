'use client';

import React, { useEffect, useState } from 'react';
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
  const { theme, themeMode } = useAppTheme();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for hydration to complete
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Apply theme changes after hydration
  useEffect(() => {
    if (isHydrated) {
      applyThemeToDocument(themeMode);
    }
  }, [themeMode, isHydrated]);

  return (
    <FluentThemeProvider theme={theme} suppressHydrationWarning>
      <div suppressHydrationWarning>{children}</div>
    </FluentThemeProvider>
  );
};

export default ThemeProvider;
