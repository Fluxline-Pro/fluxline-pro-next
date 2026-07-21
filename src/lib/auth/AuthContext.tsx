'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import type {
  AccountInfo,
  AuthenticationResult,
  IPublicClientApplication,
} from '@azure/msal-browser';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { getMsalInstance } from './msalInstance';
import { loginScopes, apiScopes } from './msalConfig';
import {
  setAuthStatus,
  getAuthStatus,
  clearAuthStatus,
  type AuthStatusPayload,
} from './authStatus';

export interface AuthUser {
  userId: string;
  name: string;
  email: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  logout: async () => {},
  getAccessToken: async () => null,
});

/**
 * The ecosystem's universal identity key is the Entra `oid` claim — every
 * per-user record across the storefront, account, and CMS backends is
 * partitioned by it, and `api/lib/validateToken.js` resolves the caller the
 * same way (`oid` first, `sub` as fallback). MSAL's `localAccountId` is only
 * incidentally the oid on a workforce tenant, so read the claim directly and
 * keep `localAccountId` as a last-resort fallback for a claim-less account.
 */
function extractUser(account: AccountInfo): AuthUser {
  const claims = account.idTokenClaims as Record<string, unknown> | undefined;
  return {
    userId:
      (claims?.oid as string) ||
      (claims?.sub as string) ||
      account.localAccountId,
    name: account.name || account.username,
    email: (claims?.email as string) || account.username,
  };
}

function userFromHint(hint: AuthStatusPayload): AuthUser | null {
  if (!hint.loggedIn) return null;
  return {
    userId: hint.userId || '',
    name: hint.displayName || hint.email || '',
    email: hint.email || '',
  };
}

/**
 * AuthProvider for the main fluxline.pro site.
 *
 * Uses the SHARED Fluxline Entra app registration via @azure/msal-browser.
 * Unlike the account portal (which owns authentication and blocks rendering
 * until MSAL is ready), this provider always renders children immediately —
 * the marketing site must not blank while MSAL initializes.
 *
 * Cross-subdomain state: MSAL's sessionStorage cache is per-origin, so a user
 * who signed in on account.fluxline.pro has no MSAL account here. The
 * `fluxline_auth_status` cookie (Domain=.fluxline.pro) written by whichever
 * app performed the sign-in provides the signed-in hint; we additionally
 * attempt a silent SSO to materialize a real token on this origin. The hint
 * is only cleared on explicit logout — never just because this origin lacks
 * an MSAL session.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [statusHint, setStatusHint] = useState<AuthStatusPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [instance, setInstance] = useState<IPublicClientApplication | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const msal = getMsalInstance();
      await msal.initialize();

      // Cookie/localStorage hint is available immediately after the (local,
      // fast) initialize step — surface it before the network-bound redirect
      // handling / silent SSO below so a user signed in on a sibling
      // subdomain never sees a signed-in → signed-out flash.
      const hint = getAuthStatus();
      if (!cancelled && hint) setStatusHint(hint);

      const result: AuthenticationResult | null =
        await msal.handleRedirectPromise();

      let activeAccount: AccountInfo | null = null;
      if (result?.account) {
        msal.setActiveAccount(result.account);
        activeAccount = result.account;
      } else {
        const accounts = msal.getAllAccounts();
        if (accounts.length > 0) {
          msal.setActiveAccount(accounts[0]);
          activeAccount = accounts[0];
        }
      }

      // Signed in on a sibling subdomain (hint present) but no MSAL account
      // on this origin — try to pick the session up silently.
      if (!activeAccount && hint?.loggedIn) {
        try {
          const ssoResult = await msal.ssoSilent({
            scopes: loginScopes,
            loginHint: hint.email,
          });
          if (ssoResult.account) {
            msal.setActiveAccount(ssoResult.account);
            activeAccount = ssoResult.account;
          }
        } catch {
          // Silent SSO can fail (third-party cookie blocking, expired IdP
          // session). Keep the hint-based signed-in state; token-requiring
          // calls will return null until an interactive login.
        }
      }

      if (!cancelled) {
        // Keep the cross-subdomain auth-status hint fresh while we hold a
        // real MSAL account. Never clear it when we merely lack an account —
        // a missing MSAL session on this origin does not mean the user
        // signed out of the ecosystem.
        if (activeAccount) {
          const user = extractUser(activeAccount);
          const payload: AuthStatusPayload = {
            loggedIn: true,
            userId: user.userId,
            displayName: user.name,
            email: user.email,
            expiresAt: Date.now() + 3600_000, // 1 hour
          };
          setAuthStatus(payload);
          setStatusHint(payload);
        }
        setAccount(activeAccount);
        setInstance(msal);
        setIsLoading(false);
      }
    };

    init().catch((err) => {
      console.error('MSAL init failed:', err);
      if (!cancelled) {
        setIsLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async () => {
    const msal = instance ?? getMsalInstance();
    if (!instance) {
      await msal.initialize();
    }
    await msal.loginRedirect({ scopes: loginScopes });
  }, [instance]);

  const logout = useCallback(async () => {
    clearAuthStatus();
    setStatusHint(null);
    if (instance && account) {
      await instance.logoutRedirect({ postLogoutRedirectUri: '/' });
    } else {
      setAccount(null);
    }
  }, [instance, account]);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    if (!instance || !account) return null;
    try {
      const result = await instance.acquireTokenSilent({
        scopes: apiScopes,
        account,
      });
      return result.accessToken;
    } catch (err) {
      if (err instanceof InteractionRequiredAuthError) {
        await instance.loginRedirect({ scopes: apiScopes });
        return null;
      }
      console.error('Token acquisition failed:', err);
      return null;
    }
  }, [instance, account]);

  const value = useMemo<AuthContextValue>(() => {
    const hintUser = statusHint ? userFromHint(statusHint) : null;
    return {
      isAuthenticated: !!account || !!hintUser,
      isLoading,
      user: account ? extractUser(account) : hintUser,
      login,
      logout,
      getAccessToken,
    };
  }, [account, statusHint, isLoading, login, logout, getAccessToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
