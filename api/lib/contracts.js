const { z } = require('zod');

/**
 * Fluxline ecosystem — shared data contracts (v1).
 *
 * These zod schemas are the typed, stable contracts every Fluxline backend
 * (fluxline.pro, cms.fluxline.pro, store.fluxline.pro, account.fluxline.pro)
 * validates against. The same shapes exist in TypeScript form in the
 * storefront (`src/lib/contracts/index.ts`). Expand only via versioned,
 * additive extensions — never breaking changes.
 *
 * Identity key: every per-user record is partitioned by the Entra `oid`
 * (see lib/validateToken.js). Content references point at Sanity documents
 * by slug/id — content itself lives in Sanity, relationships live here.
 */

const CONTRACTS_VERSION = 1;

/** ISO-8601 timestamp string. */
const isoDateTime = z.string().datetime({ offset: true }).or(z.string().datetime());

/** Reference from a purchasable/ownable thing to Sanity content. */
const ContentRef = z.object({
  kind: z.enum(['course', 'lesson', 'collection', 'document', 'download', 'presentation']),
  slug: z.string().min(1).optional(),
  sanityDocumentId: z.string().min(1).optional(),
});

/** Identity as derived from a validated Entra token. */
const User = z.object({
  userId: z.string().min(1), // Entra oid
  name: z.string().default(''),
  email: z.string().default(''),
});

/** Account profile document (Table: Users, RK 'profile'). */
const AccountProfile = z.object({
  displayName: z.string().max(200).default(''),
  email: z.string().max(320).default(''),
  phone: z.string().max(50).default(''),
  bio: z.string().max(2000).default(''),
  avatarUrl: z.string().nullable().default(null),
  socialProvider: z.string().nullable().default(null),
});

/** PUT /api/profile body — only these fields are writable. */
const AccountProfileUpdate = z
  .object({
    displayName: z.string().max(200),
    email: z.string().max(320),
    phone: z.string().max(50),
    bio: z.string().max(2000),
    avatarUrl: z.string().max(950000).nullable(),
  })
  .partial()
  .strict();

/** User settings (Table: UserSettings, RK 'settings'). */
const UserSettings = z.object({
  theme: z.string().max(50).default('dark'),
  fontScale: z.number().min(0.5).max(3).default(1),
  notifications: z.boolean().default(true),
  reduceMotion: z.boolean().default(false),
  highContrast: z.boolean().default(false),
});

/** PUT /api/settings body — strict: unknown keys are rejected (no mass assignment). */
const UserSettingsUpdate = UserSettings.partial().strict();

/**
 * Entitlement (Table: Entitlements, PK oid, RK itemId).
 * OWNED and written by the storefront on Stripe fulfillment; read-only
 * everywhere else. `contentRef` links the entitlement to Sanity content so
 * the CMS can gate lessons/courses without a catalog copy.
 */
const Entitlement = z.object({
  itemId: z.string().min(1),
  status: z.enum(['active', 'cancelled']),
  productName: z.string().default(''),
  productType: z.string().default(''), // 'plan' = subscription; others = one-time
  category: z.string().default(''),
  fulfillment: z.string().default(''),
  sourceItemId: z.string().nullable().default(null), // bundle parent, if any
  purchasedAt: isoDateTime.nullable().default(null),
  expiresAt: isoDateTime.nullable().default(null),
  contentRef: ContentRef.nullable().default(null),
});

const EntitlementList = z.object({ entitlements: z.array(Entitlement) });

/** Storefront catalog item (source of truth: storefront catalog module). */
const CatalogItem = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['book', 'bundle', 'lesson', 'subscription']),
  fulfillment: z.enum(['digital', 'physical', 'subscription', 'external']),
  priceEnvVar: z.string().optional(),
  productEnvVar: z.string().optional(),
  bundleOf: z.array(z.string()).optional(),
  contentRef: ContentRef.optional(),
});

/** Order (Table: Orders, PK oid, RK Stripe checkout-session id). */
const Order = z.object({
  orderId: z.string().min(1), // Stripe session id
  itemId: z.string().default(''),
  productName: z.string().default(''),
  items: z.array(z.object({ itemId: z.string(), name: z.string().default('') })).default([]),
  status: z.string().default(''),
  fulfillmentStatus: z
    .enum(['pending', 'submitted', 'shipped', 'failed', 'cancelled'])
    .or(z.string())
    .default('pending'),
  amountTotal: z.number().nullable().default(null), // minor units
  currency: z.string().default('usd'),
  createdAt: isoDateTime.nullable().default(null),
  updatedAt: isoDateTime.nullable().default(null),
});

const OrderList = z.object({ orders: z.array(Order) });

/** Checkout session request (POST /api/stripe/create-checkout-session). */
const CheckoutSessionRequest = z
  .object({
    itemId: z.string().min(1),
    amount: z.number().positive().optional(), // PWYC only
  })
  .strict();

/** Course/Lesson references — content lives in Sanity; these are the
 *  relationship-side shapes (what a user can access / has progressed on). */
const Course = z.object({
  courseSlug: z.string().min(1),
  sanityDocumentId: z.string().optional(),
  title: z.string().default(''),
});

const Lesson = z.object({
  lessonSlug: z.string().min(1),
  courseSlug: z.string().min(1),
  sanityDocumentId: z.string().optional(),
  order: z.number().int().optional(),
});

/** Progress (Table: Progress, PK oid, RK 'progress').
 *  `modules` maps a module/course key to its per-user progress. */
const ModuleProgress = z.object({
  percent: z.number().min(0).max(100).default(0),
  completedLessons: z.array(z.string()).default([]),
  lastLessonSlug: z.string().nullable().default(null),
  updatedAt: isoDateTime.nullable().default(null),
});

const ProgressRecord = z.object({
  modules: z.record(z.string(), ModuleProgress).default({}),
  overallPercent: z.number().min(0).max(100).default(0),
});

const ProgressUpdate = ProgressRecord.partial().strict();

/** Achievements (Table: Achievements, PK oid, RK 'achievements'). */
const Achievement = z.object({
  id: z.string().min(1),
  earnedAt: isoDateTime.nullable().default(null),
  source: z.string().default(''), // e.g. 'cms', 'account'
});

const AchievementsRecord = z.object({
  earned: z.array(Achievement).default([]),
  progress: z.record(z.string(), z.number().min(0).max(100)).default({}),
});

/** POST/PUT /api/achievements body — unlock one achievement. */
const AchievementUnlock = z
  .object({
    id: z.string().min(1).max(100),
    source: z.enum(['cms', 'account', 'storefront', 'www']).default('cms'),
  })
  .strict();

/** Operational event (Table: Events, PK oid, RK reverse-ticks + uuid). */
const IntegrationEvent = z.object({
  type: z.enum([
    'entitlement.granted',
    'entitlement.revoked',
    'order.recorded',
    'order.fulfillment_updated',
    'checkout.session_created',
    'progress.updated',
    'achievement.unlocked',
    'profile.created',
    'account.deleted',
  ]),
  source: z.enum(['storefront', 'account', 'cms', 'www']),
  userId: z.string().min(1),
  data: z.record(z.string(), z.unknown()).default({}),
  createdAt: isoDateTime,
});

module.exports = {
  CONTRACTS_VERSION,
  ContentRef,
  User,
  AccountProfile,
  AccountProfileUpdate,
  UserSettings,
  UserSettingsUpdate,
  Entitlement,
  EntitlementList,
  CatalogItem,
  Order,
  OrderList,
  CheckoutSessionRequest,
  Course,
  Lesson,
  ModuleProgress,
  ProgressRecord,
  ProgressUpdate,
  Achievement,
  AchievementsRecord,
  AchievementUnlock,
  IntegrationEvent,
};
