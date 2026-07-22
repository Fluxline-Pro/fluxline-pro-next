/**
 * Book-specific content for `/books`.
 *
 * The framework itself is described in `src/lib/resonanceCore.ts` and explained
 * at `/resonance-core`; this file only covers the publications built on it.
 *
 * Purchase lives on store.fluxline.pro — nothing here should describe prices or
 * checkout. The offerings below mirror the storefront catalog
 * (fluxline-pro-storefront-app, src/lib/catalog/catalog.ts) so the two stay
 * recognisably the same product set.
 */

/** Where purchase actually happens once the book ships. */
export const STOREFRONT_URL = 'https://store.fluxline.pro';

/**
 * Slug of the RCF book.
 *
 * `RCF_OFFERINGS` below describes that title specifically — its workbook, its
 * bundles, its lesson library. The `/books/[slug]` route is generic, so it
 * checks against this before rendering any of it; every other book falls back
 * to a neutral storefront hand-off.
 */
export const RCF_BOOK_SLUG = 'resonance-core-framework';

/** Lede under the page heading. */
export const RCF_LEDE =
  'The book and companion workbook that put The Resonance Core Framework™ in your hands. Both are in final production.';

/**
 * What will be offered alongside the book. Mirrors the storefront catalog —
 * see fluxline-pro-storefront-app/src/lib/catalog/catalog.ts.
 */
export const RCF_OFFERINGS: {
  group: string;
  items: { name: string; body: string; note?: string }[];
}[] = [
  {
    group: 'The book',
    items: [
      {
        name: 'Hardcover',
        body: 'The full framework in a durable hardcover edition, printed on demand and shipped to you.',
      },
      {
        name: 'Softcover',
        body: 'The same complete text in a lighter, more portable softcover edition.',
      },
      {
        name: 'eBook',
        body: 'Read online, hosted on Fluxline. Searchable, resumable, and available on every device you sign in from.',
      },
      {
        name: 'Audiobook',
        body: 'A narrated edition for reading with your hands full. Instant digital access after purchase.',
      },
      {
        name: 'Kindle',
        body: 'Also coming to Amazon Kindle.',
        note: 'Sold and delivered through Amazon.',
      },
    ],
  },
  {
    group: 'The companion workbook',
    items: [
      {
        name: 'Workbook — Softcover',
        body: 'Self-assessments, guided exercises, reflection prompts, action plans, and progress tracking. Built to be written in.',
      },
      {
        name: 'Workbook — eBook',
        body: 'The same workbook in digital form, hosted on Fluxline and readable alongside the book.',
      },
    ],
  },
  {
    group: 'Bundles',
    items: [
      {
        name: 'Hardcover + Workbook',
        body: 'The hardcover book and the softcover workbook, printed and shipped together.',
      },
      {
        name: 'Softcover + Workbook',
        body: 'The softcover book and the softcover workbook, printed and shipped together.',
      },
      {
        name: 'eBooks Together',
        body: 'The book eBook and the workbook eBook as one digital bundle, with instant access to both.',
      },
    ],
  },
  {
    group: 'Beyond the book',
    items: [
      {
        name: 'Individual lessons',
        body: 'Standalone lessons that go deeper on a single part of the framework. Offered pay-what-you-can — you choose the amount.',
      },
      {
        name: 'Lesson bundles',
        body: 'Curated sets of lessons grouped by topic, also pay-what-you-can.',
      },
      {
        name: 'Membership',
        body: 'Full access to every lesson and all supporting content, monthly or annually. Cancel anytime.',
      },
    ],
  },
];
