'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ThemeProvider from '../theme/contexts/ThemeProvider';
import { ThemeOverrideProvider } from '../theme/contexts/ThemeOverrideContext';
import { ReCaptchaProvider } from '../components/ReCaptchaProvider';
import { AccessGate } from '../components/AccessGate';
import { SkipToContent } from '../theme/components/skip-to-content';
import { IosDetector } from '../components/IosDetector';
import FxNav from '../theme/components/dsm/FxNav';
import FxFooter from '../theme/components/dsm/FxFooter';
import FxPreferencesDrawer from '../theme/components/dsm/FxPreferencesDrawer';
import GoogleAnalytics from '../components/GoogleAnalytics';
import ConsentBanner from '../components/ConsentBanner';

function FxPageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <div key={pathname} ref={wrapperRef} className='fx-page-transition'>
      {children}
    </div>
  );
}

interface ProvidersProps {
  children: React.ReactNode;
  gaMeasurementId?: string;
}

export function Providers({ children, gaMeasurementId = '' }: ProvidersProps) {
  const [prefsOpen, setPrefsOpen] = useState(false);

  return (
    <>
      <IosDetector />
      <ThemeProvider>
        <ThemeOverrideProvider>
          <ReCaptchaProvider>
            <AccessGate>
              <SkipToContent />
              <FxNav />
              <FxPageTransition>{children}</FxPageTransition>
              <FxFooter preferencesOnClick={() => setPrefsOpen(true)} />
              <FxPreferencesDrawer
                open={prefsOpen}
                onClose={() => setPrefsOpen(false)}
              />
              <ConsentBanner />
              {gaMeasurementId && (
                <GoogleAnalytics measurementId={gaMeasurementId} />
              )}
            </AccessGate>
          </ReCaptchaProvider>
        </ThemeOverrideProvider>
      </ThemeProvider>
    </>
  );
}
