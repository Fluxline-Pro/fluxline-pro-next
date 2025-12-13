'use client';

import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Typography } from '@/theme/components/typography';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';
import { FluentIcon } from '@/theme/components/fluent-icon';
import Link from 'next/link';

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
   * Effective date for legal documents
   */
  effectiveDate?: string;
  /**
   * Last updated date for legal documents
   */
  lastUpdated?: string;
  /**
   * Hero content - can be text, JSX, or array of content blocks
   * Use this for custom content beyond subtitle/description
   */
  iconName?: string;
  /**
   * Additional content below description
   * Can be used for custom JSX or elements -Preferably FluentIcon component
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
  /**
   * Show back arrow icon next to title
   * @default false
   */
  backArrow?: boolean;
  /** Path for back arrow link
   * @default '/services'
   */
  backArrowPath?: string;
  /**
   * Filter controls to display below description
   * Renders above children if both are provided
   */
  filters?: React.ReactNode;
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
  effectiveDate,
  lastUpdated,
  iconName,
  description,
  children,
  className = '',
  style,
  showBorder = true,
  showShadow = false,
  backArrow = false,
  backArrowPath = '/services',
  filters,
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  /**
   * Truncates text to first sentence (up to and including first period)
   * Returns full text if no period is found
   */
  const getFirstSentence = (text: string): string => {
    const periodIndex = text.indexOf('.');
    if (periodIndex === -1) {
      return text; // No period found, return full text
    }
    return text.substring(0, periodIndex + 1); // Include the period
  };

  return (
    <div
      className={`${className}`}
      style={{
        border: showBorder
          ? `1px solid ${theme.palette.neutralTertiary}`
          : 'none',
        backgroundColor:
          theme.themeMode === 'high-contrast'
            ? theme.semanticColors.bodyBackground
            : theme.palette.neutralLight,
        padding: isMobile
          ? `${theme.spacing.l}`
          : isTablet
            ? `${theme.spacing.xl} ${theme.spacing.xxl}`
            : `${theme.spacing.xxl} ${theme.spacing.xxxl}`,
        borderRadius: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
        boxShadow: showShadow ? theme.shadows.hero : 'none',
        marginTop: !isMobile && !isTablet ? theme.spacing.xl : undefined,
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? theme.spacing.m : theme.spacing.xs,
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '0.75rem' : theme.spacing.xs,
          flexWrap: isMobile ? 'nowrap' : 'wrap',
        }}
      >
        {backArrow && (
          <Link href={backArrowPath} style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'inline-block',
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'translateX(-4px) scale(1.05)';
                e.currentTarget.style.background = 'transparent';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0) scale(1)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <FluentIcon
                iconName='Back'
                size='large'
                color={theme.palette.themePrimary}
                style={{
                  flexShrink: 0,
                  marginTop: isMobile ? '0.25rem' : 0,
                  marginRight: '0.5rem',
                  background: 'transparent',
                }}
              />
            </div>
          </Link>
        )}
        {iconName && (
          <FluentIcon
            iconName={iconName}
            size={isMobile ? 'large' : 'xLarge'}
            color={theme.palette.themePrimary}
            style={{
              flexShrink: 0,
              marginTop: isMobile ? '0.25rem' : 0,
              marginRight: '1rem',
            }}
          />
        )}
        <Typography
          variant='h1'
          style={{
            color: theme.palette.themePrimary,
            fontSize: isMobile ? '1.75rem' : 'clamp(2rem, 5vw, 3rem)',
            fontWeight: theme.typography.fontWeights.bold,
            lineHeight: isMobile ? '1.2' : '1.3',
            margin: 0,
            flex: 1,
          }}
        >
          {title}
        </Typography>
      </div>

      {subtitle && (
        <Typography
          variant='h2'
          style={{
            color: theme.palette.themeSecondary,
            fontSize: isMobile ? '1.125rem' : 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: theme.typography.fontWeights.light,
            fontStyle: 'italic',
            lineHeight: isMobile ? '1.4' : '1.5',
            margin: 0,
          }}
        >
          {subtitle}
        </Typography>
      )}

      {(effectiveDate || lastUpdated) && (
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.25rem' : '1rem',
            marginTop: '0.5rem',
          }}
        >
          {effectiveDate && (
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '0.875rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                margin: 0,
              }}
            >
              Effective Date: {effectiveDate}
            </Typography>
          )}
          {lastUpdated && (
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '0.875rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                margin: 0,
              }}
            >
              Last Updated: {lastUpdated}
            </Typography>
          )}
        </div>
      )}

      {description && (
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: isMobile ? '1rem' : '1.125rem',
            lineHeight: isMobile ? '1.6' : theme.typography.lineHeights.relaxed,
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          {isMobile ? getFirstSentence(description) : description}
        </Typography>
      )}
      {filters && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: isMobile ? theme.spacing.s1 : theme.spacing.m,
            marginTop: isMobile ? theme.spacing.m : theme.spacing.l,
            alignItems: 'flex-end',
          }}
        >
          {filters}
        </div>
      )}

      {children && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? theme.spacing.s1 : theme.spacing.m,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
