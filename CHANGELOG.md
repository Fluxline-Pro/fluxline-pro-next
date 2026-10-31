# Changelog

Notable changes to fluxline.pro (`fluxline-pro-next`). Releases are tagged on `master` as `v<major>_<minor>[_<patch>]_PROD` after promotion `develop` → `test` → `master`, and each has a matching [GitHub Release](https://github.com/Fluxline-Pro/fluxline-pro-next/releases).

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Changed

- Contact form reCAPTCHA (owner, 2026-10-26): the keys now live in Google Cloud (Security → reCAPTCHA) after Google's move of classic reCAPTCHA keys into Google Cloud projects. New values are set for `RECAPTCHA_SITE_KEY` (GitHub Actions secret, read at build time as `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`) and `RECAPTCHA_SECRET_KEY` (Azure Static Web App settings, test and prod). This is configuration only, with no code change, and it takes effect on the next test and prod builds.
- SEO and AI-crawler terms: production `robots.txt` now names the major search and AI crawlers (OpenAI, Anthropic, Perplexity, Google, Bing, Apple, Amazon, Meta, DuckDuckGo, Mistral, Common Crawl) in one allow group that repeats the `/api/` disallow (dev/test still block everything; new `robots.test.ts`). `llms.txt` gains a site summary, Services, Key terms (the framework page's own definitions), the six core values, Questions this site answers, and cross-links to TerenceWaters.com and TheResonantIdentity.com. Metadata keywords on the root layout, home, framework, services, books, and podcasts pages add the RCF terms and real search phrases. Organization, Person, and WebSite JSON-LD gain `knowsAbout` / `keywords`, and the framework page adds a "The Six Core Values" `DefinedTermSet`.
- On-page search phrases: unique titles and meta descriptions (mirrored to Open Graph and Twitter) for home, `/services`, the five offering pages, `/resonance-core-framework`, `/contact`, `/books`, `/case-studies`, `/portfolio` and `/blog`, each aimed at one specific phrase (for example "coaching and consulting for founders", "business strategy and systems alignment consulting", "personal training in Salt Lake City"). `/books` no longer repeats the brand in its title, and the case studies description drops "measurable results". Service pages read optional `seoTitle`, `seoDescription` and `imageAlt` from `src/app/services/constants.ts`, falling back to the existing title and summary. `/services` now has an H1 (the existing heading). Listing subheads on case studies, portfolio and blog name what the work covers. `/contact` opens with where Fluxline is based and links each of the five offerings; the personal training page says sessions are in person along the Wasatch Front or remote; the RCF service page links to `/resonance-core-framework`. Descriptive alt text on the contact portrait, the home services image and the service page images.

## [v3_2_PROD] - 2026-10-26

### Added

- Blog post "Preorders for The Resonance Core Framework™ Open in Early November" (`/blog/rcf-preorders-early-november`): the preorder teaser, what is coming (book, workbook, author-narrated audiobook), why the date moved closer, and links to both RCF case studies and the `#notify` sign-up. No prices or edition SKUs until preorders open.
- Blog post "What is Fluxline?" (`/blog/what-is-fluxline`): an About Us post explaining Fluxline in plain terms — identity alignment and the "identity blocker" concept, how The Resonance Core Framework™'s Core Values underpin the work, and the business and individual services offered, with links to the RCF page, The Resonant Identity podcast, and contact.

### Changed

- CI: the "Smoke test built output" job runs on `ubuntu-24.04` instead of `ubuntu-latest`. `ubuntu-latest` moved to Ubuntu 26.04, which Playwright 1.57.0 cannot install Chromium on.
- Case study "Nine Phases, One Source of Truth" (`rcf-publishing-pipeline-alignment`): new "Update, October 2026: the bottleneck was print" section covering pipeline v1.1.3 (styled InDesign import) and v1.2 to v1.2.3 (eBook-first print build that generates the chapter and workbook exercise as 7×10 IDML files the author verifies). Description, SEO text, technologies, metrics, results and capabilities updated to match.
- Case study "Architecting a Multi-Modal Creative and Technical Ecosystem" (`rcf-infrastructure`): new Section 09, "Field Test, The System Builds the Book", on the book pipeline removing the manual print-layout bottleneck and the preorder date it makes possible. Version 1.1; description, technologies, metrics, results and keywords updated.

- Site UI fixes (owner, 2026-10-19):
  - Home stats: the first tile reads "5+ / Projects completed" (was "E2E / Projects, from concept to launch") and the industries tile reads "Various" (was "Diverse").
  - `/resonance-core-framework`: the "How it was developed" pill row (non-clickable chips that looked like links) is gone. Its content is folded into the FAQ as question-and-answer entries ("How was the RCF developed?", the six foundations under "What is the RCF built from?", and "What are the RCF's Universal Truths?"), styled like The Resonant Identity's FAQ (teal subheading with an accent rule, answer underneath). The FAQPage JSON-LD includes the new answers.
  - `/resonance-core-framework` "You'll recognize yourself here" is rebuilt from the book Introduction's five reader assumptions (from the RCF Preview PDF), each a heading with supporting text, instead of six small cards.
  - `/services/personal-training` (and the other priced services): the program tiers render as stacked cards on phones and as a table from 768px up, with every price on one line. The "What's Included" comparison shows a tier picker and that tier's feature list on phones (partial-inclusion notes spelled out), and the full table on larger screens. Status icons now have text for screen readers and use the DSM status tokens (the old `--fx-status-*` variables did not exist).
  - `/contact`: "Book a Free Consultation" is the standout featured callout (the same `FxFeatureCallout` that `/services` uses for the RCF and Business Strategy), and its button opens the consultation flow in place instead of linking back to `/contact`. The note form stays, styled as the secondary option. On phones the portrait is hidden and the Let's Connect card moves below the main column, so the callout comes first.
- Owner decisions (2026-10-19, round 4): the DRIVE Model wheel artwork now shows Embodiment as the sixth stage, and the step 6 and wheel images are renamed `embodiment_step.jpg` and `drive_model.jpg`. "DII" only ever means The Decision Integrity Index: "The Fluxline Philosophy" calls its three phases "Discover, Integrate, Impact" without the DII label, and the DRIVE case study no longer expands DII as "Desire-Integrity-Impact". The TEST deploy no longer builds PR preview environments; closing a PR still cleans up any leftover preview.
- Owner decisions (2026-10-19, round 3): "DII Protocol" is retired and the index is "The Decision Integrity Index (The DII)" at first use, then "The DII" (home, `/resonance-core-framework` concepts, FAQ, JSON-LD and keywords, `llms.txt`, the enterprise dashboard portfolio post, playbook and prompt). Creative Truth is a Core Value only and appears in no list of framework concepts (playbook updated). The book announcement's sixth DRIVE step image (`expansion_step.jpeg`) is replaced with the new EMBODIMENT artwork (same path).
- Voice and congruence pass (copy and links only), following `.github/rcf-voice-core.md` and `.github/prompts/fluxline-pro.prompt.md`, both added in this change:
  - The book date reads "targeted for Q1 2027" everywhere it said "Late Fall 2026": home, `/books`, the book detail page, `/resonance-core-framework`, `llms.txt` and the announcement post.
  - Home stats: the experience label names its scope ("Years in Design, Development, Architecture & Product Management"), and the offering count is "5 Offerings". The services intro and the 404 page say five modular offerings.
  - `/resonance-core-framework`: the loops are the Judgment Loop and the Data Loop, the sixth DRIVE stage is Embodiment (cards, image alt text, book contents), DRIVE is expanded at first use, "DRIVE System" is now "DRIVE Model", the DII is named "The Decision Integrity Index (The DII)", and the DAS gloss expands SSI, EROI and SI. Concept anchors (`#identity-distortion-loop`, `#identity-alignment-loop`, `#drive-system`, `#dii-protocol`) are unchanged so cross-site links keep working.
  - Behavioral Gravity uses the approved gloss in Core Concepts, the FAQ and the JSON-LD.
  - Claims: the FAQ "Is the RCF research-backed?" is now "What is the RCF built from?", the heading "Tested before it was written down" is "How it was developed", and Strategic Innovation reads "disciplined, repeatable practice" instead of "proven methodologies".
  - The Resonance Core Framework™ carries ™ at first use on the home, podcasts and book detail pages.
  - `/services` and the home services list open with the RCF in its own "Foundation" section (the method every engagement uses), followed by Strategy & Leadership, Brand & Digital Presence and Body & Practice. The RCF no longer sits under Body & Practice, and home no longer shows an empty Strategy & Leadership label above it.
  - Creative Truth appears only as a Core Value; it is no longer listed as a framework concept or named in the canonical RCF paragraph.
  - Home stats no longer show the unsourced "50+ Projects Delivered" and "10+ Industries Served": the tiles read "E2E / Projects, from concept to launch" and "Diverse / Industries served".
  - Every consultation CTA, the nav button and the `/book` title say "Book a Free Consultation".
  - "What It's Built On" names "The RCF's Universal Truths, which shape Fluxline's ethos and mission" instead of "Universal human truths".
  - Book announcements also say preorders open in early November 2026 (new `RCF_PREORDER_WINDOW` constant): the home framework summary and book card, the `/books` subhead, badges, preorder callout and "Want to know when it lands?" band, the book detail callout and book page copy, the RCF page `#notify` card and `llms.txt`.
  - Published posts use current RCF terms: the sixth DRIVE stage is Embodiment in the book announcement (gallery alt text and caption) and both DRIVE Model assessment posts (blog and case study), "Universal human truths" reads "The RCF's Universal Truths" in the book announcement, and "The Fluxline Philosophy" says "disciplined, repeatable practice" instead of "proven methodologies".
- Blog and Portfolio are in the main navigation. The desktop link row now starts at 1,240px (the hamburger menu covers narrower widths) so seven links fit without labels wrapping mid-word.
- The RCF page has a "Be notified when the book lands" sign-up (`/resonance-core-framework#notify`), and `/books` "Want to know when it lands?" embeds the same form. "Be notified at launch" links on fluxline.pro point to it instead of `/contact`.
  - Footer: the cross-sell nav is labelled "Fluxline Ecosystem" (was "The RCF Ecosystem") and lists the shared Listen, Read and Work lines; the author link reads "By Terence Waters: Founder & CEO, author, systems architect, and identity coach." and goes to terencewaters.com/about/. "Explore the Podcast" goes to theresonantidentity.com/start-here/. The TRI Newsletter description adds "Book launch updates included."

### Fixed

- The TRI Newsletter sign-up boxes on `/contact` and `/podcasts` never sent anything (the button had no handler and nothing called `/api/newsletter-subscribe`). A shared `NewsletterSignup` component now subscribes and shows the API's response.
- Detail-page CTA bands linked every primary button to `/contact` and dropped the second button: "Explore More Articles" (blog posts), "Resonance Core Services" (books) and "View Our Services" (case studies) now go where they say, and both buttons render.
- `yarn lint` is clean again (0 errors; 45 warnings remain, mostly `<img>` and hook-dependency advisories): the six `react-hooks/set-state-in-effect` cases are rewritten (hydration flags via `useSyncExternalStore` in `ConsentBanner`, `AuthContext` and `TestimonialCarousel`; the consultation draft is restored through lazy `useState` initializers; the stepper resets its status with the state-from-props pattern; the rail layout schedules its first measurement on the next frame), the four `any` casts are typed, the unescaped quotes are escaped, and the empty props interface is a `Record<string, never>`. ESLint now treats `api/`, `scripts/` and `jest.config.js` as CommonJS and ignores the vendored `docs/dsm_v1_0/` template bundles and local `.claude/` worktrees.
- `case-study-content.test.ts` checks for *quantitative* retention, return or churn claims again (a retention term together with a percentage, multiplier or month/year count on the same line) instead of failing on every qualitative mention; the suite is green (137/137).

### Removed

- The main site's own Stripe book-checkout path, redundant since the storefront took over purchase ([#260](https://github.com/Fluxline-Pro/fluxline-pro-next/issues/260)): the `create-checkout-session`, `get-order` and `stripe-webhook` Functions, the `stripe` dependency of the API, and the `STRIPE_*` entries in `local.settings.sample.json`. `/books` already hands off to the storefront. The `STRIPE_*` SWA settings are removed from TEST with this change and must be removed from PROD at the next production promotion, not before.
- Dead SWA settings `CMS_API_BASE_URL`, `LEAD_API_SECRET` and `ENTRA_ALLOWED_AUDIENCES` (no reader in `api/` or `src/`) are removed from TEST; PROD at the next promotion.

### Security

- Dependency audit ([#260](https://github.com/Fluxline-Pro/fluxline-pro-next/issues/260)): `next` 16.3.8, `axios` ^1.20.0, `dompurify` ^3.4.16, plus `resolutions` pinning the vulnerable transitive packages (`minimatch`, `picomatch`, `ajv`, `ws`, `flatted`, `source-map-js`, `esbuild`, `compression`, `diff`, `sharp`). `yarn audit` on `develop` goes from 184 advisories (1 critical, 122 high) to 20, all in `braces` and `sprintf-js`, for which no patched release exists. API: `nodemailer` ^10.1.0 and `jest` ^30; the 19 remaining API advisories are jest-internal (`js-yaml` 3 via `argparse`) with no fix available. The Dependabot tab counts against `master`, which has not been promoted since v3_1_PROD; those clear when this reaches `master`.

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

- **PR preview cleanup:** PR preview environments are now reliably deleted. A per-PR `concurrency` group queues the close behind any in-flight upload instead of racing it. The `pull_request` trigger is unfiltered, so retargeting a PR away from `master`/`test` also removes its preview. The close step drops build inputs that did nothing. ([#294](https://github.com/Fluxline-Pro/fluxline-pro-next/pull/294))
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

[v3_2_PROD]: https://github.com/Fluxline-Pro/fluxline-pro-next/compare/v3_1_PROD...v3_2_PROD
[v3_1_PROD]: https://github.com/Fluxline-Pro/fluxline-pro-next/compare/v3_0_1_PROD...v3_1_PROD
[v3_0_1_PROD]: https://github.com/Fluxline-Pro/fluxline-pro-next/compare/v3_0_PROD...v3_0_1_PROD
[v3_0_PROD]: https://github.com/Fluxline-Pro/fluxline-pro-next/releases/tag/v3_0_PROD
