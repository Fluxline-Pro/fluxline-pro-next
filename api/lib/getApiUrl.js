/**
 * Backend utility to get the base URL for API calls.
 *
 * Uses API_BASE_URL environment variable (set in local.settings.json for local dev,
 * and in Azure Application Settings for deployed).
 *
 * This is useful if Azure Functions need to make internal calls to themselves
 * or other backend services.
 *
 * @returns The base URL for API calls
 *
 * @example
 * // Local: http://localhost:7071
 * const baseUrl = getApiBaseUrl();
 * const url = `${baseUrl}/api/contact`;
 */
function getApiBaseUrl() {
  // Local development: localhost:7071 (Azure Functions Core Tools port)
  // Deployed: https://{staticwebappname}.azurestaticapps.net (or custom domain)
  return process.env.API_BASE_URL || 'http://localhost:7071';
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
 */
function getApiEndpoint(endpoint) {
  const baseUrl = getApiBaseUrl();
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${path}`;
}

module.exports = {
  getApiBaseUrl,
  getApiEndpoint,
};
