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
 * Uses client-only mounting to avoid hydration mismatches with Fluent UI's dynamic class names.
 * CSS animation provides smooth fade-in without hydration issues.
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme, themeMode } = useAppTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Only render Fluent UI on client to avoid hydration mismatches
  useEffect(() => {
    setIsMounted(true);
    applyThemeToDocument(themeMode);
  }, []);

  // Apply theme changes after mount
  useEffect(() => {
    if (isMounted) {
      applyThemeToDocument(themeMode);
    }
  }, [themeMode, isMounted]);

  // On server and first render, render children without FluentThemeProvider
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <div
      suppressHydrationWarning
      style={{
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <FluentThemeProvider theme={theme}>{children}</FluentThemeProvider>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ThemeProvider;
