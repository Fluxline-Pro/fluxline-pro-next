'use client';

/**
 * Contact Page - Let's Connect
 * Contact form and information for reaching out to Fluxline
 */

import React from 'react';
import {
  UnifiedPageWrapper,
  InteractiveCard,
  NewsletterCTA,
} from '@/components';
import { Typography } from '@/theme/components/typography';
import { Hero } from '@/theme/components/hero';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { getIconForPath } from '@/utils/navigation-icons';
import { ContactForm } from './components/ContactForm';
import { Callout } from '@/theme/components/callout/Callout';
import { BookingsButton } from '@/theme/components/button/bookings-button';
import { useIsMobile, useIsDesktop } from '@/theme/hooks/useMediaQuery';
import { SocialLinks } from '@/app/about/components/SocialLinks';
import { FLUXLINE_SOCIAL_LINKS } from '@/app/about/constants';

export default function ContactPage() {
  const { theme } = useAppTheme();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isDesktopHook = useIsDesktop();
  const isMobile = isMounted ? isMobileHook : false;
  const isDesktop = isMounted ? isDesktopHook : false;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className={isMobile ? 'space-y-8' : 'space-y-16'}>
        {/* Hero Section */}
        <Hero
          title='Start a Conversation'
          iconName={getIconForPath('/contact')}
          description="The best place to start is a free consultation — a short call where we explore your goals together and map out what's possible. Book one in just a few steps."
        >
          {/* Social Links */}
          <div
            style={{
              marginTop: theme.spacing.m,
              marginBottom: theme.spacing.l,
            }}
          >
            <SocialLinks
              socialLinks={FLUXLINE_SOCIAL_LINKS}
              name='Terence Waters'
              size='medium'
            />
          </div>

          <Callout
            variant='accent'
            title='Book a Free Consultation'
            subtitle="Walk us through your vision and we'll design the systems, strategies, and practices that move it forward. No commitment required."
            action={<BookingsButton isHero />}
          />
        </Hero>

        {/* Business Cards / CTA Section */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.bold,
              lineHeight: isMobile ? '1.6' : '2',
              marginBottom: isMobile ? '1rem' : undefined,
            }}
          >
            Let&apos;s Build Something Extraordinary
          </Typography>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-2'>
            {/* Design Services Card */}
            <InteractiveCard
              id='design-services'
              title='Design & Branding'
              description='From logo design to complete brand identities, I create visual systems that resonate with your audience and stand the test of time.'
              icon='Design'
              iconPosition='center'
            />

            {/* Development Services Card */}
            <InteractiveCard
              id='development-services'
              title='Web Development'
              description='Building modern, scalable web applications with cutting-edge technologies. From concept to deployment, I deliver solutions that drive results.'
              icon='Code'
              iconPosition='center'
            />

            {/* Consulting Services Card */}
            <InteractiveCard
              id='consulting-services'
              title='Strategic Consulting'
              description="Expert guidance on digital transformation, technology strategy, and business innovation. Let's align your vision with actionable solutions."
              icon='Lightbulb'
              iconPosition='center'
            />

            {/* Tutoring Services Card */}
            {!isDesktop && (
              <InteractiveCard
                id='tutoring-services'
                title='Training & Mentorship'
                description='One-on-one tutoring and mentorship in design, development, and creative technologies. Empowering the next generation of creators.'
                icon='Education'
                iconPosition='center'
              />
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <NewsletterCTA />

        {/* Divider */}
        <hr
          style={{
            border: 'none',
            borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
            margin: `${theme.spacing.xxl} 0`,
          }}
        />

        {/* Contact Form — secondary option */}
        <section className='space-y-6'>
          <Typography
            variant='h3'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.25rem',
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            Prefer to write? Send us a note.
          </Typography>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralTertiary,
              fontSize: '0.9rem',
              maxWidth: '480px',
            }}
          >
            If you would rather drop us a message directly, feel free to use the
            form below. We read every note and will respond as soon as we can.
          </Typography>
          <div
            style={{
              maxWidth: '600px',
            }}
          >
            <ContactForm />
          </div>
        </section>
      </div>
    </UnifiedPageWrapper>
  );
}
