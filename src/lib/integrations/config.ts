import { getApiUrl } from '@/lib/getApiUrl';

/**
 * Service registry for the Fluxline ecosystem.
 *
 * fluxline.pro is a STATIC EXPORT (next.config.ts `output: 'export'`) — there
 * is no server to proxy through, so the orchestrator calls each sibling app's
 * API directly from the browser and every call is cross-origin. Those origins
 * allow-list fluxline.pro in their CORS config (`api/lib/corsHeaders.js`, and
 * `src/lib/http/cors.ts` in the storefront).
 *
 * `www` is this site's OWN Azure Functions app, reached through the existing
 * relative `/api` path (or NEXT_PUBLIC_API_BASE_URL locally), so it is not
 * cross-origin and needs no absolute URL.
 */

export type ServiceName = 'www' | 'cms' | 'storefront' | 'account';

/** Production origins, used when the matching env var is unset. */
const DEFAULT_ORIGINS: Record<Exclude<ServiceName, 'www'>, string> = {
  cms: 'https://cms.fluxline.pro',
  storefront: 'https://store.fluxline.pro',
  account: 'https://account.fluxline.pro',
};

/**
 * Next.js inlines `process.env.NEXT_PUBLIC_*` at BUILD time, and only for
 * literal member access — a computed lookup like `process.env[key]` is not
 * substituted and resolves to undefined in the browser. Each variable must
 * therefore be spelled out.
 */
function configuredOrigin(service: Exclude<ServiceName, 'www'>): string {
  switch (service) {
    case 'cms':
      return process.env.NEXT_PUBLIC_CMS_URL?.trim() || DEFAULT_ORIGINS.cms;
    case 'storefront':
      return (
        process.env.NEXT_PUBLIC_STORE_URL?.trim() || DEFAULT_ORIGINS.storefront
      );
    case 'account':
      return (
        process.env.NEXT_PUBLIC_ACCOUNT_URL?.trim() || DEFAULT_ORIGINS.account
      );
  }
}

/**
 * Base URL for a service's API, with no trailing slash.
 *
 * @example
 * getServiceApiBase('cms')       // 'https://cms.fluxline.pro/api'
 * getServiceApiBase('www')       // '/api'  (or 'http://localhost:7071/api')
 */
export function getServiceApiBase(service: ServiceName): string {
  if (service === 'www') {
    // Reuses the existing helper so local Functions-host routing and the
    // deployed relative-path behaviour stay in one place.
    const base = getApiUrl().replace(/\/$/, '');
    return base ? `${base}/api` : '/api';
  }

  const origin = configuredOrigin(service).replace(/\/$/, '');
  return origin.endsWith('/api') ? origin : `${origin}/api`;
}

/** Account Portal origin, no trailing slash. */
export function getAccountPortalUrl(): string {
  return configuredOrigin('account').replace(/\/$/, '');
}

/** Full URL for a path within a service's API. */
export function getServiceEndpoint(service: ServiceName, path: string): string {
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${getServiceApiBase(service)}${suffix}`;
}
