'use client';

import React from 'react';
import Link from 'next/link';
import { FxButton } from '@/theme/components/dsm';

const REDIRECT_URL = 'https://theresonantidentity.com';
const COUNTDOWN_SECONDS = 5;

/**
 * TheResonantIdRedirect
 * Interstitial shown for the retired /podcasts/theresonantid section (and, via the
 * Azure Static Web Apps route rewrite, anything beneath it). The Resonant Identity
 * now lives at its own home, TheResonantIdentity.com. Mirrors the 404 design,
 * invites the visitor to update their bookmarks, and auto-redirects after a short
 * countdown.
 */
export default function TheResonantIdRedirect() {
  const [seconds, setSeconds] = React.useState(COUNTDOWN_SECONDS);

  React.useEffect(() => {
    if (seconds <= 0) {
      window.location.replace(REDIRECT_URL);
      return;
    }
    const timer = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  return (
    <div
      style={{
        background:
          'var(--fx-gradient-hero, linear-gradient(160deg,#05070B 0%,#0B1019 55%,#0E1523 100%))',
        color: 'var(--fx-text-body)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox='0 0 1400 900'
        preserveAspectRatio='xMidYMid slice'
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.4,
        }}
        aria-hidden='true'
      >
        <g stroke='#5E81A8' strokeWidth='1' opacity='.3'>
          <path
            d='M-40 700 L310 520 L520 720 L780 580 L1060 740 L1290 540 L1460 640'
            fill='none'
          />
          <path
            d='M180 -40 L420 180 L700 70 L960 240 L1240 100 L1440 220'
            fill='none'
          />
          <path
            d='M310 520 L420 180 M780 580 L700 70'
            fill='none'
            opacity='.5'
            strokeDasharray='6 8'
          />
          <path
            d='M1060 740 L1240 100'
            fill='none'
            opacity='.35'
            strokeDasharray='3 10'
          />
        </g>
        <g fill='#9FB6D4'>
          <circle cx='310' cy='520' r='3.5' opacity='0.5' />
          <circle cx='700' cy='70' r='3' opacity='0.5' />
          <circle cx='1240' cy='100' r='3.5' opacity='0.5' />
          <circle cx='1060' cy='740' r='2.5' opacity='0.5' />
        </g>
      </svg>

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 32px',
        }}
      >
        <div style={{ maxWidth: 720, width: '100%', textAlign: 'center' }}>
          <div
            style={{
              fontSize: 13,
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: 'var(--fx-text-soft)',
              marginBottom: 14,
            }}
          >
            The Resonant Identity &middot; New Home
          </div>

          <h1
            style={{
              fontSize: 'clamp(72px, 13vw, 140px)',
              fontWeight: 800,
              letterSpacing: '.02em',
              color: 'var(--fx-text-heading-display)',
              margin: '0 0 6px',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}
            aria-hidden='true'
          >
            {seconds}
          </h1>

          <div
            style={{
              height: 2,
              width: 220,
              margin: '0 auto 26px',
              background:
                'linear-gradient(90deg,transparent,var(--fx-line),var(--fx-accent),var(--fx-line),transparent)',
            }}
          />

          <p
            style={{
              fontSize: 19,
              fontWeight: 600,
              color: 'var(--fx-teal)',
              margin: '0 0 10px',
            }}
          >
            The Resonant Identity has moved to its own home.
          </p>

          <p
            style={{
              fontSize: 15.5,
              lineHeight: 1.7,
              color: 'var(--fx-text-soft)',
              margin: '0 auto 14px',
              maxWidth: '52ch',
            }}
          >
            This part of the journey now lives at{' '}
            <strong style={{ color: 'var(--fx-text-heading)' }}>
              TheResonantIdentity.com
            </strong>
            . Please update your bookmarks &mdash; the whole ecosystem of
            identity architecture, community, and practice is waiting for you
            there.
          </p>

          <p
            aria-live='polite'
            style={{
              fontSize: 14.5,
              color: 'var(--fx-text-muted)',
              margin: '0 0 32px',
            }}
          >
            Redirecting in {seconds} second{seconds === 1 ? '' : 's'}&hellip;
          </p>

          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <FxButton size='lg' href={REDIRECT_URL}>
              Go to TheResonantIdentity.com now &rarr;
            </FxButton>
            <Link
              href='/podcasts'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'var(--fx-text-soft)',
                fontSize: 14.5,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              &larr; Back to Fluxline Podcasts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
