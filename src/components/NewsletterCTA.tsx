'use client';

/**
 * NewsletterCTA Component
 * Inline call-to-action section inviting users to subscribe to the
 * The Resonant Identity email newsletter.
 * Used on /about, /fluxline-ethos, and /contact pages.
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Typography } from '@/theme/components/typography';
import { FormInput } from '@/theme/components/form/FormInput';
import { FormButton } from '@/theme/components/form/FormButton';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useNewsletterStore } from '@/store/store';
import { getApiEndpoint } from '@/lib/getApiUrl';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export const NewsletterCTA: React.FC = () => {
  const { theme } = useAppTheme();
  const { newsletterSubscribed, setNewsletterSubscribed } =
    useNewsletterStore();

  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setSubmitState('loading');
    setErrorMessage('');

    try {
      const response = await fetch(
        getApiEndpoint('/api/newsletter-subscribe'),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setSubmitState('success');
        setNewsletterSubscribed(true);
        setEmail('');
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(
          data?.error || 'Something went wrong. Please try again.'
        );
        setSubmitState('error');
      }
    } catch {
      setErrorMessage('Unable to connect. Please try again later.');
      setSubmitState('error');
    }
  };

  const cardBackground = isDark
    ? 'rgba(255, 255, 255, 0.04)'
    : 'rgba(0, 0, 0, 0.03)';

  return (
    <section
      style={{
        backgroundColor: cardBackground,
        border: `1px solid ${theme.palette.neutralQuaternary}`,
        borderRadius: theme.borderRadius.container.medium,
        padding: theme.spacing.xl,
      }}
      aria-label='Newsletter sign-up'
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.m,
        }}
      >
        {/* Heading row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.s1,
          }}
        >
          <FluentIcon
            iconName='Mail'
            size='large'
            color={theme.palette.themePrimary}
          />
          <Typography
            variant='h3'
            style={{
              color: theme.palette.themePrimary,
              fontWeight: theme.typography.fontWeights.bold,
              margin: 0,
            }}
          >
            The Resonant Identity
          </Typography>
        </div>

        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '1rem',
            lineHeight: theme.typography.lineHeights.relaxed,
            margin: 0,
          }}
        >
          Subscribe to The Resonant Identity email newsletter — where we share
          insights on Fluxline, The Resonance Core Framework, and practical
          ways to improve your life using it. <br /><br />
          Also, join our{' '}
          <a
            href='https://www.facebook.com/groups/aplusinfluxmythmaker'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: theme.palette.themePrimary }}
          >
            Facebook group
          </a>
          .
        </Typography>

        {newsletterSubscribed || submitState === 'success' ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.s1,
              color: theme.semanticColors.successIcon || theme.palette.green,
            }}
          >
            <FluentIcon iconName='CheckMark' size='large' />
            <Typography
              variant='p'
              style={{
                color: theme.semanticColors.successIcon || theme.palette.green,
                fontWeight: theme.typography.fontWeights.semiBold,
                margin: 0,
              }}
            >
              You&apos;re subscribed! Thank you for joining.
            </Typography>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                gap: theme.spacing.s1,
                flexWrap: 'wrap',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flex: '1 1 260px', minWidth: '200px' }}>
                <FormInput
                  type='email'
                  placeholder='Enter your email address'
                  value={email}
                  onChange={setEmail}
                  aria-label='Email address for newsletter'
                  disabled={submitState === 'loading'}
                />
              </div>
              <FormButton
                text={submitState === 'loading' ? 'Subscribing…' : 'Subscribe'}
                variant='primary'
                size='medium'
                icon='Mail'
                iconPosition='left'
                onClick={handleSubscribe}
                disabled={submitState === 'loading'}
              />
            </div>

            {errorMessage && (
              <p
                style={{
                  color: theme.semanticColors.errorText || theme.palette.red,
                  fontSize: '0.875rem',
                  margin: 0,
                }}
                role='alert'
              >
                {errorMessage}
              </p>
            )}

            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralTertiary,
                fontSize: '0.8rem',
                margin: 0,
              }}
            >
              No spam, ever. Unsubscribe anytime at{' '}
              <Link
                href='/unsubscribe'
                style={{ color: theme.palette.themePrimary }}
              >
                fluxline.pro/unsubscribe
              </Link>
              .
            </Typography>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsletterCTA;
