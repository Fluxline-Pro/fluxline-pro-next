'use client';

import React from 'react';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';
import { FormButton } from '@/theme/components/form/FormButton';
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
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isTabletHook = useIsTablet();
  const isMobile = isMounted ? isMobileHook : false;
  const isTablet = isMounted ? isTabletHook : false;
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Truncates text to first sentence (up to and including first period)
   * Returns full text if no period is found
   */
  const getFirstSentence = (text: string): string => {
    const periodIndex = text.indexOf('.');
    if (periodIndex === -1) {
      return text;
    }
    return text.substring(0, periodIndex + 1);
  };

  /**
   * Checks if description has more content beyond first sentence
   */
  const hasMoreContent = (text: string): boolean => {
    const firstSentence = getFirstSentence(text);
    return text.length > firstSentence.length;
  };

  return (
    <div
      className={`${className}`}
      style={{
        border: showBorder
          ? '1px solid var(--fx-text-faint)'
          : 'none',
        backgroundColor: 'var(--fx-surface-card)',
        padding: isMobile
          ? '24px'
          : isTablet
            ? '32px 48px'
            : '48px 64px',
        borderRadius: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
        boxShadow: showShadow
          ? '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)'
          : 'none',
        marginTop: !isMobile && !isTablet ? '32px' : undefined,
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '12px' : '4px',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: isMobile ? '0.25rem' : '4px',
          flexWrap: isMobile ? 'nowrap' : 'wrap',
          overflow: 'hidden',
          paddingLeft: backArrow ? '0.5rem' : undefined,
        }}
      >
        {backArrow && (
          <Link href={backArrowPath} style={{ textDecoration: 'none' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                fontSize: 24,
                color: 'var(--fx-accent)',
                transition: 'transform 0.2s ease',
                cursor: 'pointer',
                flexShrink: 0,
                marginTop: isMobile ? '0.25rem' : 0,
                marginRight: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'translateX(-4px) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0) scale(1)';
              }}
              aria-hidden='true'
            >
              ←
            </span>
          </Link>
        )}
        {iconName && (
          <span
            style={{
              fontSize: isMobile ? 32 : 48,
              color: 'var(--fx-accent)',
              flexShrink: 0,
              marginTop: isMobile ? '0.25rem' : 0,
              marginRight: '1rem',
            }}
            aria-hidden='true'
          >
            {iconName}
          </span>
        )}
        <h1
          style={{
            color: 'var(--fx-accent)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            lineHeight: 'clamp(1.2, 2vw, 1.3)',
            margin: '0.25rem 0 0',
            flex: 1,
          }}
        >
          {title}
        </h1>
      </div>

      {subtitle && (
        <h2
          style={{
            color: 'var(--fx-text-muted)',
            fontSize: isMobile ? '1.125rem' : 'clamp(1.25rem, 3vw, 1.75rem)',
            fontWeight: 600,
            lineHeight: isMobile ? '1.4' : '1.5',
            textTransform: 'none',
            margin: 0,
          }}
        >
          {subtitle}
        </h2>
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
            <p
              style={{
                color: 'var(--fx-text-muted)',
                fontSize: '0.875rem',
                fontWeight: 600,
                margin: 0,
              }}
            >
              Effective Date: {effectiveDate}
            </p>
          )}
          {lastUpdated && (
            <p
              style={{
                color: 'var(--fx-text-muted)',
                fontSize: '0.875rem',
                fontWeight: 600,
                margin: 0,
              }}
            >
              Last Updated: {lastUpdated}
            </p>
          )}
        </div>
      )}

      {description && (
        <div style={{ margin: !isMobile ? '1rem 0' : '0' }}>
          <p
            style={{
              color: 'var(--fx-text-muted)',
              fontSize: isMobile ? '1rem' : '1.125rem',
              lineHeight: isMobile ? '1.6' : '1.7',
              margin: 0,
            }}
          >
            {isMobile && !isExpanded
              ? getFirstSentence(description)
              : description}
          </p>
          {isMobile && hasMoreContent(description) && (
            <FormButton
              variant='secondary'
              size='medium'
              icon={isExpanded ? 'ChevronUp' : 'ChevronDown'}
              iconPosition='right'
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Read less' : 'Read more'}
              style={{
                marginTop: '0.5rem',
                alignSelf: 'flex-start',
              }}
            >
              {isExpanded ? 'Read less' : 'Read more'}
            </FormButton>
          )}
        </div>
      )}
      {filters && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: isMobile ? '8px' : '12px',
            marginTop: isMobile ? '12px' : '24px',
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
            gap: isMobile ? '8px' : '12px',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
