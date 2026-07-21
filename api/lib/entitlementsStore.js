const { getSharedTable } = require('./tableClient');

/**
 * Read-side access to the shared Entitlements table.
 *
 * The table is OWNED and written by the storefront (Stripe fulfillment):
 *   partitionKey = userId (Entra oid), rowKey = itemId.
 * Every other app reads it through this module. The connection string MUST
 * point at the same storage account the storefront writes to. Table name is
 * overridable via ENTITLEMENTS_TABLE for local/test isolation.
 */

function getEntitlementsTable(context) {
  return getSharedTable('entitlements', context);
}

function toContract(entity) {
  let contentRef = null;
  if (entity.ContentRef) {
    try {
      contentRef = JSON.parse(entity.ContentRef);
    } catch {
      contentRef = null;
    }
  }
  return {
    itemId: entity.rowKey,
    status: entity.Status === 'active' ? 'active' : 'cancelled',
    productName: entity.ProductName || '',
    productType: entity.ProductType || '',
    category: entity.Category || '',
    fulfillment: entity.Fulfillment || '',
    sourceItemId: entity.SourceItemId || null,
    purchasedAt: entity.PurchasedAt || null,
    expiresAt: entity.ExpiresAt || null,
    contentRef,
  };
}

function isExpired(entitlement, now = new Date()) {
  if (!entitlement.expiresAt) return false;
  const expiresAt = new Date(entitlement.expiresAt);
  // Fail CLOSED: a malformed expiry must read as expired, never grant access.
  // `new Date('garbage') < now` is false, so without this a corrupt ExpiresAt
  // would silently keep an entitlement live.
  if (Number.isNaN(expiresAt.getTime())) return true;
  return expiresAt < now;
}

/**
 * Lists a user's entitlements in contract shape (see lib/contracts.js).
 *
 * @param {string} userId Entra oid
 * @returns {Promise<Array<object>>} Entitlement[] — empty array when the user
 *   has no rows (a 404 from a missing table is surfaced as an error).
 */
async function listEntitlements(userId, context) {
  const table = getEntitlementsTable(context);
  const escaped = userId.replace(/'/g, "''");
  const iterator = table.listEntities({
    queryOptions: { filter: `PartitionKey eq '${escaped}'` },
  });
  const entitlements = [];
  for await (const entity of iterator) {
    entitlements.push(toContract(entity));
  }
  return entitlements;
}

/**
 * Access rule for gated content (v1):
 *   1. Any ACTIVE, unexpired subscription (`productType === 'plan'`) grants
 *      access to ALL gated content.
 *   2. Otherwise an ACTIVE, unexpired entitlement matches when its itemId
 *      equals the requested ref, or its contentRef matches the requested
 *      kind+slug (or sanityDocumentId).
 *
 * @param {string} userId Entra oid
 * @param {{kind?: string, slug?: string, sanityDocumentId?: string, itemId?: string}} ref
 * @returns {Promise<{allowed: boolean, reason: 'subscription'|'entitlement'|'none', entitlement: object|null}>}
 */
async function checkContentAccess(userId, ref, context) {
  const entitlements = await listEntitlements(userId, context);
  const active = entitlements.filter((e) => e.status === 'active' && !isExpired(e));

  const plan = active.find((e) => e.productType === 'plan');
  if (plan) {
    return { allowed: true, reason: 'subscription', entitlement: plan };
  }

  const match = active.find((e) => {
    if (ref.itemId && e.itemId === ref.itemId) return true;
    if (!e.contentRef) return false;
    if (ref.sanityDocumentId && e.contentRef.sanityDocumentId === ref.sanityDocumentId) {
      return true;
    }
    return Boolean(
      ref.kind &&
        ref.slug &&
        e.contentRef.kind === ref.kind &&
        e.contentRef.slug === ref.slug
    );
  });

  if (match) {
    return { allowed: true, reason: 'entitlement', entitlement: match };
  }
  return { allowed: false, reason: 'none', entitlement: null };
}

module.exports = { listEntitlements, checkContentAccess, isExpired };
