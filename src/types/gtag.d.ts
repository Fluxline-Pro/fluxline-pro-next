// Type augmentation for the Google gtag global injected by Google Analytics / Tag Manager

type GtagConsentArg = 'granted' | 'denied';

interface GtagConsentParams {
  analytics_storage?: GtagConsentArg;
  ad_storage?: GtagConsentArg;
  ad_user_data?: GtagConsentArg;
  ad_personalization?: GtagConsentArg;
  wait_for_update?: number;
}

interface Window {
  dataLayer: unknown[];
  gtag: (
    command: 'event' | 'config' | 'set' | 'js' | 'consent',
    target: string | Date | GtagConsentParams,
    params?: Record<string, unknown> | GtagConsentParams
  ) => void;
}
