'use client';

import { useMemo } from 'react';
import { useAuth } from '@/lib/auth';
import { createFluxlineClient, type FluxlineClient } from './index';

/**
 * The orchestrator, wired to the signed-in session.
 *
 * Bridges the auth layer to the integration layer without either importing the
 * other: `createFluxlineClient` takes a token provider, and this hook supplies
 * the one from `useAuth`.
 *
 * The client is memoised on `getAccessToken`, which `AuthProvider` keeps stable
 * for a given MSAL instance and account — so the object identity only changes
 * when the signed-in user actually changes, and it is safe in effect
 * dependency arrays.
 *
 * @example
 * const fluxline = useFluxline();
 * useEffect(() => {
 *   const controller = new AbortController();
 *   fluxline.entitlements
 *     .list(controller.signal)
 *     .then(setEntitlements)
 *     .catch(() => setEntitlements([]));
 *   return () => controller.abort();
 * }, [fluxline]);
 */
export function useFluxline(): FluxlineClient {
  const { getAccessToken } = useAuth();
  return useMemo(() => createFluxlineClient(getAccessToken), [getAccessToken]);
}
