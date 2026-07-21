import { IntegrationError, type ServiceClient } from './client';
import type { ContentAccess, ContentSelector } from './types';

/**
 * CMS (cms.fluxline.pro) — the AUTHORITATIVE content gate.
 *
 * `entitlements.hasLocalAccess` is a browser-side hint for what to render;
 * this is the decision that counts. The CMS re-validates the caller's token
 * and re-reads the shared Entitlements table server-side, so a user cannot
 * grant themselves access by editing anything they control.
 */

/** Turns a selector into the query the CMS gate expects. */
function selectorToQuery(selector: ContentSelector): string {
  const params = new URLSearchParams();
  if ('itemId' in selector) {
    params.set('itemId', selector.itemId);
  } else if ('sanityDocumentId' in selector) {
    params.set('sanityDocumentId', selector.sanityDocumentId);
  } else {
    params.set('kind', selector.kind);
    params.set('slug', selector.slug);
  }
  return params.toString();
}

/**
 * Asks the CMS whether the signed-in user may access a piece of gated content.
 *
 * A signed-out user is not an error here — it is simply "no access" — so the
 * caller can use one code path for both. Every other failure still throws,
 * because "the gate is broken" must never be silently rendered as "denied" in
 * a way that hides an outage.
 */
export async function checkContentAccess(
  client: ServiceClient,
  selector: ContentSelector,
  signal?: AbortSignal
): Promise<ContentAccess> {
  try {
    const result = await client.request<ContentAccess>(
      `/content-access?${selectorToQuery(selector)}`,
      { signal }
    );
    return result ?? { allowed: false, reason: 'none' };
  } catch (err) {
    if (err instanceof IntegrationError && err.code === 'unauthenticated') {
      return { allowed: false, reason: 'none' };
    }
    throw err;
  }
}

/**
 * Convenience wrapper for the common "should I render this?" question.
 *
 * Fails CLOSED: any error — CMS down, network gone, timeout — resolves to
 * `false`. Only use where hiding content on failure is the safe outcome; when
 * you need to tell "denied" apart from "broken", call `checkContentAccess`.
 */
export async function canAccess(
  client: ServiceClient,
  selector: ContentSelector,
  signal?: AbortSignal
): Promise<boolean> {
  try {
    return (await checkContentAccess(client, selector, signal)).allowed;
  } catch {
    return false;
  }
}
