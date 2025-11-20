'use client';

/**
 * Service Not Found Page
 * 404 page for invalid service slugs
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import Link from 'next/link';

export default function ServiceNotFound() {
  const { theme } = useAppTheme();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        className="flex flex-col items-center justify-center space-y-6"
        style={{ minHeight: '50vh' }}
      >
        <Typography
          variant="h1"
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: theme.typography.fontWeights.bold,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h2"
          style={{
            color: theme.palette.neutralPrimary,
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: theme.typography.fontWeights.semiBold,
            textAlign: 'center',
          }}
        >
          Service Not Found
        </Typography>

        <Typography
          variant="p"
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '1.125rem',
            textAlign: 'center',
            maxWidth: '600px',
          }}
        >
          The service you&apos;re looking for doesn&apos;t exist or has been
          moved. Please check our services overview for available offerings.
        </Typography>

        <Link
          href="/services"
          style={{
            padding: '0.75rem 2rem',
            borderRadius: theme.borderRadius.container.small,
            backgroundColor: theme.palette.themePrimary,
            color: theme.palette.white,
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: theme.typography.fontWeights.semiBold,
            transition: 'all 0.2s ease',
            display: 'inline-block',
            marginTop: '1rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.palette.themeSecondary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.palette.themePrimary;
          }}
        >
          View All Services
        </Link>
      </div>
    </UnifiedPageWrapper>
  );
}
