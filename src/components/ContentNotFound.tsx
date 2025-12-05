'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from './UnifiedPageWrapper';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

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

/**
 * ContentNotFound Component
 * Reusable not-found page for all content types
 * Provides consistent styling and user experience across Blog, Portfolio, Press Release, and Case Studies
 */
export function ContentNotFound({
  title,
  message,
  backButton,
}: ContentNotFoundProps) {
  const router = useRouter();
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
        imageText: `404 - ${title}`,
      }}
    >
      <div
        className='flex flex-col items-center justify-center space-y-6'
        style={{
          minHeight: '50vh',
          padding: theme.spacing.xl,
        }}
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
          {title}
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
          {message}
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

          <div style={{ marginTop: theme.spacing.s2 }}>
            <FormButton
              variant='secondary'
              size='medium'
              onClick={() => router.push(backButton.url)}
            >
              {backButton.label}
            </FormButton>
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
