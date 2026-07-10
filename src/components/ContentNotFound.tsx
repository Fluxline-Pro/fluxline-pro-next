'use client';

/**
 * ContentNotFound Component
 * Reusable not-found page for all content types.
 * Provides consistent styling and user experience across Blog, Portfolio,
 * Press Release, and Case Studies.
 *
 * Migrated to DSM CSS custom properties (var(--fx-*) tokens).
 */

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from './UnifiedPageWrapper';
import FxButton from '@/theme/components/dsm/FxButton';

interface ContentNotFoundProps {
  /**
   * Title to display (e.g., "Project Not Found", "Press Release Not Found")
   */
  title: string;

  /**
   * Description message
   */
  message: string;

  /**
   * Back button configuration
   */
  backButton: {
    label: string;
    url: string;
  };
}

export function ContentNotFound({
  title,
  message,
  backButton,
}: ContentNotFoundProps) {
  const router = useRouter();
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
        imageText: `404 - ${title}`,
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
          padding: 32,
        }}
      >
        <h1
          style={{
            color: 'var(--fx-accent)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            fontFamily: 'var(--fx-font)',
            margin: 0,
          }}
        >
          404
        </h1>

        <h2
          style={{
            color: 'var(--fx-text-heading)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 600,
            fontFamily: 'var(--fx-font)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: 'var(--fx-text-muted)',
            fontSize: '1.125rem',
            fontFamily: 'var(--fx-font)',
            textAlign: 'center',
            maxWidth: '600px',
            margin: 0,
          }}
        >
          {message}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 20,
            alignItems: 'center',
          }}
        >
          <FxButton
            variant='primary'
            size='lg'
            onClick={handleOpenMenu}
            disabled={menuOpened}
            style={{ minWidth: '200px' }}
          >
            {menuOpened ? 'Menu Opening...' : 'Open the Menu'}
          </FxButton>

          <p
            style={{
              color: 'var(--fx-text-faint)',
              fontSize: '0.875rem',
              fontFamily: 'var(--fx-font)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            or use the menu button in the top navigation
          </p>

          <div style={{ marginTop: 8 }}>
            <FxButton
              variant='outline'
              size='md'
              onClick={() => router.push(backButton.url)}
            >
              {backButton.label}
            </FxButton>
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
