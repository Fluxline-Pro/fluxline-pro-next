/**
 * Azure Function: Newsletter Subscribe API
 *
 * Adds an email address to the SharePoint Online Email Distribution List
 * via the Microsoft Graph API.
 *
 * Required Environment Variables:
 * - ENTRAID_SP_APP_REGISTRATION_CLIENT_ID  — Entra ID app registration client ID
 * - ENTRAID_SP_CLIENT_SECRET               — Entra ID app registration client secret
 * - ENTRAID_SP_TENANT_ID                   — Azure AD tenant ID (GUID format)
 * - SHAREPOINT_SITE_ID                     — SharePoint site ID (GUID format)
 * - SHAREPOINT_LIST_ID                     — SharePoint list ID for the Email Distribution List (GUID format)
 * - SHAREPOINT_EMAIL_FIELD                 — SharePoint list field name for email address
 * - SHAREPOINT_PLATFORM_FIELD              — SharePoint list field name for platform/source
 * - SHAREPOINT_TIMESTAMP_FIELD             — SharePoint list field name for submission timestamp
 * - RECAPTCHA_SECRET_KEY                   — Google reCAPTCHA v3 secret key for spam protection
 *
 * POST /api/newsletter-subscribe
 * Body: { email: string, recaptchaToken?: string }
 */

'use strict';

const https = require('https');

// Simple rate limiting store (in-memory), same shape as api/contact/index.js.
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour per IP
const RATE_LIMIT_MAX_KEYS = 10000;

// reCAPTCHA configuration
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_MIN_SCORE = 0.5; // Minimum score to consider valid (0.0 - 1.0)

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function evictExpired(now) {
  for (const [key, record] of rateLimit) {
    if (now > record.resetTime) rateLimit.delete(key);
  }
}

function getClientIp(req) {
  const headers = req.headers || {};
  const forwarded = headers['x-forwarded-for'];
  if (forwarded) {
    const chain = String(forwarded)
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean);
    const closest = chain[chain.length - 1];
    if (closest) return closest;
  }
  return headers['x-client-ip'] || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    evictExpired(now);
    if (rateLimit.size >= RATE_LIMIT_MAX_KEYS) {
      return false;
    }
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

/**
 * Verifies a reCAPTCHA v3 token with Google's siteverify API. Mirrors the
 * verification in api/contact/index.js (action + hostname + score checks).
 */
async function verifyRecaptcha(token) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
    }).toString();

    const options = {
      hostname: 'www.google.com',
      path: '/recaptcha/api/siteverify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          reject(new Error('Failed to parse reCAPTCHA response'));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy(new Error('reCAPTCHA verification timed out'));
    });
    req.write(postData);
    req.end();
  });
}

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
            reject(
              new Error(parsed.error_description || 'Failed to obtain token')
            );
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
async function graphRequest(method, path, token, body, extraHeaders) {
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
        ...extraHeaders,
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

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    context.res = {
      status: 429,
      headers: CORS_HEADERS,
      body: { error: 'Too many requests. Please try again later.' },
    };
    return;
  }

  const { email, recaptchaToken } = req.body || {};

  if (!email || !validateEmail(email)) {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: { error: 'A valid email address is required.' },
    };
    return;
  }

  // Verify reCAPTCHA token (if a secret key is configured)
  if (RECAPTCHA_SECRET_KEY) {
    if (!recaptchaToken) {
      context.log.warn('Newsletter subscribe: reCAPTCHA token missing');
      context.res = {
        status: 400,
        headers: CORS_HEADERS,
        body: { error: 'reCAPTCHA verification required.' },
      };
      return;
    }

    try {
      const verificationResult = await verifyRecaptcha(recaptchaToken);

      if (!verificationResult.success) {
        context.log.warn(
          'Newsletter subscribe: reCAPTCHA verification failed:',
          verificationResult['error-codes']
        );
        context.res = {
          status: 400,
          headers: CORS_HEADERS,
          body: { error: 'Failed to verify reCAPTCHA. Please try again.' },
        };
        return;
      }

      if (verificationResult.action !== 'newsletter_subscribe') {
        context.log.warn(
          'Newsletter subscribe: reCAPTCHA action mismatch. Expected: newsletter_subscribe, Received:',
          verificationResult.action
        );
        context.res = {
          status: 400,
          headers: CORS_HEADERS,
          body: { error: 'reCAPTCHA validation failed. Please try again.' },
        };
        return;
      }

      const expectedHostname = process.env.RECAPTCHA_HOSTNAME || 'fluxline.pro';
      if (
        verificationResult.hostname &&
        !verificationResult.hostname.includes(expectedHostname)
      ) {
        context.log.warn(
          'Newsletter subscribe: reCAPTCHA hostname mismatch. Expected:',
          expectedHostname,
          'Received:',
          verificationResult.hostname
        );
        context.res = {
          status: 400,
          headers: CORS_HEADERS,
          body: { error: 'reCAPTCHA validation failed. Please try again.' },
        };
        return;
      }

      if (
        typeof verificationResult.score !== 'number' ||
        verificationResult.score < RECAPTCHA_MIN_SCORE
      ) {
        context.log.warn(
          `Newsletter subscribe: reCAPTCHA score too low: ${verificationResult.score} (minimum: ${RECAPTCHA_MIN_SCORE})`
        );
        context.res = {
          status: 400,
          headers: CORS_HEADERS,
          body: {
            error: 'Suspicious activity detected. Please try again later.',
          },
        };
        return;
      }
    } catch (error) {
      context.log.error('Newsletter subscribe: reCAPTCHA verification error:', error);
      context.res = {
        status: 500,
        headers: CORS_HEADERS,
        body: { error: 'Failed to verify reCAPTCHA. Please try again.' },
      };
      return;
    }
  } else {
    context.log.warn(
      'Newsletter subscribe: RECAPTCHA_SECRET_KEY not configured, skipping verification.'
    );
  }

  // Required environment variables
  const tenantId = process.env.ENTRAID_SP_TENANT_ID;
  const clientId = process.env.ENTRAID_SP_APP_REGISTRATION_CLIENT_ID;
  const clientSecret = process.env.ENTRAID_SP_CLIENT_SECRET;
  const siteId = process.env.SHAREPOINT_SITE_ID;
  const listId = process.env.SHAREPOINT_LIST_ID;
  const emailField = process.env.SHAREPOINT_EMAIL_FIELD;
  const platformField = process.env.SHAREPOINT_PLATFORM_FIELD;
  const timestampField = process.env.SHAREPOINT_TIMESTAMP_FIELD;

  if (
    !tenantId ||
    !clientId ||
    !clientSecret ||
    !siteId ||
    !listId ||
    !emailField ||
    !platformField ||
    !timestampField
  ) {
    context.log.error(
      'Missing required environment variables for SharePoint integration.'
    );
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
    const encodedFilter = encodeURIComponent(
      `fields/${emailField} eq '${safeEmail}'`
    );
    const existing = await graphRequest(
      'GET',
      `/v1.0/sites/${siteId}/lists/${listId}/items?$filter=${encodedFilter}&$select=id`,
      token,
      null,
      { Prefer: 'HonorNonIndexedQueriesWarningMayFailRandomly' }
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
          [emailField]: email,
          [platformField]: 'Fluxline.pro',
          [timestampField]: new Date().toISOString(),
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
