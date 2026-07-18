import { Configuration, LogLevel } from '@azure/msal-browser';
import { getEnvironment } from '../environment';

/**
 * MSAL configuration for the SHARED Fluxline Entra app registration.
 *
 * The same app registration is used by every Fluxline site
 * (www.fluxline.pro, account.fluxline.pro, cms.fluxline.pro, the storefront)
 * so a sign-in on any subdomain is a sign-in to the same identity.
 *
 * Client-side redirects always use the current origin so localhost and each
 * deployed environment resolve to their own registered redirect URI.
 */
const REDIRECT_URIS: Record<string, string> = {
  dev: 'https://flx-next-dev.fluxline.pro/auth/callback/',
  test: 'https://flx-next-test.fluxline.pro/auth/callback/',
  prod: 'https://www.fluxline.pro/auth/callback/',
};

function getRedirectUri(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/auth/callback/`;
  }
  return REDIRECT_URIS[getEnvironment()] || REDIRECT_URIS.prod;
}

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENT_ID || '',
    authority:
      process.env.NEXT_PUBLIC_MSAL_AUTHORITY ||
      'https://login.microsoftonline.com/common',
    redirectUri: getRedirectUri(),
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message) => {
        if (getEnvironment() !== 'prod') {
          if (level === LogLevel.Error) console.error(message);
          if (level === LogLevel.Warning) console.warn(message);
        }
      },
      logLevel: getEnvironment() === 'prod' ? LogLevel.Error : LogLevel.Warning,
    },
  },
};

export const loginScopes = ['openid', 'profile', 'email'];

export const apiScopes = ['api://fluxline-identity/.default'];
