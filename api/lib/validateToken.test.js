'use strict';

/**
 * Unit tests for lib/validateToken
 * JWKS and JWT verification are mocked — no network calls.
 */

jest.mock('jsonwebtoken');
jest.mock('jwks-rsa');

const jwt = require('jsonwebtoken');
const { validateToken, AuthError, _resetJwksClient } = require('./validateToken');

describe('validateToken', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    _resetJwksClient();
    process.env = { ...originalEnv, ENTRA_TENANT_ID: 'test-tenant-id' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('throws when ENTRA_TENANT_ID is not configured', async () => {
    delete process.env.ENTRA_TENANT_ID;
    await expect(validateToken({ headers: {} })).rejects.toThrow(
      'ENTRA_TENANT_ID is not configured'
    );
  });

  it('throws AuthError when the Authorization header is missing', async () => {
    await expect(validateToken({ headers: {} })).rejects.toThrow(AuthError);
    await expect(validateToken({ headers: {} })).rejects.toThrow(
      /missing bearer token/i
    );
  });

  it('throws AuthError when the scheme is not Bearer', async () => {
    const req = { headers: { authorization: 'Basic abc123' } };
    await expect(validateToken(req)).rejects.toThrow(AuthError);
  });

  it('throws AuthError when signature verification fails', async () => {
    jwt.verify.mockImplementation((token, getKey, opts, cb) =>
      cb(new Error('invalid signature'))
    );
    const req = { headers: { authorization: 'Bearer bad-token' } };
    await expect(validateToken(req)).rejects.toThrow(AuthError);
    await expect(validateToken(req)).rejects.toThrow(/invalid signature/);
  });

  it('resolves userId from the oid claim for a valid token', async () => {
    jwt.verify.mockImplementation((token, getKey, opts, cb) =>
      cb(null, {
        oid: 'oid-abc-123',
        sub: 'pairwise-sub-should-not-win',
        name: 'Jane Doe',
        preferred_username: 'jane@example.com',
      })
    );
    const req = { headers: { authorization: 'Bearer good-token' } };
    const user = await validateToken(req);
    expect(user.userId).toBe('oid-abc-123');
    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('jane@example.com');
    expect(user.claims.oid).toBe('oid-abc-123');
  });

  it('throws AuthError when the token has neither oid nor sub', async () => {
    jwt.verify.mockImplementation((token, getKey, opts, cb) => cb(null, {}));
    const req = { headers: { authorization: 'Bearer good-token' } };
    await expect(validateToken(req)).rejects.toThrow(/oid\/sub/);
  });

  it('expects the api://fluxline-account audience when ENTRA_API_AUDIENCE is unset', async () => {
    delete process.env.ENTRA_API_AUDIENCE;
    jwt.verify.mockImplementation((token, getKey, opts, cb) => cb(null, { oid: 'oid-1' }));
    await validateToken({ headers: { authorization: 'Bearer good-token' } });
    expect(jwt.verify.mock.calls[0][2].audience).toEqual(['api://fluxline-account']);
  });

  it('uses ENTRA_API_AUDIENCE when set, split on commas and trimmed', async () => {
    process.env.ENTRA_API_AUDIENCE = ' api://fluxline-account , 0000-client-id ,';
    jwt.verify.mockImplementation((token, getKey, opts, cb) => cb(null, { oid: 'oid-1' }));
    await validateToken({ headers: { authorization: 'Bearer good-token' } });
    expect(jwt.verify.mock.calls[0][2].audience).toEqual(['api://fluxline-account', '0000-client-id']);
  });
});

describe('X-Fluxline-Authorization (#405)', () => {
  // Static Web Apps replaces Authorization with a token of its own; the
  // user's token arrives in X-Fluxline-Authorization instead.
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    _resetJwksClient();
    process.env = { ...originalEnv, ENTRA_TENANT_ID: 'test-tenant-id', ENTRA_API_AUDIENCE: 'api://fluxline-account' };
    jwt.verify.mockImplementation((token, getKey, opts, cb) => cb(null, { oid: 'oid-1' }));
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('verifies the custom header, not the SWA-injected Authorization', async () => {
    await validateToken({ headers: { authorization: 'Bearer swa-token', 'x-fluxline-authorization': 'Bearer user-token' } });
    expect(jwt.verify.mock.calls[0][0]).toBe('user-token');
  });

  it('does not fall back to Authorization when the custom header is not Bearer', async () => {
    const req = { headers: { authorization: 'Bearer user-token', 'x-fluxline-authorization': 'Basic abc' } };
    await expect(validateToken(req)).rejects.toThrow(AuthError);
    expect(jwt.verify).not.toHaveBeenCalled();
  });

  it('still reads Authorization alone (local func start)', async () => {
    await validateToken({ headers: { authorization: 'Bearer user-token' } });
    expect(jwt.verify.mock.calls[0][0]).toBe('user-token');
  });
});
