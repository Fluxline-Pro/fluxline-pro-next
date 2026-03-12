/**
 * Azure Function: Newsletter Unsubscribe API
 *
 * Removes an email address from the SharePoint Online Email Distribution List
 * via the Microsoft Graph API.
 *
 * Required Environment Variables:
 * - ENTRAID_SP_APP_REGISTRATION_CLIENT_ID  — Entra ID app registration client ID
 * - ENTRAID_SP_CLIENT_SECRET               — Entra ID app registration client secret
 * - ENTRAID_SP_TENANT_ID                   — Azure AD tenant ID
 * - SHAREPOINT_SITE_ID                     — SharePoint site ID
 * - SHAREPOINT_LIST_ID                     — SharePoint list ID for the Email Distribution List
 *
 * POST /api/newsletter-unsubscribe
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
  context.log('Newsletter unsubscribe request received');

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

    // Escape single quotes in email to prevent OData filter injection
    const safeEmail = email.replace(/'/g, "''");
    const encodedEmail = encodeURIComponent(`fields/Email eq '${safeEmail}'`);
    const searchResult = await graphRequest(
      'GET',
      `/v1.0/sites/${siteId}/lists/${listId}/items?$filter=${encodedEmail}&$select=id`,
      token
    );

    if (searchResult.status !== 200) {
      context.log.error('Graph API error searching for email:', searchResult);
      context.res = {
        status: 500,
        headers: CORS_HEADERS,
        body: { error: 'Failed to search for email. Please try again.' },
      };
      return;
    }

    const items = searchResult.body?.value || [];

    if (items.length === 0) {
      // Per AC 4d: no error shown to user, but log a warning
      context.log.warn(`No email found in distribution list for unsubscribe: ${email}`);
      // Still return 200 to the front-end — user sees the confirmation regardless
      context.res = {
        status: 200,
        headers: CORS_HEADERS,
        body: { success: true, message: 'Unsubscribed successfully.' },
      };
      return;
    }

    // Delete all matching items (in case of duplicates)
    for (const item of items) {
      const deleteResult = await graphRequest(
        'DELETE',
        `/v1.0/sites/${siteId}/lists/${listId}/items/${item.id}`,
        token
      );

      if (deleteResult.status !== 204) {
        context.log.error(`Failed to delete item ${item.id}:`, deleteResult);
        context.res = {
          status: 500,
          headers: CORS_HEADERS,
          body: { error: 'Failed to remove subscription. Please try again.' },
        };
        return;
      }
    }

    context.log(`Newsletter unsubscription completed for: ${email}`);
    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: { success: true, message: 'Unsubscribed successfully.' },
    };
  } catch (error) {
    context.log.error('Newsletter unsubscribe error:', error);
    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: { error: 'An unexpected error occurred. Please try again.' },
    };
  }
};
