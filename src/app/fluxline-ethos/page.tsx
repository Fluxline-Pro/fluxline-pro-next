'use client';

/**
 * Fluxline Ethos Page
 * Presents the Fluxline philosophy, mission, and service framework
 */

import Link from 'next/link';
import { UnifiedPageWrapper, InteractiveCard } from '@/components';
import { Typography } from '@/theme/components/typography';
import { Callout } from '@/theme/components/callout';
import { IExtendedTheme } from '@/theme/theme';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { FormButton } from '@/theme/components/form';
import { Hero } from '@/theme/components/hero/Hero';
import {
  ethosHero,
  ethosAbout,
  ethosServices,
  ethosCTA,
} from '@/lib/ethos/ethosContent';

const heroContent = ({ theme }: { theme: IExtendedTheme }) => {
  return (
    <section className='space-y-6'>
      <Typography
        variant='h2'
        style={{
          color: theme.palette.themeSecondary,
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          fontWeight: theme.typography.fontWeights.light,
          fontStyle: 'italic',
          marginBottom: '1.5rem',
        }}
      >
        {ethosHero.subtitle}
      </Typography>

      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '1.125rem',
          lineHeight: theme.typography.lineHeights.relaxed,
        }}
      >
        {ethosHero.description}
      </Typography>
    </section>
  );
};

export default function FluxlineEthosPage() {
  const { theme } = useAppTheme();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-16'>
        {/* Hero Section */}
        <Hero title={ethosHero.title}>{heroContent({ theme })}</Hero>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: theme.palette.neutralQuaternary,
          }}
        />

        {/* About Fluxline Section */}
        <section className='space-y-6'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: theme.typography.fontWeights.semiBold,
              marginBottom: '1.5rem',
            }}
          >
            {ethosAbout.sectionTitle}
          </Typography>

          {ethosAbout.paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.125rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </section>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: theme.palette.neutralQuaternary,
          }}
        />

        {/* Services Overview Section */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            {ethosServices.sectionTitle}
          </Typography>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {ethosServices.services.map((service) => (
              <InteractiveCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                href={service.link}
                iconPosition='center'
              />
            ))}
          </div>

          <div className='flex justify-center mt-4'>
            <FormButton
              text='View All Services'
              variant='outline'
              size='medium'
              onClick={() => (window.location.href = '/services')}
            />
          </div>
        </section>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            height: '1px',
            backgroundColor: theme.palette.neutralQuaternary,
          }}
        />

        {/* CTA Section */}
        <Callout
          variant='accent'
          title={ethosCTA.title}
          action={
            <div style={{ textAlign: 'center' }}>
              <FormButton
                text={ethosCTA.buttonText}
                variant='primary'
                size='large'
                onClick={() => (window.location.href = ethosCTA.buttonLink)}
              />
            </div>
          }
        >
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            {ethosCTA.description}
          </Typography>
        </Callout>

        {/* Additional Links Section */}
        <section
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1rem',
              marginBottom: '1rem',
            }}
          >
            Explore more about Fluxline
          </Typography>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/about'
              style={{
                color: theme.palette.themeTertiary,
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: theme.typography.fontWeights.medium,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.palette.themePrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.palette.themeTertiary;
              }}
            >
              → About Us
            </Link>
            <span style={{ color: theme.palette.neutralTertiary }}>|</span>
            <Link
              href='/services'
              style={{
                color: theme.palette.themeTertiary,
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: theme.typography.fontWeights.medium,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.palette.themePrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.palette.themeTertiary;
              }}
            >
              → Services
            </Link>
            <span style={{ color: theme.palette.neutralTertiary }}>|</span>
            <Link
              href='/services/scrolls'
              style={{
                color: theme.palette.themeTertiary,
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: theme.typography.fontWeights.medium,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme.palette.themePrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme.palette.themeTertiary;
              }}
            >
              → Explore the Scrolls
            </Link>
          </div>
        </section>
      </div>
    </UnifiedPageWrapper>
  );
}
