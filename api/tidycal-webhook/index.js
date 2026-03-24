/**
 * Azure Function: TidyCal Webhook Handler
 *
 * Receives booking confirmation events from TidyCal and updates the
 * corresponding SharePoint lead item with the TidyCal booking ID and
 * Zoom meeting link.
 *
 * Required Environment Variables:
 * - ENTRAID_SP_APP_REGISTRATION_CLIENT_ID  — Entra ID app registration client ID
 * - ENTRAID_SP_CLIENT_SECRET               — Entra ID app registration client secret
 * - ENTRAID_SP_TENANT_ID                   — Azure AD tenant ID (GUID format)
 * - SHAREPOINT_SITE_ID                     — SharePoint site ID (GUID format)
 * - LEADS_LIST_ID                          — SharePoint list ID for consultation leads
 *
 * Optional Environment Variables:
 * - TIDYCAL_WEBHOOK_SECRET                 — HMAC-SHA256 secret for verifying TidyCal webhook signatures
 *
 * POST /api/tidycal-webhook
 *
 * TidyCal sends a JSON payload with booking details.
 * Expected fields used: booking.id, booking.email, booking.zoom_join_url (or similar)
 *
 * Webhook registration: Register this endpoint URL in TidyCal → Settings → Webhooks.
 */

'use strict';

const crypto = require('crypto');
const https = require('https');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-TidyCal-Signature',
};

// ---------------------------------------------------------------------------
// Helpers — shared with lead/index.js (duplicated to keep functions self-contained)
// ---------------------------------------------------------------------------

function newRequestId() {
  return crypto.randomBytes(8).toString('hex');
}

/** Validates an email address format */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function httpsRequest(options, bodyStr) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function getGraphToken(tenantId, clientId, clientSecret) {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
  }).toString();

  const { statusCode, body: responseBody } = await httpsRequest(
    {
      hostname: 'login.microsoftonline.com',
      path: `/${tenantId}/oauth2/v2.0/token`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    },
    body
  );

  if (statusCode >= 200 && statusCode < 300) {
    try {
      const parsed = JSON.parse(responseBody);
      if (parsed.access_token) return parsed.access_token;
    } catch {}
  }
  throw new Error(`Failed to obtain Graph token (HTTP ${statusCode})`);
}

// ---------------------------------------------------------------------------
// SharePoint helpers
// ---------------------------------------------------------------------------

/**
 * Searches the SharePoint leads list for the most recent item matching the
 * given email address and returns its SharePoint item ID.
 * Email is validated before use to prevent OData injection.
 */
async function findLeadByEmail(token, siteId, listId, email) {
  // Validate email format before embedding in OData filter
  if (!isValidEmail(email)) {
    throw new Error(`Invalid email address format: ${email}`);
  }
  // Escape single quotes in OData string values
  const safeEmail = email.replace(/'/g, "''");
  const filter = encodeURIComponent(`fields/Email eq '${safeEmail}'`);
  const path = `/v1.0/sites/${siteId}/lists/${listId}/items?$filter=${filter}&$orderby=createdDateTime desc&$top=1&$select=id,webUrl`;

  const { statusCode, body } = await httpsRequest(
    {
      hostname: 'graph.microsoft.com',
      path,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    },
    null
  );

  if (statusCode === 200) {
    try {
      const result = JSON.parse(body);
      const items = result.value || [];
      return items.length > 0 ? items[0] : null;
    } catch {}
  }
  throw new Error(`SharePoint search failed (HTTP ${statusCode})`);
}

/**
 * Updates a SharePoint list item's fields via PATCH.
 */
async function updateSharePointItem(token, siteId, listId, itemId, fields) {
  const body = JSON.stringify({ fields });

  const { statusCode, body: responseBody } = await httpsRequest(
    {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/sites/${siteId}/lists/${listId}/items/${itemId}/fields`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    },
    body
  );

  if (statusCode >= 200 && statusCode < 300) {
    try {
      return JSON.parse(responseBody);
    } catch {
      return {};
    }
  }
  throw new Error(`Graph API PATCH error ${statusCode}: ${responseBody}`);
}

// ---------------------------------------------------------------------------
// Signature verification
// ---------------------------------------------------------------------------

/**
 * Verifies the TidyCal webhook HMAC-SHA256 signature if a secret is configured.
 * TidyCal sends the signature in the X-TidyCal-Signature header as:
 *   sha256=<hex-digest>
 *
 * If the secret is configured but rawBody is unavailable, returns false rather
 * than attempting verification with a reconstructed body (which may differ from
 * the original request bytes and cause false positives or false negatives).
 */
function verifyWebhookSignature(rawBody, signatureHeader, secret) {
  if (!secret) return true; // skip verification if not configured
  if (!signatureHeader) return false;
  if (!rawBody) return false; // cannot verify without the original bytes

  const expected = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  // Constant-time comparison
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signatureHeader),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Payload extraction — normalise TidyCal event fields
// ---------------------------------------------------------------------------

/**
 * Extracts booking details from a TidyCal webhook payload.
 * TidyCal webhook event structure (as documented in their API):
 * {
 *   event: "booking.created" | "booking.cancelled" | ...,
 *   booking: {
 *     id: number,
 *     contact: { email: string, name: string },
 *     meeting_url: string,       // Zoom or other video link
 *     starts_at: string,
 *     ends_at: string,
 *   }
 * }
 */
function extractBookingDetails(payload) {
  const booking = payload.booking || payload;
  const contact = booking.contact || {};

  // Safely extract booking ID — null/undefined become empty string; 0 becomes '0'
  const rawId = booking.id != null ? booking.id : (booking.booking_id != null ? booking.booking_id : null);
  const bookingId = rawId != null ? String(rawId) : '';

  return {
    bookingId,
    email: contact.email || booking.email || '',
    zoomLink: booking.meeting_url || booking.zoom_join_url || booking.video_call_url || '',
    eventType: payload.event || 'booking.created',
    meetingScheduledAt: booking.starts_at || booking.start_time || '',
  };
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

module.exports = async function (context, req) {
  const requestId = newRequestId();
  const log = (msg) => context.log(`[TidyCal][${requestId}] ${msg}`);
  const logWarn = (msg) => context.log.warn(`[TidyCal][${requestId}] ${msg}`);
  const logError = (msg) => context.log.error(`[TidyCal][${requestId}] ${msg}`);

  // CORS preflight
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

  // ---------------------------------------------------------------------------
  // Webhook signature verification
  // ---------------------------------------------------------------------------
  const webhookSecret = process.env.TIDYCAL_WEBHOOK_SECRET;
  const signatureHeader = req.headers['x-tidycal-signature'] || '';

  // Azure Functions v3/v4 provides req.rawBody for the original request bytes.
  // If rawBody is unavailable and a secret is configured, we cannot safely verify
  // the signature — reject the request rather than verify against reconstructed JSON.
  const rawBody = req.rawBody || null;

  if (webhookSecret && !rawBody) {
    logWarn('TidyCal webhook: rawBody unavailable — cannot verify signature');
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Unable to verify webhook signature.' }),
    };
    return;
  }

  if (!verifyWebhookSignature(rawBody, signatureHeader, webhookSecret)) {
    logWarn('TidyCal webhook: invalid or missing signature — rejected');
    context.res = {
      status: 401,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid webhook signature.' }),
    };
    return;
  }

  const payload = req.body;
  if (!payload || typeof payload !== 'object') {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid payload.' }),
    };
    return;
  }

  const { bookingId, email, zoomLink, eventType, meetingScheduledAt } = extractBookingDetails(payload);

  log(`TidyCal webhook received — event: ${eventType}, bookingId: ${bookingId}, email: ${email}`);

  // Only handle booking creation events
  if (eventType && !eventType.includes('created') && !eventType.includes('confirmed')) {
    log(`TidyCal webhook: event type "${eventType}" not handled — returning 200`);
    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ received: true }),
    };
    return;
  }

  if (!email) {
    logWarn('TidyCal webhook: no email in payload — cannot match lead');
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'No email address in webhook payload.' }),
    };
    return;
  }

  if (!bookingId) {
    logWarn('TidyCal webhook: no booking ID in payload');
  }

  // ---------------------------------------------------------------------------
  // SharePoint credentials
  // ---------------------------------------------------------------------------
  const clientId = process.env.ENTRAID_SP_APP_REGISTRATION_CLIENT_ID;
  const clientSecret = process.env.ENTRAID_SP_CLIENT_SECRET;
  const tenantId = process.env.ENTRAID_SP_TENANT_ID;
  const siteId = process.env.SHAREPOINT_SITE_ID;
  const listId = process.env.LEADS_LIST_ID;

  if (!clientId || !clientSecret || !tenantId || !siteId || !listId) {
    logWarn('TidyCal webhook: SharePoint env vars not configured — accepted without updating');
    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ received: true }),
    };
    return;
  }

  // ---------------------------------------------------------------------------
  // Find lead and update with booking details
  // ---------------------------------------------------------------------------
  try {
    const token = await getGraphToken(tenantId, clientId, clientSecret);
    const item = await findLeadByEmail(token, siteId, listId, email);

    if (!item) {
      logWarn(`TidyCal webhook: no lead found for email ${email}`);
      // Still return 200 so TidyCal does not retry unnecessarily
      context.res = {
        status: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({ received: true, matched: false }),
      };
      return;
    }

    const updates = {};
    if (bookingId) updates.TidyCalBookingID = bookingId;
    if (zoomLink) updates.ZoomLink = zoomLink;
    // Store the actual scheduled meeting time in a separate field, preserving
    // SubmittedAt as the original lead submission timestamp
    if (meetingScheduledAt) updates.MeetingScheduledAt = meetingScheduledAt;

    await updateSharePointItem(token, siteId, listId, item.id, updates);

    log(`TidyCal webhook: updated SharePoint item ${item.id} — bookingId: ${bookingId}, zoomLink: ${zoomLink}`);

    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ received: true, matched: true, itemId: item.id }),
    };
  } catch (error) {
    logError(`TidyCal webhook: SharePoint update failed — ${error.message}`);
    // Return 500 so TidyCal retries the webhook delivery
    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to update lead record. Will retry.' }),
    };
  }
};
