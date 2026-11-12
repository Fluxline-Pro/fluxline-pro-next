'use client';

/**
 * Service Detail Error State
 * Error boundary for service detail pages
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import FxButton from '@/theme/components/dsm/FxButton';
import Link from 'next/link';

interface ServiceDetailErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ServiceDetailError({
  error,
  reset,
}: ServiceDetailErrorProps) {
  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          minHeight: '50vh',
        }}
      >
        <h1
          style={{
            color: 'var(--fx-accent)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          Something went wrong
        </h1>

        <p
          style={{
            color: 'var(--fx-text-body)',
            fontSize: '1.125rem',
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          We encountered an error while loading this service page. Please try
          again or return to the services overview.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div
            style={{
              padding: '1rem',
              borderRadius: 8,
              backgroundColor: 'var(--fx-surface-inset)',
              border: '1px solid var(--fx-border)',
              maxWidth: 600,
              overflow: 'auto',
            }}
          >
            <p
              style={{
                color: 'var(--fx-text-heading)',
                fontSize: '0.875rem',
                fontFamily: 'monospace',
                margin: 0,
              }}
            >
              {error.message}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 16 }}>
          <FxButton variant='primary' onClick={reset}>
            Try Again
          </FxButton>

          <Link href="/services" style={{ textDecoration: 'none' }}>
            <FxButton variant='outline'>
              Back to Services
            </FxButton>
          </Link>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
