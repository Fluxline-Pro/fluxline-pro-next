'use client';

/**
 * Service Detail Error State
 * Error boundary for service detail pages
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import Link from 'next/link';

interface ServiceDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ServiceDetailError({
  error,
  reset,
}: ServiceDetailErrorProps) {
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
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: theme.typography.fontWeights.bold,
            textAlign: 'center',
          }}
        >
          Something went wrong
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
          We encountered an error while loading this service page. Please try
          again or return to the services overview.
        </Typography>

        {process.env.NODE_ENV === 'development' && (
          <div
            style={{
              padding: '1rem',
              borderRadius: theme.borderRadius.container.small,
              backgroundColor: theme.palette.neutralLighter,
              border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
              maxWidth: '600px',
              overflow: 'auto',
            }}
          >
            <Typography
              variant="p"
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: '0.875rem',
                fontFamily: 'monospace',
              }}
            >
              {error.message}
            </Typography>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: theme.borderRadius.container.small,
              backgroundColor: theme.palette.themePrimary,
              color: theme.palette.white,
              border: 'none',
              fontSize: '1rem',
              fontWeight: theme.typography.fontWeights.semiBold,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.palette.themeSecondary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.palette.themePrimary;
            }}
          >
            Try Again
          </button>

          <Link
            href="/services"
            style={{
              padding: '0.75rem 2rem',
              borderRadius: theme.borderRadius.container.small,
              backgroundColor: 'transparent',
              color: theme.palette.themePrimary,
              border: `1px solid ${theme.palette.themePrimary}`,
              textDecoration: 'none',
              fontSize: '1rem',
              fontWeight: theme.typography.fontWeights.semiBold,
              transition: 'all 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                theme.palette.themeLighterAlt;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Back to Services
          </Link>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
