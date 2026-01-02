'use client';

/**
 * Services Page Client Component
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

export default function ServicesPageClient() {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();

  return (
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
        <div className='space-y-8'>
          <div>
            <Typography
              variant='h2'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '2rem',
                fontWeight: theme.typography.fontWeights.bold,
              }}
            >
              Choose what kind of support you need
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.125rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              Every service is your doorway to transformation. From idea to
              embodiment. From intention to infrastructure.
            </Typography>
          </div>

          {/* Body & Practice */}
          <section className='space-y-4'>
            <Typography
              variant='h3'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.5rem',
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              Body & Practice
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1rem',
                marginBottom: theme.spacing.m,
              }}
            >
              Physical training and transformational frameworks rooted in identity work and embodiment.
            </Typography>
            <div
              className='grid gap-6'
              style={{
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              }}
            >
              {SERVICE_CATEGORIES.filter(
                (s) => s.category === 'body-practice'
              ).map((service) => (
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
          </section>

          {/* Brand & Digital Presence */}
          <section className='space-y-4'>
            <Typography
              variant='h3'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.5rem',
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              Brand & Digital Presence
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1rem',
                marginBottom: theme.spacing.m,
              }}
            >
              Web development and brand design to build your digital foundation.
            </Typography>
            <div
              className='grid gap-6'
              style={{
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              }}
            >
              {SERVICE_CATEGORIES.filter(
                (s) => s.category === 'brand-digital'
              ).map((service) => (
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
          </section>

          {/* Depth Work & Strategy */}
          <section className='space-y-4'>
            <Typography
              variant='h3'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.5rem',
                fontWeight: theme.typography.fontWeights.semiBold,
              }}
            >
              Depth Work & Strategy
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1rem',
                marginBottom: theme.spacing.m,
              }}
            >
              Strategic consulting and transformational frameworks for clarity and growth.
            </Typography>
            <div
              className='grid gap-6'
              style={{
                gridTemplateColumns:
                  'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              }}
            >
              {SERVICE_CATEGORIES.filter(
                (s) => s.category === 'depth-strategy' && s.id !== 'education-training'
              ).map((service) => (
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
          </section>
        </div>

        <Callout
          variant='accent'
          title='Not sure where to start?'
          subtitle="Share with us your needs in a free, no obligation consultation. We'll map the right first step together."
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

        <Callout
          variant='neutral'
          title='Legal & Governance'
          subtitle='Review our terms, policies, and stewardship commitments that govern our professional relationship.'
          action={
            <FormButton
              text='View Legal Documents'
              variant='secondary'
              size='medium'
              icon='ChevronRight'
              iconPosition='right'
              onClick={() => (window.location.href = '/legal')}
            />
          }
        />
      </div>
    </UnifiedPageWrapper>
  );
}
