import { createServiceClient, type TokenProvider } from './client';
import * as accountApi from './account';
import * as cmsApi from './cms';
import * as entitlementsApi from './entitlements';
import * as storefrontApi from './storefront';
import type { ContentSelector, Entitlement, Subscription } from './types';

export * from './types';
export {
  IntegrationError,
  type AuthMode,
  type IntegrationErrorCode,
  type ServiceClient,
  type TokenProvider,
} from './client';
export { getServiceApiBase, getServiceEndpoint, type ServiceName } from './config';

/**
 * The Fluxline orchestrator.
 *
 * One object from which fluxline.pro can reach every part of the ecosystem:
 *
 *   entitlements  what the user owns          (this site's own API)
 *   cms           the authoritative gate      (cms.fluxline.pro)
 *   storefront    catalog + Stripe checkout   (store.fluxline.pro)
 *   account       profile, progress, plan     (account.fluxline.pro)
 *
 * Each namespace is bound to its own service client, so a call cannot
 * accidentally be sent to the wrong app, and all four share one token source.
 *
 * In React, prefer the `useFluxline()` hook — it wires the token provider to
 * the signed-in session and memoises this object for you.
 */
export function createFluxlineClient(getAccessToken: TokenProvider) {
  const www = createServiceClient('www', getAccessToken);
  const cms = createServiceClient('cms', getAccessToken);
  const storefront = createServiceClient('storefront', getAccessToken);
  const account = createServiceClient('account', getAccessToken);

  return {
    /** Raw clients, for endpoints not yet wrapped below. */
    clients: { www, cms, storefront, account },

    entitlements: {
      list: (signal?: AbortSignal) =>
        entitlementsApi.listEntitlements(www, signal),
      active: entitlementsApi.activeEntitlements,
      hasActiveSubscription: entitlementsApi.hasActiveSubscription,
      /** UI hint only — see `cms.canAccess` for the decision that counts. */
      hasLocalAccess: entitlementsApi.hasLocalAccess,
    },

    cms: {
      checkContentAccess: (selector: ContentSelector, signal?: AbortSignal) =>
        cmsApi.checkContentAccess(cms, selector, signal),
      canAccess: (selector: ContentSelector, signal?: AbortSignal) =>
        cmsApi.canAccess(cms, selector, signal),
    },

    storefront: {
      getCatalog: (signal?: AbortSignal) =>
        storefrontApi.getCatalog(storefront, signal),
      listOrders: (signal?: AbortSignal) =>
        storefrontApi.listOrders(storefront, signal),
      createCheckoutSession: (
        itemId: string,
        amount?: number,
        signal?: AbortSignal
      ) =>
        storefrontApi.createCheckoutSession(storefront, itemId, amount, signal),
      startCheckout: (itemId: string, amount?: number) =>
        storefrontApi.startCheckout(storefront, itemId, amount),
      createPortalSession: (signal?: AbortSignal) =>
        storefrontApi.createPortalSession(storefront, signal),
      openBillingPortal: () => storefrontApi.openBillingPortal(storefront),
    },

    account: {
      getSubscription: (signal?: AbortSignal) =>
        accountApi.getSubscription(account, signal),
      listPurchases: (signal?: AbortSignal) =>
        accountApi.listPurchases(account, signal),
      getProgress: (signal?: AbortSignal) =>
        accountApi.getProgress(account, signal),
      getAchievements: (signal?: AbortSignal) =>
        accountApi.getAchievements(account, signal),
      getProfile: (signal?: AbortSignal) =>
        accountApi.getProfile(account, signal),
      getSettings: (signal?: AbortSignal) =>
        accountApi.getSettings(account, signal),
    },
  };
}

export type FluxlineClient = ReturnType<typeof createFluxlineClient>;

/**
 * Everything the "what does this user have?" views need, in one round trip
 * across three apps.
 *
 * Each part settles independently: the account portal being down must not blank
 * the entitlements the user genuinely owns. Failed parts come back null/empty
 * with the reasons collected in `errors`, so a caller can render what it has
 * and still report what it could not load.
 */
export interface EcosystemSnapshot {
  entitlements: Entitlement[];
  subscription: Subscription | null;
  hasActiveSubscription: boolean;
  errors: Array<{ service: string; error: unknown }>;
}

export async function getEcosystemSnapshot(
  client: FluxlineClient,
  signal?: AbortSignal
): Promise<EcosystemSnapshot> {
  const [entitlementsResult, subscriptionResult] = await Promise.allSettled([
    client.entitlements.list(signal),
    client.account.getSubscription(signal),
  ]);

  const errors: EcosystemSnapshot['errors'] = [];

  const entitlements =
    entitlementsResult.status === 'fulfilled' ? entitlementsResult.value : [];
  if (entitlementsResult.status === 'rejected') {
    errors.push({ service: 'www', error: entitlementsResult.reason });
  }

  const subscription =
    subscriptionResult.status === 'fulfilled' ? subscriptionResult.value : null;
  if (subscriptionResult.status === 'rejected') {
    errors.push({ service: 'account', error: subscriptionResult.reason });
  }

  return {
    entitlements,
    subscription,
    // Derived from entitlements, not from the portal: the entitlement rows are
    // the system of record, and this stays correct when the portal is the part
    // that failed.
    hasActiveSubscription:
      entitlementsApi.hasActiveSubscription(entitlements),
    errors,
  };
}
