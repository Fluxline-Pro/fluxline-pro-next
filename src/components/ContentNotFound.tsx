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

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          padding: theme.spacing.xl,
          textAlign: 'center',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h1'
          style={{
            color: theme.palette.red,
            marginBottom: theme.spacing.m,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            marginBottom: theme.spacing.l,
            maxWidth: '600px',
          }}
        >
          {message}
        </Typography>
        <FormButton
          variant='primary'
          onClick={() => router.push(backButton.url)}
        >
          {backButton.label}
        </FormButton>
      </div>
    </UnifiedPageWrapper>
  );
}
