'use client';

/**
 * ValueCard Component
 * Displays company values
 */

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface CompanyValue {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ValueCardProps {
  value: CompanyValue;
}

export const ValueCard: React.FC<ValueCardProps> = ({ value }) => {
  const { theme } = useAppTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem 1.5rem',
        borderRadius: theme.borderRadius.container.medium,
        border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        backgroundColor: 'transparent',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? theme.shadows.m : 'none',
      }}
    >
      <FluentIcon
        iconName={value.icon}
        size="xLarge"
        color={theme.palette.themePrimary}
        style={{ marginBottom: '1rem' }}
      />

      <Typography
        variant="h3"
        style={{
          color: theme.palette.themePrimary,
          fontSize: '1.25rem',
          fontWeight: theme.typography.fontWeights.semiBold,
          marginBottom: '0.75rem',
        }}
      >
        {value.title}
      </Typography>

      <Typography
        variant="p"
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '0.875rem',
          lineHeight: theme.typography.lineHeights.relaxed,
        }}
      >
        {value.description}
      </Typography>
    </div>
  );
};

export default ValueCard;
