'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { SERVICE_CATEGORIES } from '../../constants';

/**
 * RelatedServices Component
 * Shows related services
 */
export const RelatedServices: React.FC<{ currentServiceId: string }> = ({
  currentServiceId,
}) => {
  const { theme } = useAppTheme();

  // Get 3 related services (excluding current)
  const relatedServices = SERVICE_CATEGORIES.filter(
    (s) => s.id !== currentServiceId
  ).slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <div className='space-y-6'>
      <Typography
        variant='h2'
        style={{
          color: theme.palette.themePrimary,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: theme.typography.fontWeights.semiBold,
        }}
      >
        Related Services
      </Typography>

      <div className='grid gap-4 md:grid-cols-3'>
        {relatedServices.map((service) => (
          <Link
            key={service.id}
            href={service.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              borderRadius: theme.borderRadius.container.medium,
              border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
              backgroundColor: 'transparent',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = theme.shadows.m;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FluentIcon
              iconName={service.icon}
              size='large'
              color={theme.palette.themePrimary}
              style={{ marginBottom: '1rem' }}
            />
            <Typography
              variant='h3'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.25rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.5rem',
              }}
            >
              {service.title}
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '0.875rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              {service.description}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};
