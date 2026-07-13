/**
 * Not Found Page for Scroll Detail
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import FxButton from '@/theme/components/dsm/FxButton';

export default function ScrollNotFound() {
  return (
    <UnifiedPageWrapper
      layoutType='responsive-grid'
      forceImageConfig={{
        image: 'NOT_FOUND',
        imageText: '404 - Scroll Not Found',
      }}
    >
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
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
          }}
        >
          404
        </h1>

        <h2
          style={{
            color: 'var(--fx-text-heading)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Scroll Not Found
        </h2>

        <p
          style={{
            color: 'var(--fx-text-body)',
            fontSize: '1.125rem',
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          The scroll you&apos;re looking for doesn&apos;t exist or has been
          moved. Use the menu to explore our scrolls and other services.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 24,
            alignItems: 'center',
          }}
        >
          <FxButton
            variant='primary'
            size='lg'
            href='/services/scrolls'
            style={{ minWidth: 200 }}
          >
            Back to Scrolls
          </FxButton>

          <p
            style={{
              color: 'var(--fx-text-muted)',
              fontSize: '0.875rem',
              textAlign: 'center',
            }}
          >
            or use the menu button in the top navigation
          </p>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
