'use client';

/**
 * CompanyStatistics Component
 * Displays key company metrics and achievements
 */

import React from 'react';
import { FluentIcon } from '@/theme/components/fluent-icon';

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
        borderRadius: 12,
        border: `1px solid ${
          isHovered
            ? 'var(--fx-accent)'
            : 'var(--fx-border)'
        }`,
        backgroundColor: isHovered
          ? 'var(--fx-surface-card)'
          : 'transparent',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
        opacity: isHovered ? 1 : 0.9,
      }}
    >
      <FluentIcon
        iconName={stat.icon}
        size='xLarge'
        color='var(--fx-accent)'
      />

      <h2
        style={{
          color: 'var(--fx-accent)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          margin: 0,
        }}
      >
        {stat.value}
      </h2>

      <h3
        style={{
          color: 'var(--fx-text-heading)',
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: stat.description ? '0.5rem' : 0,
          marginTop: 0,
        }}
      >
        {stat.label}
      </h3>

      {stat.description && (
        <p
          style={{
            color: 'var(--fx-text-body)',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {stat.description}
        </p>
      )}
    </div>
  );
};

export const CompanyStatistics: React.FC<CompanyStatisticsProps> = ({
  statistics,
}) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 24,
        paddingTop: 4,
      }}
    >
      {statistics.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default CompanyStatistics;
