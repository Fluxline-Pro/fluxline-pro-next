'use client';

/**
 * NewsletterPopup Component
 * A bottom-drawer popup that randomly appears on non-home pages asking the
 * user to subscribe to the A+ in FLUX – Mythmaker Drop newsletter.
 *
 * Behaviour:
 * - Shows on a random non-home page visit after a short delay.
 * - Dimmed backdrop blocks interaction until the user acts.
 * - Clicking "X" permanently dismisses via the newsletter Zustand store.
 * - Successful subscription also closes the popup and stores state.
 */

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { Typography } from '@/theme/components/typography';
import { FormInput } from '@/theme/components/form/FormInput';
import { FormButton } from '@/theme/components/form/FormButton';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useNewsletterStore } from '@/store/store';
import { getApiEndpoint } from '@/lib/getApiUrl';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

/** Pages where the popup should never appear */
const EXCLUDED_PATHS = ['/', '/unsubscribe'];

/** Probability (0–1) that the popup will show on any eligible page visit */
const SHOW_PROBABILITY = 0.4;

/** Delay in ms before the popup appears */
const SHOW_DELAY_MS = 4000;

export const NewsletterPopup: React.FC = () => {
  const { theme } = useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const pathname = usePathname();

  const { newsletterDismissed, newsletterSubscribed, dismissNewsletter, setNewsletterSubscribed } =
    useNewsletterStore();

  const [isVisible, setIsVisible] = useState(false);
  const [hasDecided, setHasDecided] = useState(false); // Track random decision for this session
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isDark =
    theme.themeMode === 'dark' ||
    theme.themeMode === 'high-contrast' ||
    theme.themeMode === 'grayscale-dark';

  useEffect(() => {
    // Don't show if already dismissed or subscribed
    if (newsletterDismissed || newsletterSubscribed) return;

    // Don't show on excluded pages
    if (EXCLUDED_PATHS.some((p) => pathname === p)) return;

    // Decide once per session whether to show the popup
    if (!hasDecided) {
      if (Math.random() > SHOW_PROBABILITY) {
        setHasDecided(true);
        return;
      }
      setHasDecided(true);
    }

    const timer = setTimeout(() => setIsVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname, newsletterDismissed, newsletterSubscribed, hasDecided]);

  const handleDismiss = () => {
    setIsVisible(false);
    dismissNewsletter();
  };

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
      const response = await fetch(getApiEndpoint('/api/newsletter-subscribe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitState('success');
        setNewsletterSubscribed(true);
        setEmail('');
        // Auto-close after showing success briefly
        setTimeout(() => setIsVisible(false), 2500);
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data?.error || 'Something went wrong. Please try again.');
        setSubmitState('error');
      }
    } catch {
      setErrorMessage('Unable to connect. Please try again later.');
      setSubmitState('error');
    }
  };

  // Animation variants
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.2, ease: 'easeIn' },
    },
  };

  const drawerVariants: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: [0.4, 0.0, 0.2, 1.0],
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: [0.4, 0.0, 1.0, 1.0],
      },
    },
  };

  return (
    <AnimatePresence mode='wait'>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            key='newsletter-backdrop'
            variants={backdropVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            onClick={handleDismiss}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              zIndex: 1200,
            }}
            aria-hidden='true'
          />

          {/* Bottom Drawer */}
          <motion.div
            key='newsletter-drawer'
            variants={drawerVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            role='dialog'
            aria-modal='true'
            aria-label='Newsletter sign-up'
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1201,
              backgroundColor: isDark
                ? theme.palette.themeDarker
                : theme.palette.white,
              border: `1px solid ${theme.palette.neutralQuaternary}`,
              borderBottom: 'none',
              borderTopLeftRadius: theme.borderRadius.container.large,
              borderTopRightRadius: theme.borderRadius.container.large,
              boxShadow: theme.shadows?.hero || theme.effects.elevation64,
              padding: `${theme.spacing.xl} ${theme.spacing.xl} calc(${theme.spacing.xl} + env(safe-area-inset-bottom, 0px))`,
              maxWidth: '640px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              aria-label='Dismiss newsletter popup'
              style={{
                position: 'absolute',
                top: theme.spacing.m,
                right: theme.spacing.m,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(128,128,128,0.15)',
                transition: 'background-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(128,128,128,0.15)';
              }}
            >
              <FluentIcon
                iconName='Cancel'
                size='medium'
                color={theme.palette.neutralSecondary}
              />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.m }}>
              {/* Heading */}
              <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.s1 }}>
                <FluentIcon
                  iconName='Mail'
                  size='medium'
                  color={theme.palette.themePrimary}
                />
                <Typography
                  variant='h3'
                  style={{
                    color: theme.palette.themePrimary,
                    fontWeight: theme.typography.fontWeights.bold,
                    margin: 0,
                    fontSize: '1.25rem',
                  }}
                >
                  A+ in FLUX – Mythmaker Drop
                </Typography>
              </div>

              <Typography
                variant='p'
                style={{
                  color: theme.palette.neutralSecondary,
                  fontSize: '0.9375rem',
                  lineHeight: theme.typography.lineHeights.relaxed,
                  margin: 0,
                }}
              >
                Subscribe to my free, biweekly newsletter — where I share
                insights on Fluxline, The Resonance Core, and practical ways to
                improve your life using this powerful framework.
              </Typography>

              {submitState === 'success' ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.s1,
                  }}
                >
                  <FluentIcon
                    iconName='CheckMark'
                    size='medium'
                    color={theme.semanticColors.successIcon || theme.palette.green}
                  />
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
                    <div style={{ flex: '1 1 220px', minWidth: '180px' }}>
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
                    <a
                      href='/unsubscribe'
                      style={{ color: theme.palette.themePrimary }}
                      onClick={() => { setIsVisible(false); dismissNewsletter(); }}
                    >
                      fluxline.pro/unsubscribe
                    </a>
                    .
                  </Typography>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
