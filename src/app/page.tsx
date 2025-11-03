'use client';

import { Button } from '@/theme/components/button';
import { Card } from '@/theme/components/card';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export default function Home() {
  const { theme, themeMode, toggleTheme } = useAppTheme();

  return (
    <div
      className='flex min-h-screen flex-col items-center justify-center p-8 gap-8'
      suppressHydrationWarning
    >
      <main className='flex flex-col gap-8 items-center max-w-2xl'>
        <h1
          className='text-4xl font-bold text-center'
          style={{
            color: theme.palette.themePrimary,
            fontFamily: theme.typography.fontFamilies.heading,
          }}
        >
          Fluxline Pro - Next.js
        </h1>

        <p
          className='text-center text-lg'
          style={{ color: theme.palette.neutralPrimary }}
        >
          Theme system successfully migrated from React to Next.js
        </p>

        <Card elevation={2} padding='large' hoverable>
          <h2
            className='text-2xl font-semibold mb-4'
            style={{ color: theme.palette.themePrimary }}
          >
            Current Theme: {themeMode}
          </h2>
          <p style={{ color: theme.palette.neutralSecondary }}>
            This card demonstrates the theme integration with Fluent UI. The
            colors, spacing, and shadows are all controlled by the theme system.
          </p>
        </Card>

        <div className='flex gap-4 flex-wrap justify-center'>
          <Button
            variant='primary'
            size='medium'
            onClick={toggleTheme}
            id='toggle-theme-btn'
          >
            Toggle Theme
          </Button>
          <Button variant='default' size='medium' id='default-btn'>
            Default Button
          </Button>
          <Button variant='primary' size='small' id='small-btn'>
            Small Button
          </Button>
          <Button variant='primary' size='large' id='large-btn'>
            Large Button
          </Button>
        </div>

        <Card elevation={1} padding='medium'>
          <h3
            className='text-xl font-semibold mb-2'
            style={{ color: theme.palette.themeSecondary }}
          >
            Theme Features
          </h3>
          <ul
            className='list-disc list-inside space-y-2'
            style={{ color: theme.palette.neutralSecondary }}
          >
            <li>Dark mode (default) and light mode support</li>
            <li>Fluent UI integration with custom theme</li>
            <li>Zustand state management for preferences</li>
            <li>SSR-compatible theme provider</li>
            <li>Responsive breakpoints and media queries</li>
            <li>Custom animations and transitions</li>
          </ul>
        </Card>
      </main>
    </div>
  );
}
