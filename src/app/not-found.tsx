'use client';

/**
 * Root 404 Not Found Page
 * Global fallback for pages that don't exist
 */

import React from 'react';
import { FxContainer, FxButton } from '@/theme/components/dsm';

export default function NotFound() {
  return (
    <FxContainer
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        gap: '24px',
      }}
    >
      <span
        style={{
          fontSize: 'var(--fx-display-404, clamp(80px, 14vw, 150px))',
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--fx-accent)',
          letterSpacing: '-0.04em',
        }}
      >
        404
      </span>

      <h1
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: 600,
          color: 'var(--fx-text-heading)',
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        Page not found
      </h1>

      <p
        style={{
          fontSize: 'var(--fx-body-size, 16px)',
          lineHeight: 'var(--fx-body-leading, 1.7)',
          color: 'var(--fx-text-muted)',
          maxWidth: '480px',
          margin: 0,
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>

      <FxButton variant="primary" size="lg" href="/" style={{ marginTop: '8px' }}>
        Go Home
      </FxButton>
    </FxContainer>
  );
}
