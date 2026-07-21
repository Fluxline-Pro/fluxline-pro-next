import type { ServiceClient } from './client';
import { IntegrationError } from './client';
import type { CatalogItem } from './types';

/**
 * Storefront (store.fluxline.pro) — catalog, orders, and Stripe checkout.
 *
 * The storefront OWNS purchase: it creates Stripe sessions and, on fulfillment,
 * writes the Entitlements and Orders rows every other app reads. This site
 * never talks to Stripe directly; it hands off.
 */

/** The public catalog. No sign-in required. */
export async function getCatalog(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<CatalogItem[]> {
  const body = await client.request<{ items?: CatalogItem[] }>('/catalog', {
    auth: 'none',
    signal,
  });
  return body?.items ?? [];
}

/**
 * The signed-in user's orders (physical/print fulfillment records).
 *
 * NOTE: this endpoint returns raw Azure Table entities in PascalCase, not the
 * camelCase `Order` contract shape the other apps return. Prefer
 * `account.listPurchases()`, which returns the contract shape. Kept here for
 * parity with the storefront's own surface.
 */
export async function listOrders(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<unknown[]> {
  const body = await client.request<unknown[]>('/orders', { signal });
  return Array.isArray(body) ? body : [];
}

export interface CheckoutSession {
  url: string;
  id: string;
}

/**
 * Creates a Stripe checkout session for a catalog item.
 *
 * @param amount Minor units, for pay-what-you-choose items only.
 * @returns The hosted Stripe URL to send the browser to.
 */
export async function createCheckoutSession(
  client: ServiceClient,
  itemId: string,
  amount?: number,
  signal?: AbortSignal
): Promise<CheckoutSession> {
  const session = await client.request<CheckoutSession>(
    '/stripe/create-checkout-session',
    {
      method: 'POST',
      body: amount === undefined ? { itemId } : { itemId, amount },
      signal,
    }
  );

  if (!session?.url) {
    throw new IntegrationError(
      'storefront',
      'bad_response',
      'Checkout session was created without a redirect URL.'
    );
  }
  return session;
}

/**
 * Starts checkout and navigates to Stripe.
 *
 * Separate from `createCheckoutSession` so the network call stays testable and
 * callers that want to render their own confirmation step can opt out of the
 * redirect.
 */
export async function startCheckout(
  client: ServiceClient,
  itemId: string,
  amount?: number
): Promise<void> {
  const { url } = await createCheckoutSession(client, itemId, amount);
  if (typeof window !== 'undefined') window.location.assign(url);
}

/** Opens the Stripe billing portal for managing an existing subscription. */
export async function createPortalSession(
  client: ServiceClient,
  signal?: AbortSignal
): Promise<string> {
  const body = await client.request<{ url?: string }>(
    '/stripe/create-portal-session',
    { method: 'POST', signal }
  );

  if (!body?.url) {
    throw new IntegrationError(
      'storefront',
      'bad_response',
      'Billing portal session was created without a URL.'
    );
  }
  return body.url;
}

/** Opens the billing portal and navigates to it. */
export async function openBillingPortal(client: ServiceClient): Promise<void> {
  const url = await createPortalSession(client);
  if (typeof window !== 'undefined') window.location.assign(url);
}
