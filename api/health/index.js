'use strict';

/**
 * Health / integration-readiness probe — Azure Function.
 *
 * GET /api/health  ->  200 when this app is wired into the ecosystem correctly,
 *                      503 when a misconfiguration would break cross-app reads.
 *
 * Exists because the failure this guards against is SILENT: if the shared
 * storage connection is missing or points at this app's own storage account,
 * the cross-app tables simply read back empty — gated content is denied and
 * subscriptions look absent, with no error anywhere. Hitting this endpoint
 * after a deploy turns that into a visible red/green signal.
 *
 * Reports only configuration SHAPE (which env var supplied the connection,
 * which table names are in effect) — never the connection string itself.
 */

const { getCorsHeaders, handleCors } = require('../lib/corsHeaders');
const { getSharedStorageHealth } = require('../lib/sharedStorage');

const CONTRACTS_VERSION = require('../lib/contracts').CONTRACTS_VERSION;

/** This app's identity in the ecosystem. */
const APP = 'www';

module.exports = async function (context, req) {
  const preflight = handleCors(req);
  if (preflight) {
    context.res = preflight;
    return;
  }

  const headers = {
    ...getCorsHeaders(req),
    'Content-Type': 'application/json',
    // Always reflect live configuration — a cached health check is a lie.
    'Cache-Control': 'no-store',
  };

  const storage = getSharedStorageHealth();

  // Degraded (not failed): the app runs, but cross-app data will not resolve
  // the way the ecosystem expects.
  const ok = storage.configured && storage.shared;

  if (!ok) {
    context.log.warn(
      `health: shared storage degraded — configured=${storage.configured} ` +
        `shared=${storage.shared} source=${storage.source}`
    );
  }

  context.res = {
    status: ok ? 200 : 503,
    headers,
    body: JSON.stringify({
      status: ok ? 'ok' : 'degraded',
      app: APP,
      contractsVersion: CONTRACTS_VERSION,
      storage,
    }),
  };
};
