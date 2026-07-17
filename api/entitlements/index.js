'use strict';

/**
 * Get Entitlements - Azure Function
 * Lists the signed-in user's entitlements from the shared Entitlements table
 * (written by the storefront on Stripe fulfillment; read-only here).
 *
 * GET /api/entitlements   (Authorization: Bearer <Entra access token>)
 * Returns: { entitlements: Entitlement[] }  (see lib/contracts.js)
 */

const { getCorsHeaders, handleCors } = require('../lib/corsHeaders');
const { validateToken } = require('../lib/validateToken');
const { listEntitlements } = require('../lib/entitlementsStore');

module.exports = async function (context, req) {
  context.log('entitlements: request received');

  // Handle CORS preflight
  const preflight = handleCors(req);
  if (preflight) {
    context.res = preflight;
    return;
  }

  const headers = {
    ...getCorsHeaders(req),
    'Content-Type': 'application/json',
  };

  let user;
  try {
    user = await validateToken(req);
  } catch (error) {
    if (error.name === 'AuthError') {
      context.res = {
        status: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
      return;
    }
    context.log.error('entitlements: token validation error:', error.message);
    context.res = {
      status: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
    return;
  }

  try {
    const entitlements = await listEntitlements(user.userId);

    context.log(`entitlements: returning ${entitlements.length} entitlement(s)`);

    context.res = {
      status: 200,
      headers,
      body: JSON.stringify({ entitlements }),
    };
  } catch (error) {
    context.log.error('entitlements: error:', error.message);
    context.res = {
      status: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to retrieve entitlements.' }),
    };
  }
};
