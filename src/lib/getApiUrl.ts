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
  return process.env.NEXT_PUBLIC_API_BASE_URL || '';
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
