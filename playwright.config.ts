import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for the E2E smoke suite.
 *
 * These tests run against the **built static output** (`out/`), not `next dev`.
 * That is deliberate: the PR #111 tag-routing regression was only visible
 * against built static output, because the bug was in what
 * `generateStaticParams()` wrote to disk. A dev-server suite would not have
 * caught it.
 *
 * Run `yarn build` before `yarn test:e2e` — the webServer below serves `out/`
 * as-is and will not rebuild it.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],

  use: {
    baseURL: 'http://localhost:3100',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    // Use the repo-pinned `serve` version so E2E routing checks stay
    // reproducible in CI.
    command: 'yarn serve:static',
    url: 'http://localhost:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
