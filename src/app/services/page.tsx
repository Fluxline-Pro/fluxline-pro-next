'use client';

/**
 * Services Page
 * Displays Fluxline services and offerings
 */

import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { ServiceCard } from './components/ServiceCard';
import { SERVICE_CATEGORIES, SERVICES_SUMMARY, FLUXLINE_SECONDARY_TAGLINE } from './constants';

export default function ServicesPage() {
  const { theme } = useAppTheme();

  return (
    <PageWrapper>
      <div className="space-y-12">
        {/* Page Header */}
        <div className="space-y-4">
          <Typography
            variant="h1"
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: theme.typography.fontWeights.bold,
              marginBottom: '0.5rem',
            }}
          >
            Our Services
          </Typography>

          <Typography
            variant="h2"
            style={{
              color: theme.palette.themeSecondary,
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: theme.typography.fontWeights.light,
              fontStyle: 'italic',
              marginBottom: '1.5rem',
            }}
          >
            {FLUXLINE_SECONDARY_TAGLINE}
          </Typography>

          <Typography
            variant="p"
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            {SERVICES_SUMMARY}
          </Typography>
        </div>

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
            variant="h2"
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
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            }}
          >
            {SERVICE_CATEGORIES.map((service) => (
              <ServiceCard key={service.id} service={service} />
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
            variant="h3"
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
            variant="p"
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1rem',
              lineHeight: theme.typography.lineHeights.relaxed,
              marginBottom: '1.5rem',
            }}
          >
            Every service is a curriculum gate. Let&apos;s design the systems, strategies, 
            and rituals that align your vision with reality.
          </Typography>
          <Typography
            variant="p"
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
    </PageWrapper>
  );
}
