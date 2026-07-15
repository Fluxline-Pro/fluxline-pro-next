'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';
import { useConsentStore } from '@/store';

interface GoogleAnalyticsProps {
  measurementId: string;
}

/**
 * Pushes an updated consent state to gtag whenever the user's stored
 * consent preferences change.  The script itself is only rendered when
 * a valid measurement ID is provided.
 */
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const consent = useConsentStore((s) => s.consent);

  // Sync consent preferences with Google Consent Mode v2 whenever they change
  useEffect(() => {
    if (typeof window === 'undefined' || !window.gtag) return;

    window.gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.adStorage ? 'granted' : 'denied',
      ad_user_data: consent.adUserData ? 'granted' : 'denied',
      ad_personalization: consent.adPersonalization ? 'granted' : 'denied',
    });
  }, [consent]);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
