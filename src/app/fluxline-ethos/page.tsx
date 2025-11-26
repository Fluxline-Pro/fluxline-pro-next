'use client';

/**
 * Fluxline Ethos Page
 * Presents the Fluxline philosophy, mission, and service framework
 */

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
import { useIsMobile } from '@/theme/hooks/useMediaQuery';

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
          lineHeight: '1.5',
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
  const isMobile = useIsMobile();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className={isMobile ? 'space-y-8' : 'space-y-16'}>
        {/* Hero Section */}
        <Hero title={ethosHero.title}>{heroContent({ theme })}</Hero>

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

          <div
            className={
              isMobile
                ? 'grid gap-6 grid-cols-1'
                : 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
            }
          >
            {ethosServices.services.map((service) => (
              <InteractiveCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
                href={service.link}
                iconPosition='left'
                showLearnMore={true}
              />
            ))}
          </div>

          <div className='flex justify-center mt-8'>
            <FormButton
              text='View All Services'
              variant='outline'
              size='large'
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

        {/* Learn More Callout */}
        <Callout
          variant='subtle'
          title='Want to Know More?'
          action={
            <FormButton
              text='Learn More About Fluxline'
              variant='secondary'
              size='large'
              icon='ChevronRight'
              iconPosition='right'
              onClick={() => (window.location.href = '/about')}
            />
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
            Discover how Fluxline can partner with you to drive innovation and
            transform your business.
          </Typography>
        </Callout>

        {/* CTA Section */}
        <Callout
          variant='accent'
          title={ethosCTA.title}
          action={
            <FormButton
              text={ethosCTA.buttonText}
              variant='primary'
              size='large'
              icon='ChevronRight'
              iconPosition='right'
              onClick={() => (window.location.href = ethosCTA.buttonLink)}
            />
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
      </div>
    </UnifiedPageWrapper>
  );
}
