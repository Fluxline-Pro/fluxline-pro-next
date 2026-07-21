'use strict';

/**
 * Fluxline ecosystem — shared storage binding (v1).
 *
 * BYTE-IDENTICAL across fluxline-pro-next, fluxline-pro-cms and
 * fluxline-pro-user-account. The storefront keeps a TypeScript mirror at
 * `src/lib/storage/shared-storage.ts`. Change it in one repo, copy to all.
 *
 * WHY THIS EXISTS
 * ---------------
 * The cross-app tables (Entitlements, Orders, Events, Progress, Achievements)
 * live in ONE ecosystem-shared storage account — the same account the
 * storefront writes to on Stripe fulfillment. Each app ALSO has its own
 * storage account for app-local data (lead queue, PDF orders, ...), reached
 * via `AZURE_STORAGE_CONNECTION_STRING`.
 *
 * Before this module the four apps each bound to storage differently, so the
 * CMS and account portal read `Entitlements` out of their OWN accounts. That
 * fails silently: no error, just an empty table — every gated lesson denied
 * and no subscription state, as though the user owned nothing.
 *
 * RESOLUTION ORDER (first match wins)
 * -----------------------------------
 *   1. SHARED_STORAGE_CONNECTION_STRING             <- the ecosystem account
 *   2. AZURE_STORAGE_CONNECTION_STRING              <- per-app fallback
 *   3. STORAGE_ACCOUNT_NAME + STORAGE_ACCOUNT_KEY   <- storefront's legacy pair
 *
 * Only (1) is correct in a deployed multi-app environment. (2) and (3) exist
 * so that setting nothing changes no behaviour — they keep single-account and
 * local-dev setups working, and each emits a debug log naming the fallback so
 * a misconfigured environment is visible in App Insights rather than silent.
 *
 * Resolution happens per CALL, never at module load: Azure Functions and SWA
 * managed functions can populate app settings after the module graph is
 * required, and module-load capture also makes the env impossible to stub in
 * tests.
 *
 * NOTE: Cosmos DB (the phase-2 relationship store) is deliberately NOT handled
 * here — it has its own optional, best-effort configuration and no fallback
 * chain.
 */

/**
 * Logical table key -> { default name, env override }.
 *
 * Every app MUST resolve these names through `getSharedTableName` so a table
 * cannot drift to a different name in one repo. Overrides exist for local and
 * test isolation (e.g. pointing at `EntitlementsTest`).
 */
const SHARED_TABLES = Object.freeze({
  entitlements: { name: 'Entitlements', env: 'ENTITLEMENTS_TABLE' },
  orders: { name: 'Orders', env: 'ORDERS_TABLE' },
  events: { name: 'Events', env: 'EVENTS_TABLE' },
  progress: { name: 'Progress', env: 'PROGRESS_TABLE' },
  achievements: { name: 'Achievements', env: 'ACHIEVEMENTS_TABLE' },
});

/**
 * Resolves a shared table's name.
 *
 * @param {keyof SHARED_TABLES} key Logical table key.
 * @returns {string} The configured table name.
 * @throws {Error} When `key` is not a known shared table — a typo would
 *   otherwise silently create/read an empty table.
 */
function getSharedTableName(key) {
  const entry = SHARED_TABLES[key];
  if (!entry) {
    throw new Error(
      `Unknown shared table '${key}'. Known: ${Object.keys(SHARED_TABLES).join(', ')}`
    );
  }
  return process.env[entry.env] || entry.name;
}

/** Sources, most- to least-preferred. `build` returns null when unconfigured. */
const CONNECTION_SOURCES = [
  {
    source: 'SHARED_STORAGE_CONNECTION_STRING',
    shared: true,
    build: () => process.env.SHARED_STORAGE_CONNECTION_STRING || null,
  },
  {
    source: 'AZURE_STORAGE_CONNECTION_STRING',
    shared: false,
    build: () => process.env.AZURE_STORAGE_CONNECTION_STRING || null,
  },
  {
    source: 'STORAGE_ACCOUNT_NAME+STORAGE_ACCOUNT_KEY',
    shared: false,
    build: () => {
      const name = process.env.STORAGE_ACCOUNT_NAME;
      const key = process.env.STORAGE_ACCOUNT_KEY;
      if (!name || !key) return null;
      return (
        'DefaultEndpointsProtocol=https;' +
        `AccountName=${name};AccountKey=${key};` +
        'EndpointSuffix=core.windows.net'
      );
    },
  },
];

/** Sources already logged, so a hot function logs the warning once, not per call. */
const loggedFallbacks = new Set();

/** Test seam — lets a suite assert the log fires more than once. */
function resetSharedStorageLogState() {
  loggedFallbacks.clear();
}

/**
 * Resolves the connection string for the SHARED ecosystem storage account.
 *
 * Never logs the connection string itself (it carries an account key) — only
 * the name of the env var it came from.
 *
 * @param {{log?: Function|object}} [logger] Azure Functions `context`, or any
 *   object with a `log` method. Defaults to `console`.
 * @returns {{connectionString: string|null, source: string|null, shared: boolean}}
 *   `connectionString` is null when nothing is configured; callers decide
 *   whether that is fatal (see `getTableClient`) or merely degraded (see
 *   `getSharedStorageHealth`).
 */
function resolveSharedStorageConnString(logger) {
  const resolved = CONNECTION_SOURCES.map((candidate) => ({
    candidate,
    value: candidate.build(),
  })).find((entry) => entry.value);

  if (!resolved) {
    return { connectionString: null, source: null, shared: false };
  }

  const { candidate, value } = resolved;

  if (!candidate.shared && !loggedFallbacks.has(candidate.source)) {
    loggedFallbacks.add(candidate.source);
    emitDebug(
      logger,
      `[sharedStorage] SHARED_STORAGE_CONNECTION_STRING is not set; falling ` +
        `back to ${candidate.source}. Cross-app tables ` +
        `(${Object.keys(SHARED_TABLES).join(', ')}) will resolve against this ` +
        `app's own storage account, which is correct ONLY if every Fluxline ` +
        `app points at the same account.`
    );
  }

  return {
    connectionString: value,
    source: candidate.source,
    shared: candidate.shared,
  };
}

/**
 * Writes a debug/verbose line through whichever logger shape we were handed.
 *
 * Azure Functions v3 exposes `context.log` as a callable with `.verbose`;
 * plain `console` has `.debug`. Logging must never throw.
 */
function emitDebug(logger, message) {
  const target = logger || console;
  try {
    const log = target.log;
    if (log && typeof log.verbose === 'function') {
      log.verbose(message);
      return;
    }
    if (typeof target.debug === 'function') {
      target.debug(message);
      return;
    }
    if (typeof log === 'function') {
      log.call(target, message);
      return;
    }
    if (typeof target.log === 'function') {
      target.log(message);
    }
  } catch {
    // A logging failure must never break a storage call.
  }
}

/**
 * Configuration snapshot for `/api/health`.
 *
 * Safe to serialise into an HTTP response: reports only which env var supplied
 * the connection and which table names are in effect, never the secret. A
 * `shared: false` result is the signal that this app is reading cross-app data
 * out of the wrong storage account.
 *
 * @returns {{configured: boolean, shared: boolean, source: string|null,
 *   tables: Record<string, string>, warning?: string}}
 */
function getSharedStorageHealth() {
  const { connectionString, source, shared } = resolveSharedStorageConnString();

  const tables = Object.fromEntries(
    Object.keys(SHARED_TABLES).map((key) => [key, getSharedTableName(key)])
  );

  const health = {
    configured: Boolean(connectionString),
    shared,
    source,
    tables,
  };

  if (!connectionString) {
    health.warning =
      'No storage connection configured. Set SHARED_STORAGE_CONNECTION_STRING ' +
      'to the ecosystem storage account.';
  } else if (!shared) {
    health.warning =
      `Using ${source} rather than SHARED_STORAGE_CONNECTION_STRING. Cross-app ` +
      'tables resolve against this app\'s own storage account; entitlements ' +
      'written by the storefront will not be visible unless both apps share ' +
      'one account.';
  }

  return health;
}

module.exports = {
  SHARED_TABLES,
  getSharedTableName,
  resolveSharedStorageConnString,
  getSharedStorageHealth,
  resetSharedStorageLogState,
};
