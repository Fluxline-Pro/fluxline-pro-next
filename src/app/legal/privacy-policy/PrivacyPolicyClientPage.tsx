'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '../../../components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Callout } from '@/theme/components/callout';
import { FormButton } from '@/theme/components/form';
import { UnifiedMarkdownRenderer } from '@/utils/markdownRenderer';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { content } from '../../../assets/legal/privacy-policy';

export default function PrivacyPolicyClientPage() {
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
          title='Privacy Policy'
          backArrow={true}
          backArrowPath='/legal'
          description='Data Protection and Privacy Practices'
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
          title='Privacy Concerns?'
          subtitle='We take your privacy seriously. Contact us with any questions or concerns.'
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
