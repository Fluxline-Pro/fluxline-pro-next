'use client';

import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
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
export default function GoogleAnalytics({
  measurementId,
}: GoogleAnalyticsProps) {
  const consent = useConsentStore((s) => s.consent);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

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

  useEffect(() => {
    if (!consent.analytics || typeof window === 'undefined' || !window.gtag) {
      return;
    }

    const pagePath = search ? `${pathname}?${search}` : pathname;

    window.gtag('config', measurementId, {
      page_path: pagePath,
    });
  }, [consent.analytics, measurementId, pathname, search]);

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
          gtag('config', '${measurementId}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
