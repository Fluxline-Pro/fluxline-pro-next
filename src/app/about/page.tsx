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
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className={isMobile ? 'space-y-8' : 'space-y-16'}>
        {/* Hero Section */}
        <Hero
          title='About Fluxline'
          iconName={getIconForPath('/about')}
          description='Fluxline helps individuals and businesses build with clarity and purpose. We specialize in web development, brand design, personal training, coaching, and strategic consulting. Our work blends technical expertise with emotional intelligence to create systems, brands, and practices that actually work for you.'
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
                  business ready to scale with purpose, our coaching, wellness
                  programs, and infrastructure design help you align your
                  ambitions with your authentic identity. We believe
                  transformation isn&apos;t just about metrics—it&apos;s about
                  honoring your values, creative truth, and long-term vision.
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
                  <strong>Fluxline</strong> builds systems that work, brands
                  that connect, and practices that last.
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
              We build systems that integrate emotional intelligence, financial
              clarity, and physical discipline—empowering individuals and brands
              to work with purpose and precision.
            </Typography>

            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1.125rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              Fluxline envisions a world where individuals and businesses become
              intentional stewards of their growth—where identity is clarified
              through practice, reflection, and continuous improvement.
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

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
            margin: `${theme.spacing.xxl} 0`,
          }}
        />

        {/* Fluxline Ethos CTA */}
        <Callout
          variant='accent'
          title='Discover the Fluxline Ethos'
          subtitle='Modular by design. Resonant by nature.'
          action={
            <FormButton
              text='Explore Our Philosophy'
              variant='primary'
              size='large'
              icon='ChevronRight'
              iconPosition='right'
              onClick={() => router.push('/fluxline-ethos')}
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
            Learn more about our philosophy, mission, and the service framework
            that guides everything we do at Fluxline.
          </Typography>
        </Callout>

        {/* Content Navigation Callout-- move back under "Our Values" once testimonials is added back -TW */}
        <Callout
          variant='subtle'
          title="See what we've been working on!"
          subtitle='Review case studies, client work, and upcoming announcements.'
          action={
            <FormButton
              text='Explore Our Content'
              variant='primary'
              size='large'
              icon='ChevronRight'
              iconPosition='right'
              onClick={() => router.push('/content')}
            />
          }
        />

        {/* Testimonials Callout -- commented out for now since no testimonials have been given -TW*
        <Callout
          variant='subtle'
          title='Hear From Our Clients'
          action={
            <FormButton
              text='Contact Us'
              variant='primary'
              size='large'
              icon='ChevronRight'
              iconPosition='right'
              onClick={() => (window.location.href = '/contact')}
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
        </Callout> */}
      </div>
    </UnifiedPageWrapper>
  );
}
