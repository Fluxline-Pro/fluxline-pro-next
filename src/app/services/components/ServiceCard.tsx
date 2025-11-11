'use client';

/**
 * ServiceCard Component
 * Displays a service offering with icon, title, and description
 */

import React from 'react';
import Link from 'next/link';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import type { ServiceCategory } from '../constants';

interface ServiceCardProps {
  service: ServiceCategory;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { theme } = useAppTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link
      href={service.path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
        borderRadius: theme.borderRadius.container.medium,
        border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        backgroundColor: 'transparent',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered ? theme.shadows.m : 'none',
        opacity: isHovered ? 1 : 0.9,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <FluentIcon
          iconName={service.icon}
          size="large"
          color={theme.palette.themePrimary}
        />
        <Typography
          variant="h3"
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
            fontWeight: theme.typography.fontWeights.semiBold,
          }}
        >
          {service.title}
        </Typography>
      </div>

      <Typography
        variant="p"
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '1rem',
          lineHeight: theme.typography.lineHeights.relaxed,
        }}
      >
        {service.description}
      </Typography>

      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Typography
          variant="p"
          style={{
            color: theme.palette.themeTertiary,
            fontSize: '0.875rem',
            fontWeight: theme.typography.fontWeights.medium,
            opacity: isHovered ? 1 : 0.7,
            transition: 'opacity 0.2s ease',
          }}
        >
          Learn more
        </Typography>
        <FluentIcon
          iconName="ChevronRight"
          size="small"
          color={theme.palette.themeTertiary}
          style={{
            opacity: isHovered ? 1 : 0.7,
            transition: 'all 0.2s ease',
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          }}
        />
      </div>
    </Link>
  );
};

export default ServiceCard;
