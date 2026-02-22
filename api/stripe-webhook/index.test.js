'use strict';

/**
 * Unit tests for the stripe-webhook Azure Function
 * Tests validation logic and response structure without real Stripe/Azure calls
 */

const handler = require('./index');

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

describe('stripe-webhook', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('returns 503 when Stripe credentials are not configured', async () => {
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const context = makeContext();
    await handler(context, { method: 'POST', body: {}, headers: {}, rawBody: '' });
    expect(context.res.status).toBe(503);
    expect(JSON.parse(context.res.body)).toHaveProperty('error');
  });

  it('returns 400 when stripe-signature header is missing', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_fake';
    const context = makeContext();
    await handler(context, { method: 'POST', body: {}, headers: {}, rawBody: '{}' });
    expect(context.res.status).toBe(400);
    const body = JSON.parse(context.res.body);
    expect(body.error).toMatch(/signature/i);
  });

  it('returns 400 when signature verification fails', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_fake';
    const context = makeContext();
    await handler(context, {
      method: 'POST',
      body: {},
      headers: { 'stripe-signature': 'invalid_sig' },
      rawBody: '{"type":"checkout.session.completed"}',
    });
    expect(context.res.status).toBe(400);
    const body = JSON.parse(context.res.body);
    expect(body.error).toMatch(/signature/i);
  });
});
