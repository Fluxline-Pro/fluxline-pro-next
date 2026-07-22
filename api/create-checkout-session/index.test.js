'use strict';

/**
 * Unit tests for the decommissioned create-checkout-session Azure Function.
 *
 * Purchase moved to store.fluxline.pro; this endpoint now answers 410 Gone for
 * every request except the CORS preflight. See index.js for the rationale.
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

describe('create-checkout-session (decommissioned)', () => {
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

  it('returns 410 Gone for a POST, pointing at the storefront', async () => {
    const context = makeContext();
    await handler(context, {
      method: 'POST',
      body: { productType: 'book', customerName: 'Jane Doe' },
      headers: {},
    });

    expect(context.res.status).toBe(410);
    const body = JSON.parse(context.res.body);
    expect(body.error).toMatch(/retired/i);
    expect(body.storefront).toBe('https://store.fluxline.pro');
  });

  it('returns 410 even when Stripe is fully configured, so no session is created', async () => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
    process.env.STRIPE_PRICE_ID_BOOK = 'price_fake';

    const context = makeContext();
    await handler(context, {
      method: 'POST',
      body: { productType: 'book', customerName: 'Jane Doe' },
      headers: {},
    });

    expect(context.res.status).toBe(410);
  });

  it('logs a warning naming the storefront when called', async () => {
    const context = makeContext();
    await handler(context, { method: 'POST', body: null, headers: {} });

    const warned = context._logs.filter((entry) => entry[0] === 'warn');
    expect(warned).toHaveLength(1);
    expect(warned[0].join(' ')).toContain('store.fluxline.pro');
  });
});
