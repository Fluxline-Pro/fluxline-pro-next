'use strict';

/**
 * Azure Function: Ping Warmup (CRON Job)
 *
 * Keeps the Azure Functions host warm on the PROD environment by running every
 * 15 minutes. On non-PROD environments this function exits immediately so that
 * DEV and TEST are left alone.
 *
 * Timer Schedule: every 15 minutes  →  "0 */15 * * * *"
 *
 * Environment Variables:
 * - ENVIRONMENT: The current environment (dev, test, prod). When set to "prod"
 *   the warmup executes; all other values are treated as non-production and
 *   the function skips the warmup.
 */

module.exports = async function (context, myTimer) {
  const environment = (process.env.ENVIRONMENT || 'dev').toLowerCase();

  if (environment !== 'prod') {
    context.log(
      `Ping warmup: skipping – environment is "${environment}" (only runs on prod)`
    );
    return;
  }

  const timestamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log.warn(`Ping warmup: timer is past due at ${timestamp}`);
  }

  context.log(`200: OK Refreshed – ${timestamp}`);
};
