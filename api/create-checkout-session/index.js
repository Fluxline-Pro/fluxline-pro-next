'use strict';

/**
 * Create Stripe Checkout Session - Azure Function
 * Creates a Stripe Checkout session for PDF purchases (book, workbook, or bundle)
 *
 * POST /api/create-checkout-session
 * Body: { productType: 'book' | 'workbook' | 'bundle', customerName: string }
 * Returns: { url: string } - Stripe hosted checkout URL
 */

const Stripe = require('stripe');

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/** Map product types to Stripe Price IDs (configured via environment variables) */
function getPriceId(productType) {
  switch (productType) {
    case 'book':
      return process.env.STRIPE_PRICE_ID_BOOK;
    case 'workbook':
      return process.env.STRIPE_PRICE_ID_WORKBOOK;
    case 'bundle':
      return process.env.STRIPE_PRICE_ID_BUNDLE;
    default:
      return null;
  }
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  // Allow only alphanumeric characters, spaces, and common name punctuation
  return input.replace(/[^a-zA-Z0-9\s.,'\-]/g, '').trim().slice(0, 200);
}

module.exports = async function (context, req) {
  context.log('create-checkout-session: request received');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: CORS_HEADERS, body: '' };
    return;
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    context.log.error('create-checkout-session: STRIPE_SECRET_KEY not configured');
    context.res = {
      status: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Payment service is not configured.' }),
    };
    return;
  }

  const body = req.body;
  if (!body) {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Request body is required.' }),
    };
    return;
  }

  const { productType, customerName } = body;

  if (!productType || !['book', 'workbook', 'bundle'].includes(productType)) {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Invalid productType. Must be book, workbook, or bundle.' }),
    };
    return;
  }

  if (!customerName || typeof customerName !== 'string' || !customerName.trim()) {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'customerName is required.' }),
    };
    return;
  }

  const priceId = getPriceId(productType);
  if (!priceId) {
    context.log.error(`create-checkout-session: price ID not configured for productType=${productType}`);
    context.res = {
      status: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Product pricing is not configured.' }),
    };
    return;
  }

  const siteUrl = process.env.SITE_URL || 'https://fluxline.pro';
  const sanitizedName = sanitizeInput(customerName);

  if (!sanitizedName) {
    context.res = {
      status: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'customerName contains only invalid characters.' }),
    };
    return;
  }

  try {
    const stripe = new Stripe(stripeSecretKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${siteUrl}/books/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/books`,
      customer_creation: 'always',
      metadata: {
        productType,
        customerName: sanitizedName,
      },
      payment_intent_data: {
        metadata: {
          productType,
          customerName: sanitizedName,
        },
      },
    });

    context.log(`create-checkout-session: session created id=${session.id} productType=${productType}`);

    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    context.log.error('create-checkout-session: Stripe error:', error.message);
    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Failed to create checkout session. Please try again.' }),
    };
  }
};
