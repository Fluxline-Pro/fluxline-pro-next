'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '../../../components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Callout } from '@/theme/components/callout';
import { FormButton } from '@/theme/components/form';
import { UnifiedMarkdownRenderer } from '@/utils/markdownRenderer';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { content } from '../../../assets/legal/stewardship-contract';
import { FadeUp } from '@/animations/fade-animations';

export default function StewardshipContractClientPage() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const currentYear = new Date().getFullYear();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid' showImageTitle={false}>
      <FadeUp duration={0.5} delay={0}>
        <div
          style={{
            padding: theme.spacing.xl,
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Hero Section */}
          <Hero
            title='Stewardship Contract'
            backArrow={true}
            backArrowPath='/legal'
            description='Our Commitment to Ethical Service and Partnership'
          />

          {/* Main Content */}
          <div
            style={{
              marginTop: theme.spacing.xl,
              marginBottom: theme.spacing.xxl,
            }}
          >
            <UnifiedMarkdownRenderer content={content} />
          </div>

          {/* Partnership CTA */}
          <Callout
            variant='accent'
            title='Partner With Us'
            subtitle='Experience the difference of working with a team committed to your success.'
            action={
              <div
                style={{
                  display: 'flex',
                  gap: theme.spacing.m,
                  flexWrap: 'wrap',
                }}
              >
                <FormButton
                  text='View Our Services'
                  variant='primary'
                  size='large'
                  onClick={() => router.push('/services')}
                />
                <FormButton
                  text='Get in Touch'
                  variant='secondary'
                  size='large'
                  onClick={() => router.push('/contact')}
                />
              </div>
            }
          />

          {/* Copyright Footer */}
          <div
            style={{
              marginTop: theme.spacing.xxxl,
              paddingTop: theme.spacing.l,
              borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
              textAlign: 'center',
              color: theme.palette.neutralTertiary,
              fontSize: theme.fonts.small.fontSize,
            }}
          >
            <p>
              © {currentYear} Fluxline Resonance Group, LLC. All rights
              reserved.
            </p>
          </div>
        </div>
      </FadeUp>
    </UnifiedPageWrapper>
  );
}
