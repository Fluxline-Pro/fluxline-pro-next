'use strict';

/**
 * Create Stripe Checkout Session - Azure Function (DECOMMISSIONED)
 *
 * POST /api/create-checkout-session
 * Returns: 410 Gone
 *
 * Purchase moved to the storefront at store.fluxline.pro, which owns Stripe
 * checkout, print fulfillment, and entitlements. This endpoint used to create
 * sessions that redirected to /books/purchase-success on success; both that
 * route and the UI that called this endpoint have been removed, so a session
 * created here would land the customer on a 404 after paying.
 *
 * It answers 410 rather than being deleted outright so any stale client gets a
 * clear reason instead of a bare 404, and so the decommission is documented at
 * the path someone would look. Safe to delete once no traffic is observed.
 *
 * Note: checkout was already disabled in production before this change — the
 * calling UI gated on isProduction() — so this never served live payments.
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const STOREFRONT_URL = 'https://store.fluxline.pro';

module.exports = async function (context, req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: CORS_HEADERS, body: '' };
    return;
  }

  context.log.warn(
    'create-checkout-session: decommissioned endpoint was called; purchase now lives at ' +
      STOREFRONT_URL
  );

  context.res = {
    status: 410,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      error:
        'This checkout endpoint has been retired. Purchases are handled by the Fluxline store.',
      storefront: STOREFRONT_URL,
    }),
  };
};
