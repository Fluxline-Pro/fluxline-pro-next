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
import { getIconForPath } from '@/utils/navigation-icons';
import {
  SERVICE_CATEGORIES,
  SERVICES_SUMMARY,
  FLUXLINE_SECONDARY_TAGLINE,
} from './constants';
import { Callout } from '@/theme/components/callout/Callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';

export default function ServicesPage() {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();   

  return (ww
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className={isMobile ? 'space-y-8' : 'space-y-12'}>
        {/* Page Header */}
        <Hero
          title='Our Services'
          iconName={getIconForPath('/services')}
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
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.bold,
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
                iconPosition='center'
                showLearnMore={true}
              />
            ))}
          </div>
        </div>

        <Callout
          variant='accent'
          title='Ready to Transform?'
          subtitle="Every service is a curriculum gate. Let's design the systems,
            strategies, and rituals that align your vision with reality."
          action={
            <FormButton
              text='Book a Consultation'
              variant='primary'
              size='large'
              icon='ChevronRight'
              iconPosition='right'
              onClick={() => (window.location.href = '/contact')}
            />
          }
        />
      </div>
    </UnifiedPageWrapper>
  );
}
