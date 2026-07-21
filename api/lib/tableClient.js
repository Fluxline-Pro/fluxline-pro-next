const { TableClient } = require('@azure/data-tables');
const {
  getSharedTableName,
  resolveSharedStorageConnString,
} = require('./sharedStorage');

/**
 * Table client factory for the SHARED Fluxline user-data storage account.
 *
 * IMPORTANT: this repo's AZURE_STORAGE_CONNECTION_STRING points at the site's
 * OWN storage account (lead queue, PDF orders); podcasts use
 * AZURE_TABLE_STORAGE_URL + SAS. The cross-app tables (Entitlements, Events,
 * ...) live in a DIFFERENT, ecosystem-shared storage account — the same one
 * the storefront writes to on Stripe fulfillment. Set
 * SHARED_STORAGE_CONNECTION_STRING to that account; lib/sharedStorage.js owns
 * the fallback chain and logs when it has to use one.
 */
function getTableClient(tableName, logger) {
  const { connectionString } = resolveSharedStorageConnString(logger);
  if (!connectionString) {
    throw new Error(
      'No storage connection configured. Set SHARED_STORAGE_CONNECTION_STRING ' +
        'to the shared Fluxline storage account (see lib/sharedStorage.js).'
    );
  }
  return TableClient.fromConnectionString(connectionString, tableName);
}

/**
 * Table client for a logical shared table, so the name is resolved through the
 * one map every app agrees on rather than a per-repo string literal.
 *
 * @param {'entitlements'|'orders'|'events'|'progress'|'achievements'} key
 */
function getSharedTable(key, logger) {
  return getTableClient(getSharedTableName(key), logger);
}

module.exports = { getTableClient, getSharedTable };
