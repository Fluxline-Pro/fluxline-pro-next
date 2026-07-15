import { test, expect } from '@playwright/test';

/**
 * Minimal smoke suite covering the regression class the site has actually been
 * bitten by.
 *
 * PR #111 shipped a tag-routing bug that was invisible in `yarn dev` and only
 * appeared against built static output on Azure. These five tests run against
 * `out/` for exactly that reason — they are the cheapest thing that would have
 * caught it before deploy.
 *
 * Requires `yarn build` first; the webServer serves out/ and does not rebuild.
 */

test('home page renders', async ({ page }) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Fluxline/i);
  // The layout mounts — not just a 200 for an empty shell.
  await expect(page.locator('main, body')).toBeVisible();
});

test('blog detail page renders its content', async ({ page }) => {
  const response = await page.goto('/blog/robots-rhythmic/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1').first()).toContainText(/Rhythmic/i);
});

test('taxonomy route derived from a name with spaces resolves to its display name', async ({
  page,
}) => {
  // 'Personal Growth' -> slug 'personal-growth'. This is the PR #111 regression
  // class: the route must resolve with no encoding, and the page must show the
  // human-readable display name rather than the slug.
  const response = await page.goto('/blog/tag/personal-growth/');
  expect(response?.status()).toBe(200);

  // Slug in the URL, display name on the page.
  expect(page.url()).toContain('/blog/tag/personal-growth/');
  expect(page.url()).not.toContain('%20');
  await expect(page).toHaveTitle(/Personal Growth/i);
  await expect(page.locator('h1').first()).toContainText(/Personal Growth/i);

  // The tag page lists posts rather than rendering an empty result.
  await expect(page.locator('a[href*="/blog/"]').first()).toBeVisible();
});

test('legacy space-encoded taxonomy URLs do not resolve', async ({ page }) => {
  // Guards against a regression back to space-named folders. If this ever
  // returns 200, generateStaticParams() has started emitting display names
  // again. (Legacy 301 redirects are tracked separately — see #253. If those
  // land, this expectation becomes a 301 to the slug URL.)
  const response = await page.goto('/blog/tag/Personal%20Growth/', {
    waitUntil: 'commit',
  });
  expect(response?.status()).not.toBe(200);
});

test('portfolio technology route renders its display name', async ({ page }) => {
  // 'Next.js 16' -> slug 'next-js-16': punctuation and a digit, collapsed to a
  // single hyphen run.
  const response = await page.goto('/portfolio/technology/next-js-16/');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Next\.js 16/i);
  await expect(page.locator('h1').first()).toContainText(/Next\.js 16/i);
});

test('podcast listing renders', async ({ page }) => {
  const response = await page.goto('/podcasts/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1').first()).toContainText(/PODCAST/i);
});
