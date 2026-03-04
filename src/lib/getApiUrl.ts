/**
 * Frontend utility to get the base URL for API calls to Azure Functions backend.
 *
 * Uses NEXT_PUBLIC_API_BASE_URL environment variable:
 * - Local development: http://localhost:7071 (Azure Functions local port)
 * - Deployed (Azure SWA): Empty string (uses relative /api/* paths, auto-proxied)
 *
 * @returns The base URL for API calls, or empty string for relative paths
 *
 * @example
 * // Local: http://localhost:7071/api/contact
 * const url = `${getApiUrl()}/api/contact`;
 *
 * // Deployed: /api/contact (relative path)
 * const url = `${getApiUrl()}/api/contact`;
 */
export function getApiUrl(): string {
  // In Next.js, build-time variables with NEXT_PUBLIC_ prefix are available
  // at runtime as process.env.NEXT_PUBLIC_*
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || '';

  // Safety guard: if a localhost API URL is accidentally baked into a deployed build,
  // fall back to relative /api routing so Azure Static Web Apps proxy still works.
  if (configuredBaseUrl && typeof window !== 'undefined') {
    const configuredIsLocalhost =
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(
        configuredBaseUrl
      );
    const runningOnLocalhost = /^(localhost|127\.0\.0\.1)$/i.test(
      window.location.hostname
    );

    if (configuredIsLocalhost && !runningOnLocalhost) {
      return '';
    }
  }

  return configuredBaseUrl;
}

/**
 * Constructs a full API endpoint URL
 *
 * @param endpoint - The API endpoint (e.g., '/api/contact', 'api/auth')
 * @returns The full URL to the API endpoint
 *
 * @example
 * const contactUrl = getApiEndpoint('/api/contact');
 * // Local: http://localhost:7071/api/contact
 * // Deployed: /api/contact
 */
export function getApiEndpoint(endpoint: string): string {
  const baseUrl = getApiUrl();
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return baseUrl ? `${baseUrl}${path}` : path;
}
