const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

/**
 * Validates an Entra ID access token (Bearer) on incoming requests.
 *
 * Defaults to WORKFORCE Entra ID (login.microsoftonline.com). The Fluxline
 * ecosystem runs on Entra External ID (CIAM), so a real deployment MUST set
 * ENTRA_ISSUER and ENTRA_JWKS_URI to the tenant's ciamlogin.com endpoints —
 * without them, CIAM tokens fail validation against the workforce defaults:
 *   ENTRA_ISSUER    = https://<tenant>.ciamlogin.com/<tenantId>/v2.0
 *   ENTRA_JWKS_URI  = https://<tenant>.ciamlogin.com/<tenantId>/discovery/v2.0/keys
 *
 * Configuration (api local.settings.json / SWA App Settings):
 *   ENTRA_TENANT_ID     required — tenant GUID (used to build the workforce
 *                       default URLs; for CIAM set ENTRA_ISSUER/ENTRA_JWKS_URI)
 *   ENTRA_ISSUER        optional — overrides the expected `iss` (required for CIAM)
 *   ENTRA_JWKS_URI      optional — overrides the signing-key endpoint (required for CIAM)
 *   ENTRA_API_AUDIENCE  optional — expected `aud`; accepts a comma-separated
 *                       list (App ID URI and/or client id). Defaults to
 *                       `api://fluxline-identity`.
 *
 * The returned `userId` is the token's `oid` (the Entra object id). `oid` is
 * STABLE for the same user across every app registration in the tenant, so it
 * is the correct shared key for cross-app data (entitlements, progress,
 * achievements, orders). `sub` is intentionally NOT used as the primary key —
 * it is pairwise per audience and differs between apps for the same person.
 */

/** Thrown for any request that must be answered with a 401. */
class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = 401;
  }
}

let jwksClient = null;

function getJwksClient() {
  if (!jwksClient) {
    const tenantId = process.env.ENTRA_TENANT_ID;
    const jwksUri =
      process.env.ENTRA_JWKS_URI ||
      `https://login.microsoftonline.com/${tenantId}/discovery/v2.0/keys`;
    jwksClient = jwksRsa({
      jwksUri,
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 600000,
      rateLimit: true,
      jwksRequestsPerMinute: 10,
    });
  }
  return jwksClient;
}

function getSigningKey(header, callback) {
  getJwksClient().getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

function verifyJwt(token, { audience, issuer }) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getSigningKey,
      { audience, issuer, algorithms: ['RS256'] },
      (err, decoded) => (err ? reject(err) : resolve(decoded))
    );
  });
}

/**
 * Validates the request's Bearer token.
 *
 * @param {object} req Azure Functions classic-model request
 * @returns {Promise<{userId: string, name: string, email: string, claims: object}>}
 * @throws {AuthError} when the token is missing, malformed, expired, or fails
 *   signature/issuer/audience checks — callers respond 401.
 * @throws {Error} when the function app is misconfigured — callers respond 500
 *   (or 401 via their generic catch; either way the request is rejected).
 */
async function validateToken(req) {
  const tenantId = process.env.ENTRA_TENANT_ID;
  if (!tenantId) {
    throw new Error('ENTRA_TENANT_ID is not configured');
  }

  const authHeader =
    (req.headers && (req.headers.authorization || req.headers.Authorization)) || '';
  const [scheme, token] = authHeader.split(' ');
  if (!token || !/^Bearer$/i.test(scheme)) {
    throw new AuthError('Missing bearer token');
  }

  const issuer =
    process.env.ENTRA_ISSUER || `https://login.microsoftonline.com/${tenantId}/v2.0`;
  const audience = (process.env.ENTRA_API_AUDIENCE || 'api://fluxline-identity')
    .split(',')
    .map((a) => a.trim())
    .filter(Boolean);

  let claims;
  try {
    claims = await verifyJwt(token, { audience, issuer });
  } catch (err) {
    throw new AuthError(`Token validation failed: ${err.message}`);
  }

  const userId = claims.oid || claims.sub;
  if (!userId) {
    throw new AuthError('Token missing oid/sub claim');
  }

  return {
    userId,
    name: claims.name || '',
    email: claims.email || claims.preferred_username || '',
    claims,
  };
}

/** Test seam: reset the cached JWKS client (env vars are re-read on next call). */
function _resetJwksClient() {
  jwksClient = null;
}

module.exports = { validateToken, AuthError, _resetJwksClient };
