'use client';

/**
 * AboutHero Component
 * Hero section for the About page with CTA callout
 */

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { CTACallout } from '@/app/services/components/CTACallout';

export const AboutHero: React.FC = () => {
  const { theme } = useAppTheme();

  return (
    <div className='space-y-12'>
      {/* Main Hero Content */}
      <div className='space-y-8'>
        <Typography
          variant='h1'
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            fontWeight: theme.typography.fontWeights.bold,
            textAlign: 'center',
            lineHeight: theme.typography.lineHeights.tight,
          }}
        >
          About Fluxline
        </Typography>

        <div className='space-y-6 max-w-4xl mx-auto'>
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralPrimary,
              fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
              lineHeight: theme.typography.lineHeights.relaxed,
              textAlign: 'center',
            }}
          >
            <strong>Fluxline</strong> architects transformative systems, brand
            experiences, and human-centered technology—blending{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              emotional intelligence
            </em>
            ,{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              financial clarity
            </em>
            , and{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              somatic discipline
            </em>
            . We specialize in{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              modular web development
            </em>
            ,{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              scalable design ecosystems
            </em>
            , and{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              strategic innovation
            </em>{' '}
            that evolves with you.
          </Typography>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralPrimary,
              fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
              lineHeight: theme.typography.lineHeights.relaxed,
              textAlign: 'center',
            }}
          >
            Whether you&apos;re an individual seeking personal growth or a
            business ready to scale with purpose, our{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              coaching
            </em>
            ,{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              wellness programs
            </em>
            , and{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              infrastructure design
            </em>{' '}
            help you align your <strong>drive</strong> with your{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              innate identity
            </em>
            . We believe transformation isn&apos;t just about metrics—it&apos;s
            about honoring{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              emotional rhythm
            </em>
            ,{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              creative truth
            </em>
            , and{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              legacy resonance
            </em>
            .
          </Typography>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralPrimary,
              fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
              lineHeight: theme.typography.lineHeights.relaxed,
              textAlign: 'center',
            }}
          >
            <strong>Fluxline</strong> builds{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              systems that breathe
            </em>
            ,{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              brands that feel
            </em>
            , and{' '}
            <em style={{ color: theme.palette.themePrimary, fontStyle: 'italic' }}>
              legacies that last
            </em>
            . Let&apos;s make your vision real—through{' '}
            <strong>ritual</strong>, <strong>resonance</strong>, and{' '}
            <strong>iteration</strong>.
          </Typography>
        </div>
      </div>

      {/* CTA Callout */}
      <div className='max-w-4xl mx-auto'>
        <CTACallout
          emoji='💡'
          title="Your vision is calling. Let's architect it into form."
          description="Book your free consultation to discuss your project needs and get started today!"
          buttonHref='https://outlook.office.com/owa/calendar/Bookings@terencewaters.com/bookings/'
          showArrow={true}
        />
      </div>
    </div>
  );
};

export default AboutHero;