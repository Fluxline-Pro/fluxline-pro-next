'use client';

/**
 * About Page
 * Information about Fluxline and the company mission
 */

import { UnifiedPageWrapper, InteractiveCard } from '@/components';
import { Typography } from '@/theme/components/typography';
import { Callout } from '@/theme/components/callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { useIsMobile, useIsTablet } from '@/theme/hooks/useMediaQuery';
import { Hero } from '@/theme/components/hero';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { TeamMemberCard } from './components/TeamMemberCard';
import { CompanyStatistics } from './components/CompanyStatistics';
import { CompanyTimeline } from './components/CompanyTimeline';
import { getIconForPath } from '@/utils/navigation-icons';
import {
  TEAM_MEMBERS,
  COMPANY_STATISTICS,
  COMPANY_TIMELINE,
  COMPANY_VALUES,
} from './constants';

export default function AboutPage() {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-16'>
        {/* Hero Section */}
        <Hero
          title='About Fluxline'
          iconName={getIconForPath('/about')}
          description='Fluxline, also known as Fluxline Resonance Group, architects transformative systems, brand experiences, and human-centered technology—blending emotional intelligence, financial clarity, and somatic discipline. We specialize in modular web development, scalable design ecosystems, and strategic innovation that evolves with you.'
        >
          {!isMobile &&
            !isTablet && ( // shortens the hero text on mobile per design review
              <>
                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '1.125rem',
                    lineHeight: theme.typography.lineHeights.relaxed,
                  }}
                >
                  Whether you&apos;re an individual seeking personal growth or a
                  business ready to scale with purpose, our <em>coaching</em>,{' '}
                  <em>wellness programs</em>, and <em>infrastructure design</em>{' '}
                  help you align your <strong>drive</strong> with your{' '}
                  <em>innate identity</em>. We believe transformation isn&apos;t
                  just about metrics—it&apos;s about honoring{' '}
                  <em>emotional rhythm</em>, <em>creative truth</em>, and{' '}
                  <em>legacy resonance</em>.
                </Typography>

                <Typography
                  variant='p'
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '1.125rem',
                    lineHeight: theme.typography.lineHeights.relaxed,
                    paddingBottom: theme.spacing.m,
                  }}
                >
                  <strong>Fluxline</strong> builds <em>systems that breathe</em>
                  , <em>brands that feel</em>, and <em>legacies that last</em>.
                </Typography>
              </>
            )}

          {/* Quote Callout */}
          <Callout
            variant='accent'
            title="We're not done yet—but we're already extraordinary."
            subtitle='Modular by design. Resonant by nature.'
          />
        </Hero>

        {/* Company Statistics */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.bold,
            }}
          >
            Our Impact
          </Typography>
          <CompanyStatistics statistics={COMPANY_STATISTICS} />
        </section>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
            margin: `${theme.spacing.xxl} 0`,
          }}
        />

        {/* Mission & Vision */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.bold,
            }}
          >
            Our Mission & Vision
          </Typography>

          <div className='space-y-6'>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.125rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              We seek to architect multidimensional systems that fuse{' '}
              <em>emotional intelligence</em>, <em>financial clarity</em>, and{' '}
              <em>somatic discipline</em>—empowering individuals and brands to
              live with <strong>modular precision</strong> and{' '}
              <strong>legacy-driven resonance</strong>.
            </Typography>

            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.125rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              Fluxline envisions a world where individuals and businesses become{' '}
              <em>self-authored stewards</em> of their inner and outer
              architecture—where identity is revealed through{' '}
              <strong>ritual</strong>, <strong>resonance</strong>, and{' '}
              <strong>iteration</strong>.
            </Typography>
          </div>
        </section>

        {/* Company Values */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.bold,
            }}
          >
            Our Values
          </Typography>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {COMPANY_VALUES.map((value) => (
              <InteractiveCard
                key={value.id}
                id={value.id}
                title={value.title}
                description={value.description}
                icon={value.icon}
                iconPosition='center'
              />
            ))}
          </div>
        </section>

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
            margin: `${theme.spacing.xxl} 0`,
          }}
        />

        {/* Journey & Team - Flex Layout */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: theme.spacing.xxl,
          }}
          className='lg:flex-row'
        >
          {/* Company Timeline */}
          <section className='space-y-8 flex-1'>
            <Typography
              variant='h2'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '2rem',
                fontWeight: theme.typography.fontWeights.bold,
              }}
            >
              Our Journey
            </Typography>
            <CompanyTimeline events={COMPANY_TIMELINE} />
          </section>

          {/* Team Section */}
          <section className='space-y-8 flex-1'>
            <Typography
              variant='h2'
              style={{
                color: theme.palette.themePrimary,
                fontSize: '2rem',
                fontWeight: theme.typography.fontWeights.bold,
              }}
            >
              Our Team
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '400px',
              }}
            >
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  style={{
                    maxWidth: '400px',
                    width: '100%',
                  }}
                >
                  <TeamMemberCard member={member} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Testimonials Callout */}
        <Callout
          variant='subtle'
          title='Hear From Our Clients'
          action={
            <FormButton
              text='Read Client Stories'
              variant='primary'
              size='large'
              icon='ChevronRight'
              iconPosition='right'
              onClick={() => (window.location.href = '/testimonials')}
            />
          }
        >
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
            }}
          >
            Don&apos;t just take our word for it. See how we&apos;ve helped
            businesses and individuals transform through our strategic
            consulting, coaching, and development services.
          </Typography>
        </Callout>
      </div>
    </UnifiedPageWrapper>
  );
}
