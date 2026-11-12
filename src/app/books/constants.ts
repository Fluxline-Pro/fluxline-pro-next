/**
 * Book-specific content for `/books`.
 *
 * The framework itself is described in `src/lib/resonanceCore.ts` and explained
 * at `/resonance-core`; this file only covers the publications built on it.
 *
 * Purchase lives on store.fluxline.pro. The one pre-order figure the site
 * quotes is in `src/lib/fluxlineStory.ts` (`BOOK_PREORDER`); nothing here
 * describes prices or checkout. The offerings below mirror what the store
 * sells at pre-order (digital editions; print and Kindle are sold elsewhere),
 * per fluxline-pro-storefront-app `src/lib/catalog/catalog.ts`.
 */

import { getStorefrontUrl } from '@/lib/integrations/config';

/** Where purchase happens. */
export const STOREFRONT_URL = getStorefrontUrl();

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
  'The book and companion workbook that put The Resonance Core Framework™ in your hands. Both are in final production, and digital editions are available for pre-order.';

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
        name: 'eBook',
        body: 'The full framework as a PDF and EPUB, delivered to your Fluxline account library and by email on release day.',
      },
      {
        name: 'Audiobook',
        body: 'The complete book in MP3, narrated by the author.',
      },
      {
        name: 'Print',
        body: 'Hardcover and softcover editions follow the digital release.',
        note: 'Sold through Amazon and bookstores.',
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
        name: 'Workbook PDF',
        body: 'Self-assessments, guided exercises, reflection prompts, action plans, and progress tracking, readable alongside the book.',
      },
      {
        name: 'Print workbook',
        body: 'A softcover edition built to be written in, following the print volumes.',
        note: 'Sold through Amazon and bookstores.',
      },
    ],
  },
  {
    group: 'Bundles',
    items: [
      {
        name: 'eBook + Workbook',
        body: 'The eBook and the Workbook PDF as one digital bundle.',
      },
      {
        name: 'Complete Bundle',
        body: 'The eBook, the Audiobook, and the Workbook PDF together.',
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
