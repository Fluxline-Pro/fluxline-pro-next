'use client';

import { UnifiedPageWrapper } from '../../../components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Callout } from '@/theme/components/callout';
import { UnifiedMarkdownRenderer } from '@/utils/markdownRenderer';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { content } from '../../../assets/legal/stewardship-contract';
import { FadeUp } from '@/animations/fade-animations';
import { BookingsButton } from '@/theme/components/button/bookings-button';

export default function StewardshipContractClientPage() {
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
            action={<BookingsButton isHero />}
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
