# Changelog

Notable changes to fluxline.pro (`fluxline-pro-next`). Releases are tagged on `master` as `v<major>_<minor>[_<patch>]_PROD` after promotion `develop` → `test` → `master`, and each has a matching [GitHub Release](https://github.com/Fluxline-Pro/fluxline-pro-next/releases).

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [v3_1_PROD] - 2026-10-05

This is the first production deploy since 2026-09-23. A duplicate route in `staticwebapp.config.json` made Azure Static Web Apps reject every test and production deploy from 2026-09-26, so the work below (plus anything merged to `master` after the 2026-09-23 build) reaches the live site with this release.

### Added

- `/resonance-core-framework` is now the single source of truth for the Resonance Core Framework®, with crawlable JSON-LD rendered in the static HTML and updated RCF copy for SEO and AI visibility. `/resonance-core` redirects there. ([#282](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/282))
- `/llms.txt`: a plain-text site summary for AI crawlers. It was already on `master` but had never been deployed. ([#289](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/289))
- Case study *Nine Phases, One Source of Truth*: the RCF publishing pipeline alignment. ([#281](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/281))
- Blog post on role separation and platform duties across the Fluxline CMS ecosystem. ([#279](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/279))
- A deploy guard: the test and production workflows run `src/staticwebapp-config.test.ts` before building. It fails on duplicate routes, unsupported redirect codes, or a missing legal-PDF header override. ([#289](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/289), [#292](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/292))

### Fixed

- **Deploys:** removed the duplicate `/resonance-core/` route that SWA rejected as a duplicate of `/resonance-core`, which had blocked every deploy since 2026-09-26. ([#289](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/289))
- **Articles of Conversion:** restored the Articles of Conversion and Statement of Conversion PDFs, with inline previews and downloads. ([#288](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/288))
- **Legal PDF previews:** `/assets/legal/*` is served with `X-Frame-Options: SAMEORIGIN`, so the inline previews aren't blocked by the site-wide `DENY`. Every other path keeps `DENY`. ([#292](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/292))
- **Auth:** the API's token validation now defaults `ENTRA_API_AUDIENCE` to `api://fluxline-account`, the Application ID URI that actually exists in the External ID tenant. ([#286](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/286))
- **Tech debt:** image imports are typed as `StaticImageData`, taxonomy redirects are fixed, and dead environment variables are removed. ([#285](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/285))
- **Storybook:** upgraded to 10.6 so `yarn build-storybook` works again. ([#284](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/284))

### Security

- Resolved all 118 open Dependabot alerts (8 critical, 53 high, 51 moderate, 6 low), including Next.js 16.3.3 and the API's nodemailer 9.1.1, plus a lockfile refresh. ([#283](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/283))

### Operations

- Removed six stale PR preview environments (from PRs closed or merged as far back as December 2025) from the test and production Static Web Apps. They had used every Free-tier staging slot, which made PR deploy checks fail.

## [v3_0_1_PROD] - 2026-09-19

### Changed

- Sign-in is delegated to the Fluxline Account Portal, and MSAL is removed from the site. ([#274](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/274))
- The signed-out sign-in entry is hidden from the production navigation. ([#277](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/277))

## [v3_0_PROD] - 2026-08-27

The first production release of the Next.js rebuild of fluxline.pro, migrated from the legacy React SPA.

### Added

- **Foundation:** Next.js App Router with static export to Azure Static Web Apps, an SSR-safe theme system on Fluent UI with SCSS, AA-compliant button theming, and the Inter font.
- **Pages:** home, services and service details, about, contact (Azure Functions plus SMTP), Scrolls (white papers), press releases, case studies, testimonials, the Fluxline Ethos, and the legal and reference pages.
- **Content engine:** a unified Markdown renderer, the file-based blog with tag and category filtering, portfolio with MDX, and SSG throughout.
- **Layout:** `UnifiedPageWrapper`, which consolidates the page wrappers; `ViewportGrid`; the settings panel; and the CueCard component and archive page.
- **SEO foundation:** metadata, `robots.txt`, `sitemap.xml`, and route layouts.

See the [v3_0_PROD release](https://github.com/Fluxline-Pro/fluxline-pro-next/releases/tag/v3_0_PROD) for the full PR list.

[v3_1_PROD]: https://github.com/Fluxline-Pro/fluxline-pro-next/compare/v3_0_1_PROD...v3_1_PROD
[v3_0_1_PROD]: https://github.com/Fluxline-Pro/fluxline-pro-next/compare/v3_0_PROD...v3_0_1_PROD
[v3_0_PROD]: https://github.com/Fluxline-Pro/fluxline-pro-next/releases/tag/v3_0_PROD
