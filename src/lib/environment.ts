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
  // For static exports, API is relative to the deployed site
  return '/api';
}
