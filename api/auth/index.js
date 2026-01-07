/**
 * Azure Function: Token Validation API
 * 
 * Validates access tokens for DEV and TEST environments.
 * This function compares the provided token against environment-specific
 * access tokens stored in Azure Static Web Apps configuration.
 * 
 * Environment Variables Required:
 * - ACCESS_TOKEN: The valid access token for the current environment
 * - ENVIRONMENT: The current environment (dev, test, prod)
 */

module.exports = async function (context, req) {
  context.log('Token validation request received');

  // Set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204,
      headers,
      body: null,
    };
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    context.res = {
      status: 405,
      headers,
      body: { error: 'Method not allowed' },
    };
    return;
  }

  try {
    const { token } = req.body;

    // Get environment configuration
    const environment = process.env.ENVIRONMENT || 'prod';
    const validToken = process.env.ACCESS_TOKEN;

    context.log('Environment:', environment);

    // Production environment doesn't require tokens
    if (environment === 'prod') {
      context.res = {
        status: 200,
        headers,
        body: { 
          valid: true, 
          environment,
          message: 'Production environment - no token required'
        },
      };
      return;
    }

    // Validate token presence
    if (!token) {
      context.res = {
        status: 400,
        headers,
        body: { 
          valid: false, 
          error: 'Token is required',
          environment
        },
      };
      return;
    }

    // Check if valid token is configured
    if (!validToken) {
      context.log.error('ACCESS_TOKEN environment variable not configured');
      context.res = {
        status: 500,
        headers,
        body: { 
          valid: false, 
          error: 'Server configuration error',
          environment
        },
      };
      return;
    }

    // Validate token
    const isValid = token === validToken;

    if (isValid) {
      context.res = {
        status: 200,
        headers,
        body: { 
          valid: true, 
          environment,
          message: 'Token validated successfully'
        },
      };
    } else {
      context.res = {
        status: 401,
        headers,
        body: { 
          valid: false, 
          error: 'Invalid token',
          environment
        },
      };
    }

  } catch (error) {
    context.log.error('Error validating token:', error);
    context.res = {
      status: 500,
      headers,
      body: { 
        valid: false, 
        error: 'Internal server error' 
      },
    };
  }
};
