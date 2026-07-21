'use client';

/**
 * Auth Status Token System
 *
 * Surfaces a lightweight "is this user logged in" hint that sibling Fluxline
 * apps (the account portal, the CMS, the storefront) write/read so login state
 * is reflected in every app's UI regardless of which subdomain the user
 * actually signed in on.
 *
 * It is written to TWO places:
 *  - localStorage (same-origin) under `fluxline_auth_status`
 *  - a cookie scoped to `.fluxline.pro` so *.fluxline.pro subdomains can read
 *    it cross-subdomain (localStorage is per-origin and cannot be shared).
 *
 * Reads check localStorage first and fall back to the cross-subdomain cookie,
 * so a sign-in performed on account.fluxline.pro is visible here even though
 * this origin's localStorage is empty.
 *
 * This is a NON-SECRET convenience hint, not an access token and not a
 * security boundary. Never put a bearer token here. Anything privileged must
 * still call an API that validates the real Entra token server-side
 * (see /api/entitlements).
 *
 * Format: { loggedIn, userId?, displayName?, email?, avatarUrl?, expiresAt }
 */

const AUTH_STATUS_KEY = 'fluxline_auth_status';
const COOKIE_NAME = 'fluxline_auth_status';

export interface AuthStatusPayload {
  loggedIn: boolean;
  userId?: string;
  displayName?: string;
  email?: string;
  avatarUrl?: string | null;
  expiresAt: number;
}

/**
 * Returns the parent domain to scope the cross-subdomain cookie to
 * (e.g. `.fluxline.pro`), or null on localhost/unknown hosts where a
 * host-only cookie is correct.
 */
function getCookieDomain(): string | null {
  if (typeof window === 'undefined') return null;
  const host = window.location.hostname;

  // Handle localhost and IP addresses
  if (/^(localhost|\d{1,3}(\.\d{1,3}){3}|::1)$/i.test(host)) return null;

  // Restrict the Domain attribute to .fluxline.pro
  const parts = host.split('.');
  if (parts.length < 2) return null;
  if (!host.endsWith('.fluxline.pro') && host !== 'fluxline.pro') return null;

  return '.fluxline.pro';
}

function writeCookie(value: string, maxAgeSeconds: number): void {
  if (typeof document === 'undefined') return;
  const domain = getCookieDomain();
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const domainAttr = domain ? `; Domain=${domain}` : '';
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    value
  )}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${domainAttr}${secure}`;
}

function readCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    return decodeURIComponent(match.slice(COOKIE_NAME.length + 1));
  } catch {
    return null;
  }
}

function deleteCookie(): void {
  if (typeof document === 'undefined') return;
  const domain = getCookieDomain();
  const domainAttr = domain ? `; Domain=${domain}` : '';
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${domainAttr}`;
}

/** Parse + validate a serialized payload. Returns null when invalid/expired. */
function parsePayload(raw: string | null): AuthStatusPayload | null {
  if (!raw) return null;
  try {
    const payload: AuthStatusPayload = JSON.parse(raw);
    if (typeof payload !== 'object' || payload === null) return null;
    if (typeof payload.loggedIn !== 'boolean') return null;
    if (typeof payload.expiresAt !== 'number') return null;
    if (Date.now() > payload.expiresAt) return null;
    return payload;
  } catch {
    return null;
  }
}

export function setAuthStatus(payload: AuthStatusPayload): void {
  if (typeof window === 'undefined') return;
  const serialized = JSON.stringify(payload);
  try {
    localStorage.setItem(AUTH_STATUS_KEY, serialized);
  } catch {
    // localStorage unavailable (private browsing, quota)
  }
  const maxAge = Math.max(
    0,
    Math.floor((payload.expiresAt - Date.now()) / 1000)
  );
  writeCookie(serialized, maxAge);
}

export function getAuthStatus(): AuthStatusPayload | null {
  if (typeof window === 'undefined') return null;

  // Same-origin hint first
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(AUTH_STATUS_KEY);
  } catch {
    raw = null;
  }
  const local = parsePayload(raw);
  if (local) return local;

  if (raw) {
    // Present but expired/corrupt — clean up the same-origin copy only.
    try {
      localStorage.removeItem(AUTH_STATUS_KEY);
    } catch {
      // noop
    }
  }

  // Fall back to the cross-subdomain cookie (sign-in happened on a sibling
  // subdomain such as account.fluxline.pro).
  return parsePayload(readCookie());
}

export function clearAuthStatus(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTH_STATUS_KEY);
  } catch {
    // noop
  }
  deleteCookie();
}
