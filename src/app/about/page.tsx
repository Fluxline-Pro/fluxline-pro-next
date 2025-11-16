'use client';

/**
 * About Page
 * Information about Fluxline and the company mission
 */

import React from 'react';
import { SimplePageWrapper } from '@/components/SimplePageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export default function AboutPage() {
  const { theme } = useAppTheme();

  return (
    <SimplePageWrapper>
      <div className='space-y-8'>
        <Typography
          variant='h1'
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: theme.typography.fontWeights.bold,
          }}
        >
          About Fluxline
        </Typography>

        <div className='space-y-4'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themeSecondary,
              fontSize: '1.75rem',
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            We&apos;re not done yet—but we&apos;re already extraordinary.
          </Typography>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            <strong>Fluxline</strong> architects transformative systems, brand
            experiences, and human-centered technology—blending{' '}
            <em>emotional intelligence</em>, <em>financial clarity</em>, and{' '}
            <em>somatic discipline</em>. We specialize in{' '}
            <em>modular web development</em>,{' '}
            <em>scalable design ecosystems</em>, and{' '}
            <em>strategic innovation</em> that evolves with you.
          </Typography>

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
            <em>wellness programs</em>, and <em>infrastructure design</em> help
            you align your <strong>drive</strong> with your{' '}
            <em>innate identity</em>. We believe transformation isn&apos;t just
            about metrics—it's about honoring <em>emotional rhythm</em>,{' '}
            <em>creative truth</em>, and <em>legacy resonance</em>.
          </Typography>

          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: theme.typography.lineHeights.relaxed,
            }}
          >
            <strong>Fluxline</strong> builds <em>systems that breathe</em>,{' '}
            <em>brands that feel</em>, and <em>legacies that last</em>.
          </Typography>
        </div>

        <div className='mt-12 space-y-6'>
          <Typography
            variant='h2'
            style={{
              color: theme.palette.themePrimary,
              fontSize: '2rem',
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            Our Mission & Vision
          </Typography>

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
      </div>
    </SimplePageWrapper>
  );
}
