'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Typography } from '@/theme/components/typography/';
import { FormButton } from '@/theme/components/form/FormButton';
import { Hero } from '@/theme/components/hero';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';

/**
 * Purchase Success page shown after a successful Stripe checkout.
 * Informs the customer that their personalized PDF will arrive by email.
 */
export function PurchaseSuccessClient() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <main
      style={{
        padding: isMobile ? theme.spacing.m : theme.spacing.xl,
        maxWidth: '1200px',
        margin: '0 auto',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 120px)',
        display: isMobile ? 'block' : 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: isMobile ? theme.spacing.xl : theme.spacing.l,
      }}
    >
      <Hero
        title='Purchase Successful!'
        subtitle='Your personalized PDF is on its way'
        description='Thank you for your purchase. Your watermarked PDF is being prepared and will be emailed to you within the next few minutes.'
        iconName='CheckMark'
        showBorder={true}
        showShadow={false}
      />

      {/* Next Steps Section */}
      <div
        style={{
          marginTop: theme.spacing.xl,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: theme.spacing.l,
        }}
      >
        {/* What to Expect */}
        <div
          style={{
            padding: theme.spacing.l,
            backgroundColor: theme.palette.neutralLighter,
            borderRadius: theme.effects.roundedCorner6,
            border: `1px solid ${theme.palette.neutralTertiary}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.m,
              marginBottom: theme.spacing.m,
            }}
          >
            <FluentIcon
              iconName='Mail'
              size='large'
              color={theme.palette.themePrimary}
            />
            <Typography
              variant='h4'
              style={{ color: theme.palette.themePrimary, margin: 0 }}
            >
              What to Expect
            </Typography>
          </div>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.s,
            }}
          >
            <li
              style={{
                display: 'flex',
                gap: theme.spacing.s,
                alignItems: 'flex-start',
              }}
            >
              <FluentIcon
                iconName='CircleFill'
                size='small'
                color={theme.palette.themePrimary}
                style={{ marginTop: '0.25rem', flexShrink: 0 }}
              />
              <Typography
                variant='body'
                style={{ color: theme.palette.neutralPrimary, margin: 0 }}
              >
                Check your email inbox within the next 5-10 minutes
              </Typography>
            </li>
            <li
              style={{
                display: 'flex',
                gap: theme.spacing.s,
                alignItems: 'flex-start',
              }}
            >
              <FluentIcon
                iconName='CircleFill'
                size='small'
                color={theme.palette.themePrimary}
                style={{ marginTop: '0.25rem', flexShrink: 0 }}
              />
              <Typography
                variant='body'
                style={{ color: theme.palette.neutralPrimary, margin: 0 }}
              >
                Your PDF has been watermarked with your name and email for
                security
              </Typography>
            </li>
            <li
              style={{
                display: 'flex',
                gap: theme.spacing.s,
                alignItems: 'flex-start',
              }}
            >
              <FluentIcon
                iconName='CircleFill'
                size='small'
                color={theme.palette.themePrimary}
                style={{ marginTop: '0.25rem', flexShrink: 0 }}
              />
              <Typography
                variant='body'
                style={{ color: theme.palette.neutralPrimary, margin: 0 }}
              >
                If you don&apos;t see it, check your spam or junk folder
              </Typography>
            </li>
          </ul>
        </div>

        {/* Important: 7-Day Window */}
        <div
          style={{
            padding: theme.spacing.l,
            backgroundColor: theme.palette.themeLighterAlt,
            borderRadius: theme.effects.roundedCorner6,
            border: `3px solid ${theme.palette.themePrimary}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.m,
              marginBottom: theme.spacing.m,
            }}
          >
            <FluentIcon
              iconName='Clock'
              size='large'
              color={theme.palette.themePrimary}
            />
            <Typography
              variant='h4'
              style={{ color: theme.palette.themePrimary, margin: 0 }}
            >
              Important: Download Window
            </Typography>
          </div>
          <Typography
            variant='body'
            style={{
              color: theme.palette.neutralPrimary,
              marginBottom: theme.spacing.m,
              fontWeight: theme.typography.fontWeights.semiBold,
            }}
          >
            Your download link is valid for 7 days only.
          </Typography>
          <Typography
            variant='bodySmall'
            style={{
              color: theme.palette.neutralSecondary,
              marginBottom: theme.spacing.m,
            }}
          >
            After 7 days, the secure download link in your email will expire for
            security reasons. Make sure to download your PDF within this
            timeframe.
          </Typography>
          <div
            style={{
              padding: theme.spacing.s,
              backgroundColor: theme.palette.neutralLighter,
              borderRadius: theme.effects.roundedCorner4,
              border: `1px solid ${theme.palette.neutralTertiary}`,
            }}
          >
            <Typography
              variant='bodySmall'
              style={{ color: theme.palette.neutralSecondary, margin: 0 }}
            >
              <strong>Need help?</strong> Contact us at{' '}
              <a
                href='mailto:support@fluxline.pro'
                style={{
                  color: theme.palette.themePrimary,
                  textDecoration: 'none',
                  fontWeight: theme.typography.fontWeights.semiBold,
                }}
              >
                support@fluxline.pro
              </a>
            </Typography>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div
        style={{
          marginTop: theme.spacing.xl,
          display: 'flex',
          gap: theme.spacing.m,
          flexWrap: 'wrap',
        }}
      >
        <FormButton
          variant='primary'
          text='Back to Books'
          icon='BookAnswers'
          size='large'
          onClick={() => router.push('/books')}
        />
        <FormButton
          variant='secondary'
          text='Explore Services'
          icon='Rocket'
          size='large'
          onClick={() => router.push('/services')}
        />
        <FormButton
          variant='outline'
          text='Contact Support'
          icon='Mail'
          size='large'
          onClick={() => router.push('/contact')}
        />
      </div>
    </main>
  );
}
