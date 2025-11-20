'use client';

/**
 * InfoCard Component
 * Displays information cards with title and content
 * Used for "What We Do", "What We Deliver", "How We Do It" sections
 */

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface InfoCardData {
  id: string;
  title: string;
  heading: string;
  content: string;
}

interface InfoCardProps {
  card: InfoCardData;
}

export const InfoCard: React.FC<InfoCardProps> = ({ card }) => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        padding: '1.5rem',
        borderRadius: theme.borderRadius.container.medium,
        border: `2px solid ${theme.palette.themeTertiary}`,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Typography
        variant="h3"
        style={{
          color: theme.palette.themePrimary,
          fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
          fontWeight: theme.typography.fontWeights.semiBold,
          textAlign: 'center',
          marginBottom: '0.5rem',
        }}
      >
        {card.title}
      </Typography>

      <Typography
        variant="h4"
        style={{
          color: theme.palette.themePrimary,
          fontSize: '1rem',
          fontWeight: theme.typography.fontWeights.bold,
          marginBottom: '0.5rem',
        }}
      >
        {card.heading}
      </Typography>

      <Typography
        variant="p"
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '0.95rem',
          lineHeight: theme.typography.lineHeights.relaxed,
        }}
      >
        {card.content}
      </Typography>
    </div>
  );
};
