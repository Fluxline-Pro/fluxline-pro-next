'use strict';

/**
 * Azure Function: Ping Warmup (HTTP Trigger)
 *
 * Keeps the Azure Functions host warm on the PROD environment. Call this
 * endpoint on a schedule (e.g. a GitHub Actions cron job) to prevent cold
 * starts. On non-PROD environments the function returns early with a 200 so
 * that DEV and TEST are left alone.
 *
 * GET /api/ping-warmup
 *
 * Environment Variables:
 * - ENVIRONMENT: The current environment (dev, test, prod). When set to "prod"
 *   the warmup executes; all other values are treated as non-production and
 *   the function skips the warmup.
 */

module.exports = async function (context, req) {
  const environment = (process.env.ENVIRONMENT || 'dev').toLowerCase();
  const timestamp = new Date().toISOString();

  if (environment !== 'prod') {
    context.log(
      `Ping warmup: skipping – environment is "${environment}" (only runs on prod)`
    );
    context.res = {
      status: 200,
      body: { status: 'skipped', environment, timestamp },
    };
    return;
  }

  context.log(`Ping warmup: completed successfully at ${timestamp}`);
  context.res = {
    status: 200,
    body: { status: 'ok', environment, timestamp },
  };
};
