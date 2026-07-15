import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ConsentStatus = 'pending' | 'accepted' | 'rejected' | 'custom';

export interface ConsentPreferences {
  /** Whether the user has interacted with the consent banner */
  status: ConsentStatus;
  /** Consent for analytics cookies (Google Analytics) */
  analytics: boolean;
  /** Consent for ad storage cookies */
  adStorage: boolean;
  /** Consent for use of ad user data */
  adUserData: boolean;
  /** Consent for ad personalization */
  adPersonalization: boolean;
}

export interface ConsentState {
  consent: ConsentPreferences;
  acceptAll: () => void;
  rejectAll: () => void;
  saveCustom: (prefs: Omit<ConsentPreferences, 'status'>) => void;
  resetConsent: () => void;
}

const defaultConsent: ConsentPreferences = {
  status: 'pending',
  analytics: false,
  adStorage: false,
  adUserData: false,
  adPersonalization: false,
};

export const useConsentStore = create<ConsentState>()(
  persist(
    (set) => ({
      consent: defaultConsent,
      acceptAll: () =>
        set({
          consent: {
            status: 'accepted',
            analytics: true,
            adStorage: true,
            adUserData: true,
            adPersonalization: true,
          },
        }),
      rejectAll: () =>
        set({
          consent: {
            status: 'rejected',
            analytics: false,
            adStorage: false,
            adUserData: false,
            adPersonalization: false,
          },
        }),
      saveCustom: (prefs) =>
        set({
          consent: {
            status: 'custom',
            ...prefs,
          },
        }),
      resetConsent: () =>
        set({
          consent: defaultConsent,
        }),
    }),
    {
      name: 'fluxline.consent',
      skipHydration: typeof window === 'undefined',
    }
  )
);
