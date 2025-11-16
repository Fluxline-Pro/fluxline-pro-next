'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import type { ServiceCategory } from '../../constants';

/**
 * ServiceDetailHero Component
 * Hero section for service detail page
 */
export const ServiceDetailHero: React.FC<{ service: ServiceCategory }> = ({
  service,
}) => {
  const { theme } = useAppTheme();

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <FluentIcon
          iconName={service.icon}
          size='xLarge'
          color={theme.palette.themePrimary}
        />
        <Typography
          variant='h1'
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: theme.typography.fontWeights.bold,
          }}
        >
          {service.title}
        </Typography>
      </div>

      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '1.25rem',
          lineHeight: theme.typography.lineHeights.relaxed,
        }}
      >
        {service.description}
      </Typography>
    </div>
  );
};
