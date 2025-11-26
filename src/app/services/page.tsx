'use client';

/**
 * Services Page
 * Displays Fluxline services and offerings
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { InteractiveCard } from '@/components';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Hero } from '@/theme/components/hero/Hero';
import {
  SERVICE_CATEGORIES,
  SERVICES_SUMMARY,
  FLUXLINE_SECONDARY_TAGLINE,
} from './constants';

export default function ServicesPage() {
  const { theme } = useAppTheme();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-12'>
        {/* Page Header */}
        <Hero
          title='Our Services'
          subtitle={FLUXLINE_SECONDARY_TAGLINE}
          description={SERVICES_SUMMARY}
        />

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: theme.palette.neutralQuaternary,
            margin: '2rem 0',
          }}
        />

        {/* Services Grid */}
        <div>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: theme.typography.fontWeights.semiBold,
              marginBottom: '2rem',
            }}
          >
            Service Offerings
          </Typography>

          <div
            className='grid gap-6'
            style={{
              gridTemplateColumns:
                'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            }}
          >
            {SERVICE_CATEGORIES.map((service) => (
              <InteractiveCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.path}
                iconPosition='left'
                showLearnMore={true}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div
          style={{
            padding: '2rem',
            borderRadius: theme.borderRadius.container.medium,
            border: `1px solid ${theme.palette.themeTertiary}`,
            backgroundColor: 'transparent',
            marginTop: '3rem',
          }}
        >
          <Typography
            variant='h3'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: theme.typography.fontWeights.semiBold,
              marginBottom: '1rem',
            }}
          >
            Ready to Transform?
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1rem',
              lineHeight: theme.typography.lineHeights.relaxed,
              marginBottom: '1.5rem',
            }}
          >
            Every service is a curriculum gate. Let&apos;s design the systems,
            strategies, and rituals that align your vision with reality.
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.themeTertiary,
              fontSize: '1rem',
              fontWeight: theme.typography.fontWeights.medium,
            }}
          >
            → Contact us to get started
          </Typography>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
