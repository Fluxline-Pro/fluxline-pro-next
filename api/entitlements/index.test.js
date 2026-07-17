'use strict';

/**
 * Unit tests for the entitlements Azure Function
 * Tests auth handling and response structure with mocked token validation
 * and a mocked entitlements store (no real JWKS or Table Storage calls).
 */

jest.mock('../lib/validateToken');
jest.mock('../lib/entitlementsStore');

const { validateToken, AuthError } = require('../lib/validateToken');
const { listEntitlements } = require('../lib/entitlementsStore');
const handler = require('./index');

// jest.mock replaces AuthError with a mock constructor; the handler only
// relies on the error's `name`, so build equivalent errors by hand.
function makeAuthError(message) {
  const err = new Error(message);
  err.name = 'AuthError';
  err.statusCode = 401;
  return err;
}

/** Minimal mock for Azure Functions context */
function makeContext() {
  const logs = [];
  return {
    log: Object.assign((...args) => logs.push(['info', ...args]), {
      error: (...args) => logs.push(['error', ...args]),
      warn: (...args) => logs.push(['warn', ...args]),
    }),
    res: null,
    _logs: logs,
  };
}

describe('entitlements', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles OPTIONS preflight request', async () => {
    const context = makeContext();
    await handler(context, { method: 'OPTIONS', headers: {} });
    expect(context.res.status).toBe(204);
    expect(validateToken).not.toHaveBeenCalled();
  });

  it('returns 401 when the bearer token is missing', async () => {
    validateToken.mockRejectedValue(makeAuthError('Missing bearer token'));
    const context = makeContext();
    await handler(context, { method: 'GET', headers: {} });
    expect(context.res.status).toBe(401);
    expect(JSON.parse(context.res.body)).toEqual({ error: 'Unauthorized' });
    expect(listEntitlements).not.toHaveBeenCalled();
  });

  it('returns 200 with the entitlement list for a valid token', async () => {
    const entitlements = [
      {
        itemId: 'course-foundations',
        status: 'active',
        productName: 'Foundations Course',
        productType: 'course',
        category: 'lesson',
        fulfillment: 'digital',
        sourceItemId: null,
        purchasedAt: '2026-01-15T12:00:00.000Z',
        expiresAt: null,
        contentRef: { kind: 'course', slug: 'foundations' },
      },
    ];
    validateToken.mockResolvedValue({
      userId: 'oid-123',
      name: 'Jane Doe',
      email: 'jane@example.com',
      claims: {},
    });
    listEntitlements.mockResolvedValue(entitlements);

    const context = makeContext();
    await handler(context, {
      method: 'GET',
      headers: { authorization: 'Bearer valid-token' },
    });

    expect(context.res.status).toBe(200);
    expect(context.res.headers['Content-Type']).toBe('application/json');
    expect(listEntitlements).toHaveBeenCalledWith('oid-123');
    expect(JSON.parse(context.res.body)).toEqual({ entitlements });
  });

  it('returns 500 when the entitlements store fails', async () => {
    validateToken.mockResolvedValue({ userId: 'oid-123' });
    listEntitlements.mockRejectedValue(new Error('table unavailable'));
    const context = makeContext();
    await handler(context, {
      method: 'GET',
      headers: { authorization: 'Bearer valid-token' },
    });
    expect(context.res.status).toBe(500);
    expect(JSON.parse(context.res.body)).toHaveProperty('error');
  });
});
