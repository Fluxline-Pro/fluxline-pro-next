'use client';

import React from 'react';
import { useAppTheme } from '../../theme/hooks/useAppTheme';

export interface TRILayoutProps {
  children: React.ReactNode;
  maxWidthClassName?: string;
  className?: string;
}

/**
 * Shared layout scaffold for all TRI pages.
 * Provides max-width container, responsive padding, and vertical rhythm.
 */
export function TRILayout({
  children,
  maxWidthClassName = 'max-w-6xl',
  className,
}: TRILayoutProps) {
  const { theme } = useAppTheme();

  return (
    <main className={`w-full ${className ?? ''}`.trim()} data-testid='tri-layout'>
      <div
        className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${maxWidthClassName}`}
        style={{
          paddingTop: theme.spacing.xl,
          paddingBottom: theme.spacing.xxxl,
          color: theme.palette.neutralPrimary,
        }}
      >
        <div
          className='flex w-full flex-col'
          style={{
            gap: theme.spacing.xxl,
            lineHeight: theme.typography.lineHeights.relaxed,
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}

export default TRILayout;
