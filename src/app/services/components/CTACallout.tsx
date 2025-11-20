'use client';

/**
 * CTACallout Component
 * Displays a call-to-action callout with emoji, message, and optional button
 */

import React from 'react';
import Link from 'next/link';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

interface CTACalloutProps {
  emoji?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  showArrow?: boolean;
}

export const CTACallout: React.FC<CTACalloutProps> = ({
  emoji = '👉',
  title,
  description,
  buttonText,
  buttonHref,
  showArrow = true,
}) => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: theme.borderRadius.container.medium,
        border: `1px solid ${theme.palette.themeTertiary}`,
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
        {emoji && (
          <span
            style={{
              fontSize: '2rem',
              marginRight: '1rem',
              flexShrink: 0,
            }}
            role="img"
            aria-label="callout icon"
          >
            {emoji}
          </span>
        )}
        <div style={{ flex: 1 }}>
          <Typography
            variant="h3"
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
              fontWeight: theme.typography.fontWeights.semiBold,
              marginBottom: '0.5rem',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="p"
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            {description}
          </Typography>
        </div>
      </div>

      {showArrow && buttonHref && (
        <Link
          href={buttonHref}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: theme.palette.themePrimary,
            color: theme.palette.white,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            flexShrink: 0,
          }}
          aria-label={buttonText || 'Learn more'}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  );
};
