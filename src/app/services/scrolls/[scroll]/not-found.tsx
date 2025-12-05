'use client';

/**
 * Not Found Page for Scroll Detail
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export default function ScrollNotFound() {
  const { theme } = useAppTheme();
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
        imageText: '404 - Scroll Not Found',
      }}
    >
      <div
        className='flex flex-col items-center justify-center space-y-6'
        style={{ minHeight: '50vh' }}
      >
        <Typography
          variant='h1'
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: theme.typography.fontWeights.bold,
          }}
        >
          404
        </Typography>

        <Typography
          variant='h2'
          style={{
            color: theme.palette.neutralPrimary,
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: theme.typography.fontWeights.semiBold,
            textAlign: 'center',
          }}
        >
          Scroll Not Found
        </Typography>

        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '1.125rem',
            textAlign: 'center',
            maxWidth: '600px',
          }}
        >
          The scroll you&apos;re looking for doesn&apos;t exist or has been
          moved. Use the menu to explore our scrolls and other services.
        </Typography>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.m,
            marginTop: theme.spacing.l,
            alignItems: 'center',
          }}
        >
          <FormButton
            variant='primary'
            size='large'
            icon='GlobalNavButton'
            iconPosition='left'
            onClick={handleOpenMenu}
            disabled={menuOpened}
            style={{
              minWidth: '200px',
            }}
          >
            {menuOpened ? 'Menu Opening...' : 'Open the Menu'}
          </FormButton>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralTertiary,
              fontSize: '0.875rem',
              textAlign: 'center',
            }}
          >
            or use the menu button in the top navigation
          </Typography>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
