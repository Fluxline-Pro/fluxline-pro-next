/**
 * The Fluxline story: one source for the 60-second version of what Fluxline
 * is, who it helps, how it works, and what each service costs to start.
 *
 * Read by the home page, /pricing, /services, /resonance-core-framework and
 * the generated /llms.txt, so a visitor (or a crawler) gets the same answer
 * wherever they land. Copy follows `.github/rcf-voice-core.md`: locked terms,
 * approved glosses, five offerings, no em dashes, no unsupported claims.
 *
 * Service names, paths and long-form copy stay in
 * `src/app/services/constants.ts`; this module only adds the short story
 * around them and is keyed by the same service ids.
 */

import { getStorefrontUrl } from '@/lib/integrations/config';

/** Fluxline in one sentence: the pitch's opening line and the home meta description. */
export const FLUXLINE_ONE_LINER =
  'Fluxline helps businesses, solopreneurs, and individuals get clear on who they are, then make informed decisions that fit.';

/** The elevator pitch. Four short paragraphs, about 60 seconds read aloud. */
export const ELEVATOR_PITCH: string[] = [
  FLUXLINE_ONE_LINER,
  'When what you value, what you decide, and what you build drift apart, everything takes more effort than it should. Fluxline closes that gap with The Resonance Core Framework™, a practical system for making change that holds, built on alignment rather than force.',
  'It works in three steps. First, identity: who you are and what you stand for. Then decisions: checked against that identity, using facts instead of reaction. Then structure: Fluxline builds the result into your strategy, your brand, your website, and your training.',
  'One framework, five services, one founder-led practice. The first consultation is free.',
];

/** Approved mission line (rcf-voice-core.md, section 3). */
export const FLUXLINE_MISSION_LINE =
  'Fluxline builds systems that work, brands that connect, and practices that last.';

/** How Fluxline works: identity, then decisions, then structure. */
export const HOW_IT_WORKS: { step: string; title: string; body: string }[] = [
  {
    step: '01',
    title: 'Find your identity',
    body: 'Name who you are, what you value, and what you stand for. For a business, that is the identity behind the brand, the offers, and the team.',
  },
  {
    step: '02',
    title: 'Make informed decisions',
    body: 'Check each decision against that identity, using facts instead of reaction. The RCF gives you the language and the tools.',
  },
  {
    step: '03',
    title: 'Build it in',
    body: 'Fluxline turns those decisions into structure: strategy and systems, brand, web, and training that match who you are.',
  },
];

/** Who Fluxline helps, and the service each audience usually starts with. */
export const AUDIENCES: {
  id: string;
  title: string;
  body: string;
  startServiceId: string;
  startLabel: string;
}[] = [
  {
    id: 'businesses',
    title: 'Businesses',
    body: 'For small and medium-sized teams whose strategy, brand, and daily operations pull in different directions. Fluxline aligns them around what the business stands for.',
    startServiceId: 'consulting',
    startLabel: 'Start with business strategy',
  },
  {
    id: 'solopreneurs',
    title: 'Solopreneurs',
    body: 'For when you are the business. Fluxline helps you build offers, a brand, and a website that sound like you and hold up as you grow.',
    startServiceId: 'design',
    startLabel: 'Start with brand design',
  },
  {
    id: 'individuals',
    title: 'Individuals',
    body: 'For when something feels off and you want change that holds. Fluxline works with you through RCF coaching and personal training.',
    startServiceId: 'resonance-core',
    startLabel: 'Start with RCF coaching',
  },
];

export interface ServiceStory {
  /** Matches `SERVICE_CATEGORIES[].id`. */
  id: string;
  /** What the client gets, in one line. */
  outcome: string;
  /** How this service applies The Resonance Core Framework™. */
  rcfTie: string;
  /** The short price shown on cards: a starting price or "By consultation". */
  priceLabel: string;
  /** Lowest published price in USD, when there is one (for structured data). */
  fromPriceUsd?: number;
  /** The fuller price lines shown on /pricing. */
  priceLines: string[];
  /** A short qualifier under the price lines on /pricing. */
  priceNote?: string;
}

/**
 * The five offerings (rcf-voice-core.md, decision 9), in the order /services
 * shows them: the RCF as the foundation, then strategy, brand, web, training.
 * Every figure here is published on the matching service page and comes from
 * `src/app/services/pricing-data.ts` or `RESONANCE_CORE_SUMMARY`;
 * `fluxlineStory.test.ts` fails if they drift.
 */
export const SERVICE_STORIES: ServiceStory[] = [
  {
    id: 'resonance-core',
    outcome:
      'One-to-one identity coaching. Understand your patterns and make decisions that fit who you are.',
    rcfTie: 'The framework itself, applied to you.',
    priceLabel: 'From $99',
    fromPriceUsd: 99,
    priceLines: [
      'Identity in Motion, a four-week guided program: $99',
      'One-to-one coaching: by consultation',
    ],
  },
  {
    id: 'consulting',
    outcome:
      'Offers, systems, and day-to-day operations aligned with what your business stands for.',
    rcfTie: 'The framework applied to your strategy, offers, and operations.',
    priceLabel: 'By consultation',
    priceLines: ['By consultation, scoped to your growth phase'],
  },
  {
    id: 'design',
    outcome:
      'A visual identity and user experience that look and feel like who you are.',
    rcfTie: 'Your identity, made visible.',
    priceLabel: 'From $800',
    fromPriceUsd: 800,
    priceLines: ['Starter: $800', 'Signature: $1,450', 'Premium: $2,700'],
    priceNote:
      'Additional services can be added for an extra fee. Rush delivery fees apply for expedited timelines.',
  },
  {
    id: 'development',
    outcome: 'Websites and web apps, from simple sites to full platforms.',
    rcfTie: 'Your identity, built into the systems people use.',
    priceLabel: 'From $1,750',
    fromPriceUsd: 1750,
    priceLines: [
      'Starter (Lean Launches): $1,750+',
      'Signature (Growth Phase): $3,500+',
      'Premium (Legacy Builders): $6,500+',
    ],
    priceNote:
      'Additional services can be added for an extra fee. Rush delivery fees apply for expedited timelines.',
  },
  {
    id: 'personal-training',
    outcome:
      'Strength and movement coaching that fits your body, your goals, and your life.',
    rcfTie:
      'Training works with the First Gate: your body and nervous system, where Cues start.',
    priceLabel: 'From $100 per session',
    fromPriceUsd: 100,
    priceLines: [
      'Single session: $100',
      'Online programs: starting at $225 per month',
      'Hybrid programs: starting at $350 per month',
    ],
    priceNote: 'Monthly program prices vary by term length.',
  },
];

export function getServiceStory(id: string): ServiceStory | undefined {
  return SERVICE_STORIES.find((s) => s.id === id);
}

/**
 * The RCF book pre-order. Purchase and current prices live on the Fluxline
 * Store, so the marketing site quotes one starting figure and links out.
 * Pre-order prices end 2027-01-15 (RCF Pre-order Terms); update this figure
 * when the regular prices replace them.
 */
export const BOOK_PREORDER = {
  /** The book's page on the Fluxline Store. */
  url: `${getStorefrontUrl()}/book`,
  priceLabel: 'eBook $34.99 at pre-order',
  fromPriceUsd: 34.99,
  priceLines: [
    'eBook: $34.99 at pre-order',
    'Audiobook, workbook, and bundles: see the Fluxline Store',
  ],
  priceNote:
    'Digital editions. Your card is charged when you pre-order. Print and Kindle editions will be sold through Amazon and bookstores.',
  termsPath: '/legal/preorder-terms',
} as const;

/** Plain questions about price, shown on /pricing and in its FAQ data. */
export const PRICING_FAQ: { question: string; answer: string }[] = [
  {
    question: 'Is the first consultation free?',
    answer:
      'Yes. Every engagement starts with a free consultation. Book it from the contact page.',
  },
  {
    question: 'Why do some services say "By consultation"?',
    answer:
      'Business strategy work and one-to-one RCF coaching are scoped to your situation, so the price is set after the free consultation.',
  },
  {
    question: 'Are the prices on this page fixed?',
    answer:
      'They are starting prices. Design and development packages can add services for an extra fee, rush delivery costs more, and monthly training programs vary by term length. Each service page lists what every tier includes.',
  },
  {
    question: 'Where do I buy the book?',
    answer:
      'Digital editions of The Resonance Core Framework™ are available for pre-order on the Fluxline Store. The book is targeted for Q1 2027.',
  },
];

/** The founder line (experience figures per rcf-voice-core.md, decision 3). */
export const FOUNDER_LINE =
  'Fluxline is founder-led by Terence Waters: 20+ years in design, development, architecture, and product management, and 3+ years in consulting.';
