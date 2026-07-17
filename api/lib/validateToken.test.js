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
});
