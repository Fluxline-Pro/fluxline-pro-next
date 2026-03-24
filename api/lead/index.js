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
 * Optional Environment Variables:
 * - LEAD_API_SECRET                        — Shared secret for X-Lead-Key request auth
 * - AZURE_QUEUE_CONNECTION_STRING          — Azure Storage connection string for fallback queue
 * - LEAD_QUEUE_NAME                        — Queue name for failed/transient submissions (default: lead-queue)
 *
 * POST /api/lead
 * Body: LeadPayload (see ConsultationStepper/types.ts)
 *
 * Security: Send X-Lead-Key header matching LEAD_API_SECRET env var.
 */

'use strict';

const https = require('https');
const crypto = require('crypto');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Lead-Key',
};

/** Maps frontend service keys to display labels used in SharePoint */
const SERVICE_LABELS = {
  personal_training: 'Personal Training',
  it_consulting: 'IT / Business Consulting',
  graphic_design: 'Graphic Design',
  web_development: 'Web Development',
  resonance_coaching: 'Resonance Core Framework Coaching',
  help_me_choose: "I don't know",
};

const VALID_MEETING_LENGTHS = ['20', '30', '45'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generates a short correlation/request ID for log tracing */
function newRequestId() {
  return crypto.randomBytes(8).toString('hex');
}

/** Validates an email address format */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Performs an HTTPS request, resolving with { statusCode, body } */
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

/**
 * Obtains a Graph API access token using client credentials flow.
 */
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

/**
 * Posts a new item to a SharePoint list via Graph API.
 * Returns the created item (including id/webUrl).
 */
async function createSharePointItem(token, siteId, listId, fields, log) {
  const body = JSON.stringify({ fields });

  const { statusCode, body: responseBody } = await httpsRequest(
    {
      hostname: 'graph.microsoft.com',
      path: `/v1.0/sites/${siteId}/lists/${listId}/items`,
      method: 'POST',
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

  const isTransient =
    statusCode === 429 ||
    statusCode === 503 ||
    statusCode === 502 ||
    statusCode === 504;
  const err = new Error(`Graph API error ${statusCode}: ${responseBody}`);
  err.transient = isTransient;
  throw err;
}

/**
 * Calls createSharePointItem with exponential-backoff retry (up to 3 attempts).
 */
async function createSharePointItemWithRetry(
  token,
  siteId,
  listId,
  fields,
  log
) {
  const MAX_ATTEMPTS = 3;
  const BASE_DELAY_MS = 500;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      return await createSharePointItem(token, siteId, listId, fields, log);
    } catch (err) {
      if (attempt === MAX_ATTEMPTS || !err.transient) throw err;
      const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
      log(
        `Lead: transient error on attempt ${attempt}, retrying in ${delay}ms — ${err.message}`
      );
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

/**
 * Enqueues the payload to an Azure Storage Queue for later retry.
 * Uses the Shared Key-authenticated Queue REST API with credentials
 * extracted from AZURE_QUEUE_CONNECTION_STRING.
 */
async function enqueuePayload(payload, queueName, connectionString, log) {
  // Parse account name and key from the connection string
  const accountMatch = connectionString.match(/AccountName=([^;]+)/i);
  const keyMatch = connectionString.match(/AccountKey=([^;]+)/i);
  const endpointMatch = connectionString.match(/QueueEndpoint=([^;]+)/i);

  if (!accountMatch || !keyMatch) {
    log('Lead: cannot parse AZURE_QUEUE_CONNECTION_STRING — skip queue');
    return;
  }

  const accountName = accountMatch[1];
  const accountKey = keyMatch[1];
  const host = endpointMatch
    ? new URL(endpointMatch[1]).hostname
    : `${accountName}.queue.core.windows.net`;

  const messageXml = `<QueueMessage><MessageText>${Buffer.from(JSON.stringify(payload)).toString('base64')}</MessageText></QueueMessage>`;
  const contentLength = Buffer.byteLength(messageXml);
  const date = new Date().toUTCString();
  // The HTTP request path on the Queue service host is /{queueName}/messages.
  // The host already encodes the account (${accountName}.queue.core.windows.net),
  // so prepending the account name again would produce a 404.
  const requestPath = `/${queueName}/messages`;
  // The canonicalized resource used in the Shared Key signature always includes
  // the account name as a prefix, regardless of the actual HTTP path.
  const canonicalizedResource = `/${accountName}/${queueName}/messages`;

  // Build HMAC-SHA256 signature for Shared Key auth
  const stringToSign = [
    'POST',
    '', // Content-MD5
    'application/xml', // Content-Type
    '', // Date (use x-ms-date instead)
    `x-ms-date:${date}\nx-ms-version:2020-10-02`,
    canonicalizedResource,
  ].join('\n');

  const signature = crypto
    .createHmac('sha256', Buffer.from(accountKey, 'base64'))
    .update(stringToSign)
    .digest('base64');

  const authHeader = `SharedKey ${accountName}:${signature}`;

  try {
    const { statusCode } = await httpsRequest(
      {
        hostname: host,
        path: requestPath,
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/xml',
          'Content-Length': contentLength,
          'x-ms-date': date,
          'x-ms-version': '2020-10-02',
        },
      },
      messageXml
    );

    if (statusCode >= 200 && statusCode < 300) {
      log('Lead: payload queued successfully');
    } else {
      log(`Lead: queue returned HTTP ${statusCode}`);
    }
  } catch (queueErr) {
    log(`Lead: failed to enqueue payload — ${queueErr.message}`);
  }
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

module.exports = async function (context, req) {
  const requestId = newRequestId();
  const log = (msg) => context.log(`[${requestId}] ${msg}`);
  const logWarn = (msg) => context.log.warn(`[${requestId}] ${msg}`);
  const logError = (msg) => context.log.error(`[${requestId}] ${msg}`);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: CORS_HEADERS, body: '' };
    return;
  }

  if (req.method !== 'POST') {
    context.res = {
      status: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method Not Allowed', requestId }),
    };
    return;
  }

  // ---------------------------------------------------------------------------
  // Authentication — X-Lead-Key header check (when LEAD_API_SECRET is configured)
  // ---------------------------------------------------------------------------
  const expectedSecret = process.env.LEAD_API_SECRET;
  if (expectedSecret) {
    const providedKey = req.headers['x-lead-key'] || '';
    if (!providedKey || providedKey !== expectedSecret) {
      logWarn('Lead: rejected — invalid or missing X-Lead-Key header');
      context.res = {
        status: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Unauthorized', requestId }),
      };
      return;
    }
  }

  // ---------------------------------------------------------------------------
  // Input validation
  // ---------------------------------------------------------------------------
  const payload = req.body;

  if (!payload || typeof payload !== 'object') {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Request body must be a JSON object.',
        requestId,
      }),
    };
    return;
  }

  const validationErrors = [];

  if (
    !payload.fullName ||
    typeof payload.fullName !== 'string' ||
    payload.fullName.trim().length < 2
  ) {
    validationErrors.push('fullName is required (minimum 2 characters).');
  }

  if (!payload.email || typeof payload.email !== 'string') {
    validationErrors.push('email is required.');
  } else if (!isValidEmail(payload.email)) {
    validationErrors.push('email must be a valid email address.');
  }

  if (!Array.isArray(payload.services) || payload.services.length === 0) {
    validationErrors.push('services must be a non-empty array.');
  }

  if (!payload.submittedAt || typeof payload.submittedAt !== 'string') {
    validationErrors.push('submittedAt is required (ISO 8601 timestamp).');
  }

  if (!payload.preferredMeetingLength) {
    validationErrors.push('preferredMeetingLength is required.');
  } else if (
    !VALID_MEETING_LENGTHS.includes(String(payload.preferredMeetingLength))
  ) {
    validationErrors.push(
      `preferredMeetingLength must be one of: ${VALID_MEETING_LENGTHS.join(', ')}.`
    );
  }

  // Consent must be explicitly true — reject with 400 if false or missing
  if (payload.consent !== true) {
    validationErrors.push('consent must be true to proceed.');
  }

  if (validationErrors.length > 0) {
    logWarn(`Lead: validation failed — ${validationErrors.join(' | ')}`);
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Validation failed.',
        details: validationErrors,
        requestId,
      }),
    };
    return;
  }

  // ---------------------------------------------------------------------------
  // Build SharePoint field values (matching the defined list schema)
  // ---------------------------------------------------------------------------
  const serviceLabels = Array.isArray(payload.services)
    ? payload.services.map((k) => SERVICE_LABELS[k] || k)
    : [];

  // Graph API v1.0 SharePoint list items — field value rules:
  //   Choice (multi-select): array of strings (Graph API v1.0 documented format)
  //   Choice (single-select): plain string
  //   Yes/No: boolean true only (omit false — SharePoint defaults to false)
  //   Date/Time: ISO 8601 without milliseconds, Z suffix
  //   Text: omit empty strings rather than sending ""
  const rawFields = {
    Title: `${payload.fullName.trim()} - ${serviceLabels[0] || 'Enquiry'}`,
    FullName: payload.fullName.trim(),
    Email: payload.email.trim(),
    Phone: payload.phone || '',
    Company: payload.company || '',
    // Multi-select Choice column — Graph API v1.0 requires the @odata.type annotation
    // alongside the array, otherwise it returns invalidRequest 400.
    'ServicesSelected@odata.type': 'Collection(Edm.String)',
    ServicesSelected: serviceLabels,
    AnswersJSON: JSON.stringify(payload.answers || {}),
    PreferredMeetingLength: String(payload.preferredMeetingLength || ''),
    TidyCalBookingID: payload.tidycalBookingId || '',
    ZoomLink: payload.zoomLink || '',
    ReferralSource: payload.referralSource || '',
    ConsentGiven: true,
    // Date and Time — ISO 8601, no milliseconds
    SubmittedAt: (payload.submittedAt || new Date().toISOString()).replace(
      /\.\d{3}Z$/,
      'Z'
    ),
    Status: 'New',
    // NotificationSent omitted — SharePoint Yes/No defaults to false; sending false explicitly
    // can trigger invalidRequest on some tenants
  };

  // Strip empty strings — Graph API returns 400 for empty string on some column types.
  // Arrays (ServicesSelected) are kept as-is.
  const fields = Object.fromEntries(
    Object.entries(rawFields).filter(
      ([, v]) => v !== '' && v !== null && v !== undefined
    )
  );

  // Optionally store raw payload for audit
  const storeRawPayload = process.env.LEAD_STORE_RAW_PAYLOAD === 'true';
  if (storeRawPayload) {
    // Redact sensitive-adjacent keys before storing
    const raw = { ...payload };
    delete raw.consent; // stored in ConsentGiven column
    const rawJson = JSON.stringify(raw);
    // Only store if within a safe size limit; omit entirely rather than store malformed data
    if (rawJson.length <= 100000) {
      fields.RawPayload = rawJson;
    } else {
      logWarn(
        'Lead: raw payload exceeds 100 KB limit — RawPayload field omitted'
      );
    }
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
    logWarn(
      'Lead: SharePoint env vars not configured — accepted without persisting'
    );
    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true, requestId, note: 'queued' }),
    };
    return;
  }

  // ---------------------------------------------------------------------------
  // Submit to SharePoint with retry, queue on transient failure
  // ---------------------------------------------------------------------------
  try {
    log(`Lead: submitting fields — ${Object.keys(fields).join(', ')}`);
    const token = await getGraphToken(tenantId, clientId, clientSecret);
    const created = await createSharePointItemWithRetry(
      token,
      siteId,
      listId,
      fields,
      log
    );

    log(`Lead: SharePoint item created — webUrl: ${created.webUrl || 'n/a'}`);

    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        requestId,
        itemUrl: created.webUrl || null,
      }),
    };
  } catch (error) {
    logError(`Lead: submission failed — ${error.message}`);

    // On transient errors, attempt to queue the payload for later retry
    const queueConnStr = process.env.AZURE_QUEUE_CONNECTION_STRING;
    const queueName = process.env.LEAD_QUEUE_NAME || 'lead-queue';

    if (error.transient && queueConnStr) {
      await enqueuePayload(
        { ...fields, _requestId: requestId },
        queueName,
        queueConnStr,
        log
      );
      context.res = {
        status: 202,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          requestId,
          note: 'accepted — will be retried',
        }),
      };
    } else {
      context.res = {
        status: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: 'An unexpected error occurred. Please try again.',
          requestId,
        }),
      };
    }
  }
};
