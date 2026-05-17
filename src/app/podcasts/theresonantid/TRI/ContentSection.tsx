'use client';

import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface ContentSectionProps {
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: boolean;
  borderRadius?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ContentSection - Wrapper component for content sections
 * Applies consistent spacing, optional background color, and theme tokens
 */
export function ContentSection({
  children,
  backgroundColor,
  padding = false,
  borderRadius = false,
  className,
  style,
}: ContentSectionProps) {
  const { theme } = useAppTheme();

  return (
    <section
      className={className}
      style={{
        marginBottom: theme.spacing.xxl,
        ...(backgroundColor && { backgroundColor }),
        ...(padding && { padding: theme.spacing.xl }),
        ...(borderRadius && {
          borderRadius: theme.borderRadius.container.medium,
        }),
        ...style,
      }}
    >
      {children}
    </section>
  );
}
