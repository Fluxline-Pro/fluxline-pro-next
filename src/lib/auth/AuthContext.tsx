'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from 'react';
import {
  setAuthStatus,
  getAuthStatus,
  clearAuthStatus,
  type AuthStatusPayload,
} from './authStatus';
import { getAccountPortalUrl } from '@/lib/integrations/config';

// Hydration flag without a setState-in-effect: false during SSR and the hydration render, true after.
const subscribeNoop = () => () => {};

export interface AuthUser {
  userId: string;
  name: string;
  email: string;
}

export interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
  getAccessToken: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: () => {},
  logout: () => {},
  getAccessToken: async () => null,
});

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
 * Authentication is delegated entirely to the Fluxline Account Portal
 * (account.fluxline.pro). This provider reads the cross-subdomain
 * `fluxline_auth_status` cookie (Domain=.fluxline.pro) to determine
 * signed-in state and surface user details in the UI.
 *
 * The NEXT.js app never initiates OAuth, acquires tokens, or processes
 * CIAM redirect parameters. All token-gated API calls are handled
 * server-side through the Account Portal or API gateway.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // `undefined` = not read yet; `null` = read, signed out. The first read happens after hydration (below),
  // so the server render and the hydration render both see "loading" and no mismatch can occur.
  const [statusHint, setStatusHint] = useState<AuthStatusPayload | null | undefined>(undefined);
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const isLoading = !hydrated;
  const initialHint = useMemo(() => (hydrated ? getAuthStatus() : null), [hydrated]);
  const currentHint = statusHint === undefined ? initialHint : statusHint;

  // Re-check the cookie periodically so a login/logout on a sibling
  // subdomain is reflected without a full page reload.
  useEffect(() => {
    const interval = setInterval(() => {
      const hint = getAuthStatus();
      setStatusHint((prev) => {
        const prevKey = prev?.userId ?? '';
        const nextKey = hint?.userId ?? '';
        const prevLoggedIn = prev?.loggedIn ?? false;
        const nextLoggedIn = hint?.loggedIn ?? false;
        if (prevKey === nextKey && prevLoggedIn === nextLoggedIn) return prev;
        return hint;
      });
    }, 5_000);
    return () => clearInterval(interval);
  }, []);

  const login = useCallback(() => {
    // Carry the current page so the Account Portal brings the user back here after sign-in.
    const returnTo = encodeURIComponent(window.location.href);
    window.location.href = `${getAccountPortalUrl()}/login?returnTo=${returnTo}`;
  }, []);

  const logout = useCallback(() => {
    clearAuthStatus();
    setStatusHint(null);
    window.location.href = `${getAccountPortalUrl()}/logout`;
  }, []);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    return null;
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const hintUser = currentHint ? userFromHint(currentHint) : null;
    return {
      isAuthenticated: !!hintUser,
      isLoading,
      user: hintUser,
      login,
      logout,
      getAccessToken,
    };
  }, [currentHint, isLoading, login, logout, getAccessToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
