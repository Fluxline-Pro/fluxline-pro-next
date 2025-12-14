'use client';

/**
 * Root 404 Not Found Page
 * Global fallback for pages that don't exist
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import ConsultingImage from '@/assets/images/ConsultingPortrait.jpg';

export default function NotFound() {
  const { theme } = useAppTheme();

  const handleOpenMenu = () => {
    // Trigger the header's menu button click
    const menuButton = document.querySelector(
      '[aria-label="Open menu"]'
    ) as HTMLButtonElement;
    if (menuButton) {
      menuButton.click();
    }
  };

  return (
    <UnifiedPageWrapper
      layoutType='responsive-grid'
      forceImageConfig={{
        image: ConsultingImage.src,
        imageText: '404 - Page Not Found',
      }}
    >
      <div
        className='flex flex-col items-center justify-center space-y-8'
        style={{ minHeight: '60vh', padding: theme.spacing.xl }}
      >
        <Typography
          variant='h1'
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: theme.typography.fontWeights.bold,
            textAlign: 'center',
            lineHeight: 1,
            textTransform: 'none',
          }}
        >
          Uh oh!
        </Typography>

        <Typography
          variant='h2'
          style={{
            color: theme.palette.neutralPrimary,
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: theme.typography.fontWeights.semiBold,
            textAlign: 'center',
            marginTop: theme.spacing.m,
            textTransform: 'none',
          }}
        >
          Sorry, this page was not found
        </Typography>

        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '1.125rem',
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Use the menu to explore our services, content, and offerings.
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
            style={{
              minWidth: '200px',
            }}
          >
            Open the Menu
          </FormButton>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralTertiary,
              fontSize: '0.875rem',
              textAlign: 'center',
            }}
          >
            or use the menu button in the top navigation to explore
          </Typography>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
