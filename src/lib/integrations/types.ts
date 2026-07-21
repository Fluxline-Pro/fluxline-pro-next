/**
 * Fluxline ecosystem — shared data contracts, browser-side view (v1).
 *
 * TypeScript mirror of the zod schemas in `api/lib/contracts.js` (and the
 * storefront's `src/lib/contracts/index.ts`). Types only: the backends already
 * validate with zod, and this is a static marketing bundle where a runtime
 * schema library would be dead weight for callers who never see a malformed
 * response.
 *
 * Where a response drives a SECURITY-relevant decision it is narrowed at the
 * point of use instead (see `isEntitlementArray` below) — a wrong shape must
 * degrade to "no access", never to a crash or an accidental grant.
 *
 * Identity key: every per-user record is partitioned by the Entra `oid`.
 */

export const CONTRACTS_VERSION = 1;

export type ContentKind =
  | 'course'
  | 'lesson'
  | 'collection'
  | 'document'
  | 'download'
  | 'presentation';

/** Reference from a purchasable/ownable thing to Sanity content. */
export interface ContentRef {
  kind: ContentKind;
  slug?: string;
  sanityDocumentId?: string;
}

/** Selector accepted by the CMS content gate — at least one form is required. */
export type ContentSelector =
  | { kind: ContentKind; slug: string }
  | { sanityDocumentId: string }
  | { itemId: string };

export interface Entitlement {
  itemId: string;
  status: 'active' | 'cancelled';
  productName: string;
  /** 'plan' means a subscription, which grants access to all gated content. */
  productType: string;
  category: string;
  fulfillment: string;
  sourceItemId: string | null;
  purchasedAt: string | null;
  expiresAt: string | null;
  contentRef: ContentRef | null;
}

export type FulfillmentStatus =
  | 'pending'
  | 'submitted'
  | 'shipped'
  | 'failed'
  | 'cancelled';

export interface Order {
  orderId: string;
  itemId: string;
  productName: string;
  items: Array<{ itemId: string; name: string }>;
  status: string;
  fulfillmentStatus: FulfillmentStatus | string;
  /** Minor units (cents). */
  amountTotal: number | null;
  currency: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: 'book' | 'bundle' | 'lesson' | 'subscription';
  fulfillment: 'digital' | 'physical' | 'subscription' | 'external';
  bundleOf?: string[];
  contentRef?: ContentRef;
}

/** Result of the authoritative server-side content gate. */
export interface ContentAccess {
  allowed: boolean;
  reason: 'subscription' | 'entitlement' | 'none';
  itemId?: string;
}

/** Account portal's subscription view. Falls back to a synthetic free plan. */
export interface Subscription {
  planId: string;
  planName: string;
  status: string;
  interval: string | null;
  since: string | null;
  renewalDate: string | null;
  /** True when the plan can be managed in the Stripe billing portal. */
  manageable: boolean;
}

export interface ModuleProgress {
  percent: number;
  completedLessons: string[];
  lastLessonSlug: string | null;
  updatedAt: string | null;
}

export interface ProgressRecord {
  modules: Record<string, ModuleProgress>;
  overallPercent: number;
}

export interface Achievement {
  id: string;
  earnedAt: string | null;
  source: string;
}

export interface AchievementsRecord {
  earned: Achievement[];
  progress: Record<string, number>;
}

export interface AccountProfile {
  displayName: string;
  email: string;
  phone: string;
  bio: string;
  avatarUrl: string | null;
  socialProvider: string | null;
}

export interface UserSettings {
  theme: string;
  fontScale: number;
  notifications: boolean;
  reduceMotion: boolean;
  highContrast: boolean;
}

/**
 * Narrows an unknown response to Entitlement[].
 *
 * Entitlements decide what a user can see, so a malformed payload must read as
 * "nothing", never throw and never be trusted. Only the fields the access rule
 * actually reads are checked.
 */
export function isEntitlementArray(value: unknown): value is Entitlement[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        typeof (item as Entitlement).itemId === 'string' &&
        typeof (item as Entitlement).status === 'string'
    )
  );
}
