'use client';

/**
 * Service Not Found Page
 * 404 page for invalid service slugs
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import FxButton from '@/theme/components/dsm/FxButton';

export default function ServiceNotFound() {
  const [menuOpened, setMenuOpened] = React.useState(false);

  const handleOpenMenu = () => {
    // Trigger the header's menu button click
    const menuButton = document.querySelector(
      '[aria-label="Open navigation menu"]'
    ) as HTMLButtonElement;
    if (menuButton) {
      menuButton.click();
      setMenuOpened(true);
    }
  };

  return (
    <UnifiedPageWrapper
      layoutType='responsive-grid'
      forceImageConfig={{
        image: 'NOT_FOUND',
        imageText: '404 - Service Not Found',
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
          Service Not Found
        </h2>

        <p
          style={{
            color: 'var(--fx-text-body)',
            fontSize: '1.125rem',
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          The service you&apos;re looking for doesn&apos;t exist or has been
          moved. Please check our services overview for available offerings.
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
            onClick={handleOpenMenu}
            disabled={menuOpened}
            style={{ minWidth: 200 }}
          >
            {menuOpened ? 'Menu Opening...' : 'Open the Menu'}
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
