// Origins allowed to call this API from the browser. The main site (all its
// environments) plus the sibling Fluxline apps — account portal, CMS, and
// storefront — may call these endpoints (e.g. cross-origin entitlement
// lookups). Override/extend in any environment via the CORS_ALLOWED_ORIGINS
// env var (comma-separated).
const DEFAULT_ALLOWED_ORIGINS = [
  'https://fluxline.pro',
  'https://www.fluxline.pro',
  'https://flx-next-test.fluxline.pro',
  'https://flx-next-dev.fluxline.pro',
  'https://account.fluxline.pro',
  'https://account-test.fluxline.pro',
  'https://cms.fluxline.pro',
  'https://cms-test.fluxline.pro',
  'https://store.fluxline.pro',
  'https://test-store.fluxline.pro',
  'http://localhost:3000',
];

function getAllowedOrigins() {
  const configured = (process.env.CORS_ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  return configured.length ? configured : DEFAULT_ALLOWED_ORIGINS;
}

function getCorsHeaders(req) {
  const allowed = getAllowedOrigins();
  const origin = req.headers?.origin || '';
  const isAllowed = allowed.includes(origin);

  return {
    // Echo the caller's origin only when it is allow-listed; otherwise fall
    // back to the canonical site origin (a non-match the browser rejects).
    'Access-Control-Allow-Origin': isAllowed ? origin : allowed[0],
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function handleCors(req) {
  if (req.method === 'OPTIONS') {
    return {
      status: 204,
      headers: getCorsHeaders(req),
      body: '',
    };
  }
  return null;
}

module.exports = { getCorsHeaders, handleCors };
