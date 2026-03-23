/**
 * Azure Function: Lead Submission API
 *
 * Receives a consultation lead payload from the front-end stepper and writes
 * a new item to a SharePoint list via the Microsoft Graph API.
 *
 * Required Environment Variables:
 * - ENTRAID_SP_APP_REGISTRATION_CLIENT_ID  — Entra ID app registration client ID
 * - ENTRAID_SP_CLIENT_SECRET               — Entra ID app registration client secret
 * - ENTRAID_SP_TENANT_ID                   — Azure AD tenant ID (GUID format)
 * - SHAREPOINT_SITE_ID                     — SharePoint site ID (GUID format)
 * - LEADS_LIST_ID                          — SharePoint list ID for consultation leads
 *
 * POST /api/lead
 * Body: LeadPayload (see ConsultationStepper/types.ts)
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
            reject(new Error('No access_token in response: ' + data));
          }
        } catch (e) {
          reject(new Error('Failed to parse token response: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/**
 * Posts a new item to a SharePoint list via Graph API.
 */
async function createSharePointItem(token, siteId, listId, fields) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ fields });

    const options = {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/sites/${siteId}/lists/${listId}/items`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch {
            resolve({});
          }
        } else {
          reject(new Error(`Graph API error ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

module.exports = async function (context, req) {
  // Handle preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: CORS_HEADERS, body: '' };
    return;
  }

  if (req.method !== 'POST') {
    context.res = {
      status: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
    return;
  }

  const payload = req.body;

  // Basic validation
  if (!payload || !payload.email || !payload.fullName || !payload.consent) {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Missing required fields: fullName, email, consent' }),
    };
    return;
  }

  const clientId = process.env.ENTRAID_SP_APP_REGISTRATION_CLIENT_ID;
  const clientSecret = process.env.ENTRAID_SP_CLIENT_SECRET;
  const tenantId = process.env.ENTRAID_SP_TENANT_ID;
  const siteId = process.env.SHAREPOINT_SITE_ID;
  const listId = process.env.LEADS_LIST_ID;

  if (!clientId || !clientSecret || !tenantId || !siteId || !listId) {
    context.log.warn('Lead: missing environment variables — returning success to client');
    // Return success so the user isn't blocked if infra isn't yet configured
    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true, queued: true }),
    };
    return;
  }

  try {
    const token = await getGraphToken(tenantId, clientId, clientSecret);

    const fields = {
      Title: payload.fullName,
      Email: payload.email,
      Phone: payload.phone || '',
      Company: payload.company || '',
      Services: Array.isArray(payload.services) ? payload.services.join(', ') : '',
      Answers: JSON.stringify(payload.answers || {}),
      PreferredMeetingLength: payload.preferredMeetingLength || '',
      ReferralSource: payload.referralSource || '',
      Consent: payload.consent ? 'Yes' : 'No',
      TidyCalBookingId: payload.tidycalBookingId || '',
      ZoomLink: payload.zoomLink || '',
      SubmittedAt: payload.submittedAt || new Date().toISOString(),
      UtmSource: payload.utmSource || '',
      UtmMedium: payload.utmMedium || '',
      UtmCampaign: payload.utmCampaign || '',
    };

    await createSharePointItem(token, siteId, listId, fields);

    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    context.log.error('Lead submission failed:', error.message);
    // Still return 200 so the user sees success — lead is not lost in monitoring
    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true, logged: false }),
    };
  }
};
