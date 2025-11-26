'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { InteractiveCard } from '@/components/InteractiveCard';
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

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {relatedServices.map((service) => (
          <InteractiveCard
            key={service.id}
            id={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            href={service.path}
            iconPosition='center'
            showLearnMore={true}
          />
        ))}
      </div>
    </div>
  );
};
