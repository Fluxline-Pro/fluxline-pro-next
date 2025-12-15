'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedPageWrapper } from '../../../../components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { UnifiedMarkdownRenderer } from '@/utils/markdownRenderer';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { content } from '../../../../assets/legal/glossary-mythic-terms';
import { FadeUp } from '@/animations/fade-animations';

export default function CoreMythicTermsClient() {
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
            title='Core Mythic Terms'
            description='Archetypal Terminology and Mythic Architecture'
            backArrow={true}
            backArrowPath='/legal/glossary'
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
