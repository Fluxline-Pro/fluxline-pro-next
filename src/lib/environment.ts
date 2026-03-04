/**
 * Environment detection utility
 *
 * Determines the current environment based on configuration.
 * For static exports, we detect environment at build time through environment variables.
 */

export type Environment = 'dev' | 'test' | 'prod';

/**
 * Gets the current environment
 * In production build, this is determined by NEXT_PUBLIC_ENVIRONMENT at build time
 */
export function getEnvironment(): Environment {
  // Check build-time environment variable
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT?.toLowerCase();

  if (env === 'dev' || env === 'development') {
    return 'dev';
  }

  if (env === 'test') {
    return 'test';
  }

  return 'prod';
}

/**
 * Checks if the current environment requires token authentication
 */
export function requiresAuthentication(): boolean {
  const env = getEnvironment();
  return env === 'dev' || env === 'test';
}

/**
 * Gets the API base URL based on environment
 */
export function getApiBaseUrl(): string {
  // Local development: route directly to Azure Functions host (e.g., http://localhost:7071)
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  // Deployed (Azure SWA): keep relative /api path so SWA proxy can route to Functions.
  if (!configuredBaseUrl) {
    return '/api';
  }

  // Safety guard: ignore localhost API host if app is running on a non-localhost domain.
  if (typeof window !== 'undefined') {
    const configuredIsLocalhost =
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(
        configuredBaseUrl
      );
    const runningOnLocalhost = /^(localhost|127\.0\.0\.1)$/i.test(
      window.location.hostname
    );

    if (configuredIsLocalhost && !runningOnLocalhost) {
      return '/api';
    }
  }

  // Normalize to avoid accidental trailing slashes.
  const normalizedBaseUrl = configuredBaseUrl.replace(/\/$/, '');
  return normalizedBaseUrl.endsWith('/api')
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`;
}
