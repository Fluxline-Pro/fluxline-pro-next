'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FxButton from '@/theme/components/dsm/FxButton';
import FxSwitch from '@/theme/components/dsm/FxSwitch';
import { useConsentStore } from '@/store';

/**
 * EEA / GDPR Consent Banner
 *
 * Appears as a bottom drawer for first-time visitors.  Allows users to
 * accept all cookies, reject all, or customise individual consent categories
 * (analytics, advertising).  Consent decisions are persisted via the
 * consentStore (Zustand + localStorage) and forwarded to Google Consent
 * Mode v2 by the <GoogleAnalytics> component.
 */
export default function ConsentBanner() {
  const { consent, acceptAll, rejectAll, saveCustom } = useConsentStore();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Analytics toggle (custom mode)
  const [analyticsOn, setAnalyticsOn] = useState(false);
  // Ads toggles (custom mode)
  const [adsOn, setAdsOn] = useState(false);

  // Only show after hydration and only when consent is still pending
  useEffect(() => {
    if (consent.status === 'pending') {
      setVisible(true);
    }
  }, [consent.status]);

  if (!visible) return null;

  const handleAcceptAll = () => {
    acceptAll();
    setVisible(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setVisible(false);
  };

  const handleSaveCustom = () => {
    saveCustom({
      analytics: analyticsOn,
      adStorage: adsOn,
      adUserData: adsOn,
      adPersonalization: adsOn,
    });
    setVisible(false);
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--fx-surface-card)',
    border: '1px solid var(--fx-border)',
    borderRadius: 10,
    padding: '14px 16px',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  };

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1099,
          background: 'rgba(0,0,0,0.45)',
          pointerEvents: 'auto',
        }}
      />

      {/* Banner / bottom drawer */}
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Cookie and Privacy Consent'
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          background: 'var(--fx-bg-deep)',
          borderTop: '1px solid var(--fx-border)',
          padding: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 -12px 48px rgba(0,0,0,0.4)',
          maxHeight: '90dvh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h2
            style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              fontWeight: 800,
              color: 'var(--fx-text-heading-display)',
              letterSpacing: '-0.02em',
              margin: '0 0 6px',
            }}
          >
            Your Privacy &amp; Cookie Preferences
          </h2>
          <p
            style={{
              fontSize: 14,
              color: 'var(--fx-text-muted)',
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            We use cookies and similar technologies to provide core
            functionality, measure site performance, and—with your
            consent—deliver relevant ads and personalised content.
            {' '}
            <Link
              href='/legal/privacy-policy'
              style={{ color: 'var(--fx-accent)', textDecoration: 'underline' }}
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Granular controls (shown when "Manage Preferences" is expanded) */}
        {showDetails && (
          <div style={{ marginBottom: 18 }}>
            {/* Essential — always on */}
            <div style={{ ...cardStyle, opacity: 0.7 }}>
              <div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--fx-text-heading)',
                    margin: '0 0 2px',
                  }}
                >
                  Essential Cookies
                </p>
                <p
                  style={{
                    fontSize: 12.5,
                    color: 'var(--fx-text-muted)',
                    margin: 0,
                  }}
                >
                  Required for the site to function. Cannot be disabled.
                </p>
              </div>
              <FxSwitch checked disabled onChange={() => {}} />
            </div>

            {/* Analytics */}
            <div style={cardStyle}>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--fx-text-heading)',
                    margin: '0 0 2px',
                  }}
                >
                  Analytics Cookies
                </p>
                <p
                  style={{
                    fontSize: 12.5,
                    color: 'var(--fx-text-muted)',
                    margin: 0,
                  }}
                >
                  Help us understand how visitors use the site (Google
                  Analytics). No personally identifiable data is shared.
                </p>
              </div>
              <FxSwitch checked={analyticsOn} onChange={setAnalyticsOn} />
            </div>

            {/* Ads / Personalisation */}
            <div style={{ ...cardStyle, marginBottom: 0 }}>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--fx-text-heading)',
                    margin: '0 0 2px',
                  }}
                >
                  Advertising &amp; Personalisation
                </p>
                <p
                  style={{
                    fontSize: 12.5,
                    color: 'var(--fx-text-muted)',
                    margin: 0,
                  }}
                >
                  Allows Google Ads to show relevant ads and measure ad
                  performance. We use Google AdSense (pub-7691902367885014).
                </p>
              </div>
              <FxSwitch checked={adsOn} onChange={setAdsOn} />
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <FxButton variant='primary' size='sm' onClick={handleAcceptAll}>
            Accept All
          </FxButton>

          <FxButton variant='outline' size='sm' onClick={handleRejectAll}>
            Reject All
          </FxButton>

          {showDetails ? (
            <FxButton variant='outline' size='sm' onClick={handleSaveCustom}>
              Save Preferences
            </FxButton>
          ) : (
            <FxButton
              variant='quiet'
              size='sm'
              onClick={() => setShowDetails(true)}
              style={{ color: 'var(--fx-text-soft)' }}
            >
              Manage Preferences
            </FxButton>
          )}
        </div>
      </div>
    </>
  );
}
