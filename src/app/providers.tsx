'use client';

import React, { useState } from 'react';
import ThemeProvider from '../theme/contexts/ThemeProvider';
import { ThemeOverrideProvider } from '../theme/contexts/ThemeOverrideContext';
import { ReCaptchaProvider } from '../components/ReCaptchaProvider';
import { AccessGate } from '../components/AccessGate';
import { SkipToContent } from '../theme/components/skip-to-content';
import { IosDetector } from '../components/IosDetector';
import FxNav from '../theme/components/dsm/FxNav';
import FxFooter from '../theme/components/dsm/FxFooter';
import FxPreferencesDrawer from '../theme/components/dsm/FxPreferencesDrawer';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
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
              {children}
              <FxFooter preferencesOnClick={() => setPrefsOpen(true)} />
              <FxPreferencesDrawer
                open={prefsOpen}
                onClose={() => setPrefsOpen(false)}
              />
            </AccessGate>
          </ReCaptchaProvider>
        </ThemeOverrideProvider>
      </ThemeProvider>
    </>
  );
}
