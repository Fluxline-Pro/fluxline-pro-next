'use client';

import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Typography } from '@/theme/components/typography';

export interface HeroProps {
  /**
   * Main heading text
   */
  title: string;
  /**
   * Subtitle to render within the hero section
   */
  subTitle?: string;
  /**
   * Hero content - can be text, JSX, or array of content blocks
   */
  children?: React.ReactNode;
  /**
   * Optional custom className for additional styling
   */
  className?: string;
  /**
   * Optional custom styles
   */
  style?: React.CSSProperties;
  /**
   * Show border around hero section
   * @default true
   */
  showBorder?: boolean;
  /**
   * Show shadow on hero section
   * @default false
   */
  showShadow?: boolean;
}

/**
 * Hero Component
 *
 * Reusable hero section for page headers with title and content.
 * Designed for DSM consistency across all pages.
 *
 * @example
 * ```tsx
 * <Hero title="About Fluxline">
 *   <Typography variant="p">Your content here...</Typography>
 * </Hero>
 * ```
 */
export const Hero: React.FC<HeroProps> = ({
  title,
  children,
  className = '',
  style,
  showBorder = true,
  showShadow = false,
}) => {
  const { theme } = useAppTheme();

  return (
    <div
      className={`space-y-8 ${className}`}
      style={{
        border: showBorder
          ? `1px solid ${theme.palette.neutralTertiary}`
          : 'none',
        backgroundColor: theme.palette.neutralLight,
        padding: `${theme.spacing.xxl} ${theme.spacing.xxxl}`,
        borderRadius: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
        boxShadow: showShadow ? theme.shadows.hero : 'none',
        ...style,
      }}
    >
      <Typography
        variant='h1'
        style={{
          color: theme.palette.themePrimary,
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: theme.typography.fontWeights.bold,
          marginBottom: theme.spacing.m,
        }}
      >
        {title}
      </Typography>

      {children && <div className='space-y-4'>{children}</div>}
    </div>
  );
};
