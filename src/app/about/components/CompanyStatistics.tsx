'use client';

/**
 * CompanyStatistics Component
 * Displays key company metrics and achievements
 */

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface Statistic {
  id: string;
  label: string;
  value: string;
  icon: string;
  description?: string;
}

interface CompanyStatisticsProps {
  statistics: Statistic[];
}

interface StatCardProps {
  stat: Statistic;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
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
        border: `1px solid ${
          isHovered
            ? theme.palette.themePrimary
            : theme.palette.neutralTertiaryAlt
        }`,
        backgroundColor: isHovered
          ? theme.themeMode === 'dark' ||
            theme.themeMode === 'high-contrast' ||
            theme.themeMode === 'grayscale-dark'
            ? theme.palette.neutralLighter
            : theme.palette.neutralLighterAlt
          : 'transparent',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? theme.shadows.m : 'none',
        opacity: isHovered ? 1 : 0.9,
      }}
    >
      <FluentIcon
        iconName={stat.icon}
        size='xLarge'
        color={theme.palette.themePrimary}
      />

      <Typography
        variant='h2'
        style={{
          color: theme.palette.themePrimary,
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: theme.typography.fontWeights.bold,
        }}
      >
        {stat.value}
      </Typography>

      <Typography
        variant='h3'
        style={{
          color: theme.palette.neutralPrimary,
          fontSize: '1rem',
          fontWeight: theme.typography.fontWeights.semiBold,
          marginBottom: stat.description ? '0.5rem' : 0,
        }}
      >
        {stat.label}
      </Typography>

      {stat.description && (
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '0.875rem',
            lineHeight: theme.typography.lineHeights.normal,
          }}
        >
          {stat.description}
        </Typography>
      )}
    </div>
  );
};

export const CompanyStatistics: React.FC<CompanyStatisticsProps> = ({
  statistics,
}) => {
  return (
    <div className='grid gap-6 grid-cols-2 lg:grid-cols-4'>
      {statistics.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default CompanyStatistics;
