/**
 * Azure Function: Newsletter Subscribe API
 *
 * Adds an email address to the SharePoint Online Email Distribution List
 * via the Microsoft Graph API.
 *
 * Required Environment Variables:
 * - ENTRAID_SP_APP_REGISTRATION_CLIENT_ID  — Entra ID app registration client ID
 * - ENTRAID_SP_CLIENT_SECRET               — Entra ID app registration client secret
 * - ENTRAID_SP_TENANT_ID                   — Azure AD tenant ID
 * - SHAREPOINT_SITE_ID                     — SharePoint site ID (or use SHAREPOINT_SITE_URL)
 * - SHAREPOINT_LIST_ID                     — SharePoint list ID for the Email Distribution List
 *
 * POST /api/newsletter-subscribe
 * Body: { email: string }
 */

'use strict';

const https = require('https');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Obtains a Graph API access token using client credentials flow.
 */
async function getGraphToken(tenantId, clientId, clientSecret) {
  return new Promise((resolve, reject) => {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
    }).toString();

    const options = {
      hostname: 'login.microsoftonline.com',
      path: `/${tenantId}/oauth2/v2.0/token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.access_token) {
            resolve(parsed.access_token);
          } else {
            reject(new Error(parsed.error_description || 'Failed to obtain token'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/**
 * Makes a JSON request to the Microsoft Graph API.
 */
async function graphRequest(method, path, token, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : null;

    const options = {
      hostname: 'graph.microsoft.com',
      path,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(bodyStr && { 'Content-Length': Buffer.byteLength(bodyStr) }),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            body: data ? JSON.parse(data) : {},
          });
        } catch {
          resolve({ status: res.statusCode, body: {} });
        }
      });
    });

    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

module.exports = async function (context, req) {
  context.log('Newsletter subscribe request received');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: CORS_HEADERS, body: '' };
    return;
  }

  if (req.method !== 'POST') {
    context.res = {
      status: 405,
      headers: CORS_HEADERS,
      body: { error: 'Method not allowed' },
    };
    return;
  }

  const { email } = req.body || {};

  if (!email || !validateEmail(email)) {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: { error: 'A valid email address is required.' },
    };
    return;
  }

  // Required environment variables
  const tenantId = process.env.ENTRAID_SP_TENANT_ID;
  const clientId = process.env.ENTRAID_SP_APP_REGISTRATION_CLIENT_ID;
  const clientSecret = process.env.ENTRAID_SP_CLIENT_SECRET;
  const siteId = process.env.SHAREPOINT_SITE_ID;
  const listId = process.env.SHAREPOINT_LIST_ID;

  if (!tenantId || !clientId || !clientSecret || !siteId || !listId) {
    context.log.error('Missing required environment variables for SharePoint integration.');
    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: { error: 'Server configuration error.' },
    };
    return;
  }

  try {
    const token = await getGraphToken(tenantId, clientId, clientSecret);

    // Check for duplicate subscription before adding
    const safeEmail = email.replace(/'/g, "''");
    const encodedFilter = encodeURIComponent(`fields/Email eq '${safeEmail}'`);
    const existing = await graphRequest(
      'GET',
      `/v1.0/sites/${siteId}/lists/${listId}/items?$filter=${encodedFilter}&$select=id`,
      token
    );

    if (existing.status === 200 && existing.body?.value?.length > 0) {
      context.log(`Newsletter subscription already exists for: ${email}`);
      context.res = {
        status: 200,
        headers: CORS_HEADERS,
        body: { success: true, message: 'You are already subscribed.' },
      };
      return;
    }

    const result = await graphRequest(
      'POST',
      `/v1.0/sites/${siteId}/lists/${listId}/items`,
      token,
      {
        fields: {
          Email: email,
          LeadPlatform: 'Fluxline.pro',
          Timestamp: new Date().toISOString(),
        },
      }
    );

    if (result.status === 201) {
      context.log(`Newsletter subscription added for: ${email}`);
      context.res = {
        status: 200,
        headers: CORS_HEADERS,
        body: { success: true, message: 'Successfully subscribed.' },
      };
    } else {
      context.log.error('Graph API error adding list item:', result);
      context.res = {
        status: 500,
        headers: CORS_HEADERS,
        body: { error: 'Failed to add subscription. Please try again.' },
      };
    }
  } catch (error) {
    context.log.error('Newsletter subscribe error:', error);
    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: { error: 'An unexpected error occurred. Please try again.' },
    };
  }
};
