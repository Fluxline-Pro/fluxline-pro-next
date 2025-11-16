'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

/**
 * ServiceCTA Component
 * Call to action section
 */
export const ServiceCTA: React.FC = () => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: theme.borderRadius.container.medium,
        border: `2px solid ${theme.palette.themeTertiary}`,
        backgroundColor: 'transparent',
        textAlign: 'center',
      }}
    >
      <Typography
        variant='h3'
        style={{
          color: theme.palette.themePrimary,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: theme.typography.fontWeights.semiBold,
          marginBottom: '1rem',
        }}
      >
        Ready to Begin?
      </Typography>
      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '1.125rem',
          lineHeight: theme.typography.lineHeights.relaxed,
          marginBottom: '1.5rem',
        }}
      >
        Let&apos;s design the systems, strategies, and rituals that align your
        vision with reality.
      </Typography>
      <Link
        href='/contact'
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          borderRadius: theme.borderRadius.container.small,
          backgroundColor: theme.palette.themePrimary,
          color: theme.palette.white,
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: theme.typography.fontWeights.semiBold,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.palette.themeSecondary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.palette.themePrimary;
        }}
      >
        Get in Touch
      </Link>
    </div>
  );
};
