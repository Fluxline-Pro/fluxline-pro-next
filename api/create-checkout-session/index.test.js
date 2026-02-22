'use strict';

/**
 * Unit tests for the create-checkout-session Azure Function
 * Tests validation logic and response structure without real Stripe calls
 */

const handler = require('./index');

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

describe('create-checkout-session', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('handles OPTIONS preflight request', async () => {
    const context = makeContext();
    await handler(context, { method: 'OPTIONS', body: null, headers: {} });
    expect(context.res.status).toBe(204);
  });

  it('returns 503 when STRIPE_SECRET_KEY is not set', async () => {
    delete process.env.STRIPE_SECRET_KEY;
    const context = makeContext();
    await handler(context, { method: 'POST', body: { productType: 'book', customerName: 'Jane Doe' }, headers: {} });
    expect(context.res.status).toBe(503);
    expect(JSON.parse(context.res.body)).toHaveProperty('error');
  });

  it('returns 400 when body is missing', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
    const context = makeContext();
    await handler(context, { method: 'POST', body: null, headers: {} });
    expect(context.res.status).toBe(400);
  });

  it('returns 400 for invalid productType', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
    const context = makeContext();
    await handler(context, {
      method: 'POST',
      body: { productType: 'invalid', customerName: 'Jane Doe' },
      headers: {},
    });
    expect(context.res.status).toBe(400);
    const body = JSON.parse(context.res.body);
    expect(body.error).toMatch(/productType/i);
  });

  it('returns 400 when customerName is missing', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
    const context = makeContext();
    await handler(context, {
      method: 'POST',
      body: { productType: 'book', customerName: '' },
      headers: {},
    });
    expect(context.res.status).toBe(400);
    const body = JSON.parse(context.res.body);
    expect(body.error).toMatch(/customerName/i);
  });

  it('returns 503 when price ID env var is not configured', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
    delete process.env.STRIPE_PRICE_ID_BOOK;
    const context = makeContext();
    await handler(context, {
      method: 'POST',
      body: { productType: 'book', customerName: 'Jane Doe' },
      headers: {},
    });
    expect(context.res.status).toBe(503);
    const body = JSON.parse(context.res.body);
    expect(body.error).toMatch(/pricing/i);
  });
});
