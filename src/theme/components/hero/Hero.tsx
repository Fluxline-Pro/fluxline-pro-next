'use client';

import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Typography } from '@/theme/components/typography';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';

export interface HeroProps {
  /**
   * Main heading text
   */
  title: string;
  /**
   * Subtitle text (styled as italic secondary color)
   */
  subtitle?: string;
  /**
   * Description text (styled as body text with relaxed line height)
   */
  description?: string;
  /**
   * Hero content - can be text, JSX, or array of content blocks
   * Use this for custom content beyond subtitle/description
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
 * <Hero
 *   title="About Fluxline"
 *   subtitle="Your tagline here"
 *   description="Your description text here"
 * />
 * ```
 */
export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  children,
  className = '',
  style,
  showBorder = true,
  showShadow = false,
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <div
      className={`space-y-8 ${className}`}
      style={{
        border: showBorder
          ? `1px solid ${theme.palette.neutralTertiary}`
          : 'none',
        backgroundColor: theme.palette.neutralLight,
        padding: isMobile
          ? `${theme.spacing.l}`
          : isTablet
            ? `${theme.spacing.xl} ${theme.spacing.xxl}`
            : `${theme.spacing.xxl} ${theme.spacing.xxxl}`,
        borderRadius: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
        boxShadow: showShadow ? theme.shadows.hero : 'none',
        marginTop: !isMobile && !isTablet ? theme.spacing.xl : undefined,
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

      {subtitle && (
        <Typography
          variant='h2'
          style={{
            color: theme.palette.themeSecondary,
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: theme.typography.fontWeights.light,
            fontStyle: 'italic',
            marginBottom: '1.5rem',
          }}
        >
          {subtitle}
        </Typography>
      )}

      {description && (
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '1.125rem',
            lineHeight: theme.typography.lineHeights.relaxed,
          }}
        >
          {description}
        </Typography>
      )}

      {children && <div className='space-y-4'>{children}</div>}
    </div>
  );
};
