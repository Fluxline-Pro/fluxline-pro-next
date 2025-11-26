'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '../../../components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Callout } from '@/theme/components/callout';
import { FormButton } from '@/theme/components/form';
import { UnifiedMarkdownRenderer } from '@/utils/markdownRenderer';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { content } from '../../../assets/legal/terms-of-use';

export default function TermsClientPage() {
  const router = useRouter();
  const { theme } = useAppTheme();
  const currentYear = new Date().getFullYear();

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
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
          title='Terms of Use'
          description='Service Terms and User Agreements'
          backArrow={true}
          backArrowPath='/legal'
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

        {/* Contact CTA */}
        <Callout
          variant='subtle'
          title='Questions About Our Terms?'
          subtitle="We're here to help clarify any questions you may have."
          action={
            <FormButton
              text='Contact Us'
              variant='primary'
              size='large'
              onClick={() => router.push('/contact')}
            />
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
            © {currentYear} Fluxline Resonance Group, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
