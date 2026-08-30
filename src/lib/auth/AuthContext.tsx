'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
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
  login: () => void;
  logout: () => void;
  getAccessToken: () => Promise<string | null>;
}

const ACCOUNT_URL =
  process.env.NEXT_PUBLIC_ACCOUNT_URL || 'https://account.fluxline.pro';

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
  const [statusHint, setStatusHint] = useState<AuthStatusPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hint = getAuthStatus();
    setStatusHint(hint);
    setIsLoading(false);
  }, []);

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
    window.location.href = `${ACCOUNT_URL}/login`;
  }, []);

  const logout = useCallback(() => {
    clearAuthStatus();
    setStatusHint(null);
    window.location.href = `${ACCOUNT_URL}/logout`;
  }, []);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    return null;
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const hintUser = statusHint ? userFromHint(statusHint) : null;
    return {
      isAuthenticated: !!hintUser,
      isLoading,
      user: hintUser,
      login,
      logout,
      getAccessToken,
    };
  }, [statusHint, isLoading, login, logout, getAccessToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
