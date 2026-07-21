import type { ServiceClient } from './client';
import {
  isEntitlementArray,
  type ContentSelector,
  type Entitlement,
} from './types';

/**
 * Entitlements — what the signed-in user owns.
 *
 * Read from THIS site's own Functions app (`/api/entitlements`), which reads
 * the shared Entitlements table the storefront writes on Stripe fulfillment.
 * Same origin, so no CORS and no extra hop.
 */

/**
 * Lists the signed-in user's entitlements.
 *
 * Returns `[]` rather than throwing when the response is malformed: this drives
 * what a user is shown, and an unreadable payload must mean "nothing" rather
 * than a crash.
 */
export async function listEntitlements(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<Entitlement[]> {
  const body = await client.request<{ entitlements?: unknown }>(
    '/entitlements',
    { signal }
  );
  const entitlements = body?.entitlements;
  return isEntitlementArray(entitlements) ? entitlements : [];
}

function isExpired(entitlement: Entitlement, now: Date): boolean {
  return (
    Boolean(entitlement.expiresAt) && new Date(entitlement.expiresAt!) < now
  );
}

/** Active, unexpired entitlements. */
export function activeEntitlements(
  entitlements: Entitlement[],
  now: Date = new Date()
): Entitlement[] {
  return entitlements.filter(
    (e) => e.status === 'active' && !isExpired(e, now)
  );
}

/** True when the user holds an active subscription (`productType === 'plan'`). */
export function hasActiveSubscription(
  entitlements: Entitlement[],
  now: Date = new Date()
): boolean {
  return activeEntitlements(entitlements, now).some(
    (e) => e.productType === 'plan'
  );
}

/**
 * Mirrors the server access rule (`api/lib/entitlementsStore.js`) in the
 * browser:
 *   1. any active, unexpired subscription grants access to all gated content;
 *   2. otherwise an active, unexpired entitlement must match by itemId, by
 *      contentRef.sanityDocumentId, or by contentRef kind+slug.
 *
 * FOR UI ONLY — deciding what to render, not what to serve. Anything a user
 * must not read has to be gated server-side (`cms.checkContentAccess`, which
 * asks the CMS and cannot be edited from a console). Treat a `true` here as a
 * hint, never as authorisation.
 */
export function hasLocalAccess(
  entitlements: Entitlement[],
  selector: ContentSelector,
  now: Date = new Date()
): boolean {
  const active = activeEntitlements(entitlements, now);
  if (active.some((e) => e.productType === 'plan')) return true;

  return active.some((e) => {
    if ('itemId' in selector) return e.itemId === selector.itemId;
    if (!e.contentRef) return false;
    if ('sanityDocumentId' in selector) {
      return e.contentRef.sanityDocumentId === selector.sanityDocumentId;
    }
    return (
      e.contentRef.kind === selector.kind && e.contentRef.slug === selector.slug
    );
  });
}
