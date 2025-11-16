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

export const CompanyStatistics: React.FC<CompanyStatisticsProps> = ({
  statistics,
}) => {
  const { theme } = useAppTheme();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statistics.map((stat) => (
        <div
          key={stat.id}
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
          }}
        >
          <FluentIcon
            iconName={stat.icon}
            size="xLarge"
            color={theme.palette.themePrimary}
            style={{ marginBottom: '1rem' }}
          />

          <Typography
            variant="h2"
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: theme.typography.fontWeights.bold,
              marginBottom: '0.5rem',
            }}
          >
            {stat.value}
          </Typography>

          <Typography
            variant="h3"
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
              variant="p"
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
      ))}
    </div>
  );
};

export default CompanyStatistics;
