/**
 * @jest-environment jsdom
 */
import {
  setAuthStatus,
  getAuthStatus,
  clearAuthStatus,
  type AuthStatusPayload,
} from './authStatus';

const COOKIE_NAME = 'fluxline_auth_status';

function clearCookie() {
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

describe('authStatus', () => {
  beforeEach(() => {
    localStorage.clear();
    clearCookie();
  });

  it('returns null when no status is set', () => {
    expect(getAuthStatus()).toBeNull();
  });

  it('stores and retrieves auth status', () => {
    const payload: AuthStatusPayload = {
      loggedIn: true,
      userId: 'user-123',
      displayName: 'Test User',
      email: 'test@example.com',
      expiresAt: Date.now() + 3600_000,
    };
    setAuthStatus(payload);
    expect(getAuthStatus()).toEqual(payload);
  });

  it('writes the hint to both localStorage and a cookie', () => {
    const payload: AuthStatusPayload = {
      loggedIn: true,
      userId: 'user-123',
      expiresAt: Date.now() + 3600_000,
    };
    setAuthStatus(payload);
    expect(localStorage.getItem(COOKIE_NAME)).toBe(JSON.stringify(payload));
    expect(document.cookie).toContain(`${COOKIE_NAME}=`);
  });

  it('returns null for expired status', () => {
    setAuthStatus({
      loggedIn: true,
      userId: 'user-123',
      displayName: 'Test',
      expiresAt: Date.now() - 1000, // expired
    });
    expect(getAuthStatus()).toBeNull();
  });

  it('removes an expired localStorage entry on read', () => {
    localStorage.setItem(
      COOKIE_NAME,
      JSON.stringify({ loggedIn: true, expiresAt: Date.now() - 1000 })
    );
    expect(getAuthStatus()).toBeNull();
    expect(localStorage.getItem(COOKIE_NAME)).toBeNull();
  });

  it('falls back to the cross-subdomain cookie when localStorage is empty', () => {
    // Simulates a sign-in performed on account.fluxline.pro: only the
    // .fluxline.pro cookie is visible on this origin.
    const payload: AuthStatusPayload = {
      loggedIn: true,
      userId: 'user-456',
      displayName: 'Cookie User',
      email: 'cookie@example.com',
      expiresAt: Date.now() + 3600_000,
    };
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(payload)
    )}; Path=/; Max-Age=3600; SameSite=Lax`;

    expect(localStorage.getItem(COOKIE_NAME)).toBeNull();
    expect(getAuthStatus()).toEqual(payload);
  });

  it('ignores an expired cookie hint', () => {
    const payload: AuthStatusPayload = {
      loggedIn: true,
      userId: 'user-456',
      expiresAt: Date.now() - 1000,
    };
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
      JSON.stringify(payload)
    )}; Path=/; Max-Age=3600; SameSite=Lax`;

    expect(getAuthStatus()).toBeNull();
  });

  it('ignores corrupt payloads', () => {
    localStorage.setItem(COOKIE_NAME, 'not-json');
    expect(getAuthStatus()).toBeNull();

    localStorage.clear();
    localStorage.setItem(COOKIE_NAME, JSON.stringify({ hello: 'world' }));
    expect(getAuthStatus()).toBeNull();

    localStorage.clear();
    document.cookie = `${COOKIE_NAME}=%7Bnope; Path=/; SameSite=Lax`;
    expect(getAuthStatus()).toBeNull();
  });

  it('clears auth status from both stores', () => {
    setAuthStatus({
      loggedIn: true,
      userId: 'user-123',
      displayName: 'Test',
      expiresAt: Date.now() + 3600_000,
    });
    clearAuthStatus();
    expect(getAuthStatus()).toBeNull();
    expect(localStorage.getItem(COOKIE_NAME)).toBeNull();
    expect(document.cookie).not.toContain(`${COOKIE_NAME}=`);
  });

  it('handles loggedIn false state', () => {
    const payload: AuthStatusPayload = {
      loggedIn: false,
      expiresAt: Date.now() + 3600_000,
    };
    setAuthStatus(payload);
    expect(getAuthStatus()?.loggedIn).toBe(false);
  });
});
