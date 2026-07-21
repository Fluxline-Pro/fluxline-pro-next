import type { ServiceClient } from './client';
import type {
  AccountProfile,
  AchievementsRecord,
  Order,
  ProgressRecord,
  Subscription,
  UserSettings,
} from './types';

/**
 * Account portal (account.fluxline.pro) — profile, settings, and the
 * relationship data (progress, achievements, subscription state).
 *
 * The portal backs these with Cosmos DB for the user↔content relationships and
 * with the shared tables for entitlements and orders. This site only reads
 * them; the portal remains the place a user edits their account.
 *
 * EMPTY STATE: the portal answers 404 for "this user has no record yet", which
 * is normal for anyone who has not progressed or earned anything. Those calls
 * pass `nullOn: [404]` and return an empty record rather than throwing, so
 * callers never have to tell "new user" apart from "failure".
 */

/** The user's plan. The portal synthesises a free plan when nothing is owned. */
export async function getSubscription(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<Subscription | null> {
  return client.request<Subscription | null>('/subscription', {
    signal,
    nullOn: [404],
  });
}

/** Purchase history in the `Order` contract shape. */
export async function listPurchases(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<Order[]> {
  const body = await client.request<{ orders?: Order[] }>('/purchases', {
    signal,
  });
  return body?.orders ?? [];
}

const EMPTY_PROGRESS: ProgressRecord = { modules: {}, overallPercent: 0 };

/** Course/lesson progress. A user with no record yet reads as empty. */
export async function getProgress(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<ProgressRecord> {
  const body = await client.request<ProgressRecord | null>('/progress', {
    signal,
    nullOn: [404],
  });
  return body ?? EMPTY_PROGRESS;
}

const EMPTY_ACHIEVEMENTS: AchievementsRecord = { earned: [], progress: {} };

/** Earned achievements. A user with no record yet reads as empty. */
export async function getAchievements(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<AchievementsRecord> {
  const body = await client.request<AchievementsRecord | null>(
    '/achievements',
    { signal, nullOn: [404] }
  );
  return body ?? EMPTY_ACHIEVEMENTS;
}

/** The user's profile. Null when the portal has not created one yet. */
export async function getProfile(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<AccountProfile | null> {
  return client.request<AccountProfile | null>('/profile', {
    signal,
    nullOn: [404],
  });
}

/** The user's settings (theme, motion, contrast). */
export async function getSettings(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<UserSettings | null> {
  return client.request<UserSettings | null>('/settings', {
    signal,
    nullOn: [404],
  });
}
