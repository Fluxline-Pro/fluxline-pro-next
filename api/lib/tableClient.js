const { TableClient } = require('@azure/data-tables');

/**
 * Table client factory for the SHARED Fluxline user-data storage account.
 *
 * IMPORTANT: this repo's AZURE_STORAGE_CONNECTION_STRING points at the site's
 * OWN storage account (lead queue, PDF orders); podcasts use
 * AZURE_TABLE_STORAGE_URL + SAS. The cross-app tables (Entitlements, Events,
 * ...) live in a DIFFERENT, ecosystem-shared storage account — the same one
 * the storefront writes to on Stripe fulfillment. Set
 * SHARED_STORAGE_CONNECTION_STRING to that account; we only fall back to
 * AZURE_STORAGE_CONNECTION_STRING for environments where the two are the same.
 */
function getTableClient(tableName) {
  return TableClient.fromConnectionString(
    process.env.SHARED_STORAGE_CONNECTION_STRING ||
      process.env.AZURE_STORAGE_CONNECTION_STRING,
    tableName
  );
}

module.exports = { getTableClient };
