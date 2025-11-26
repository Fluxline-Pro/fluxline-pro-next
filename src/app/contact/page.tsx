'use client';

/**
 * Contact Page - Let's Connect
 * Contact form and information for reaching out to Fluxline
 */

import React from 'react';
import { UnifiedPageWrapper, InteractiveCard } from '@/components';
import { Typography } from '@/theme/components/typography';
import { Hero } from '@/theme/components/hero';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { getIconForPath } from '@/utils/navigation-icons';
import { ContactForm } from './components/ContactForm';

export default function ContactPage() {
  const { theme } = useAppTheme();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-16'>
        {/* Hero Section */}
        <Hero
          title='Contact'
          iconName={getIconForPath('/contact')}
          description='Feel free to contact me via social media or the form below. I can also offer estimates for your design projects and tutoring sessions. Simply enquire below!'
        />

        {/* Contact Form */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.bold,
            }}
          >
            Get In Touch
          </Typography>
          <div
            style={{
              maxWidth: '600px',
            }}
          >
            <ContactForm />
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

        {/* Business Cards / CTA Section */}
        <section className='space-y-8'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.bold,
            }}
          >
            Let&apos;s Build Something Extraordinary
          </Typography>

          <div className='grid gap-6 md:grid-cols-2'>
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
            <InteractiveCard
              id='tutoring-services'
              title='Training & Mentorship'
              description='One-on-one tutoring and mentorship in design, development, and creative technologies. Empowering the next generation of creators.'
              icon='Education'
              iconPosition='center'
            />
          </div>
        </section>
      </div>
    </UnifiedPageWrapper>
  );
}
