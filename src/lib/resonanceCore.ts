/**
 * The Resonance Core Framework™ — canonical content.
 *
 * Shared by three surfaces that each say something different about the same
 * thing, so they stay consistent:
 *
 *   /resonance-core-framework  the framework itself — what it is, how it
 *                              works, who it's for, how to work with it, FAQ
 *   /books                     the book and workbook built on it
 *   /                          a brief home-page explainer that points at both
 *
 * The paid engagement lives separately at /services/resonance-core. This module
 * describes the framework, not the service.
 */

export const RCF_TRADEMARK = 'The Resonance Core Framework™';

/** Public introduction preview, already published as a scroll PDF. */
export const RCF_PREVIEW_PDF =
  '/scrolls/pdfs/resonance-core-framework-preview-terence-waters.pdf';

export const RCF_LOGO_IMAGE = '/images/RCF_Logo.jpeg';
export const RCF_BOOK_IMAGE = '/images/RCF_BookConcept.jpg';

/**
 * The book's release window. Always pair it with "targeted" ("targeted for
 * Q1 2027") and never name a month for the launch itself.
 */
export const RCF_RELEASE_WINDOW = 'Q1 2027';

/**
 * Pre-orders for the digital editions are open on the Fluxline Store (owner,
 * 2026-11-11; store launch 2026-11-20). The store URL and the one quoted
 * price live in `src/lib/fluxlineStory.ts` (`BOOK_PREORDER`).
 */
export const RCF_PREORDER_STATUS = 'Pre-orders are open on the Fluxline Store';

/** The one-sentence version, for the home page and card summaries. */
export const RCF_ONE_LINER =
  'A practical system for making change that holds, built on alignment rather than force.';

/**
 * The short explanation, used on /books. Two short paragraphs: the problem,
 * then the premise. Anything longer belongs on /resonance-core-framework.
 */
export const RCF_BRIEF: string[] = [
  'Most self-help tells you what to do, but not how to do it. So the cycle runs inspiration, motivation, confusion, inaction, and then another book. The change never sets, because it was never built on anything structural.',
  'The Resonance Core Framework™ starts somewhere else: people make their best decisions when they act in alignment with who they actually are. Resonance is the felt sense of coherence between your identity, values, emotions, and lived behavior. When it is present, effort compounds. When it is absent, discipline has to carry the whole load, and eventually it drops it.',
];

/** The Resonant Identity Podcast — an extension of the framework. */
export const PODCAST_BLURB =
  'The Resonant Identity is the framework thinking out loud. Each episode works through identity architecture, self-improvement, and the practical business of navigating transitions with clarity — the same material the book systematises, explored in conversation rather than in structure. If you want to know how the framework sounds before you read how it works, start there.';

/** The framework's page (the former /resonance-core explainer redirects here). */
export const RCF_FRAMEWORK_PATH = '/resonance-core-framework';

/** Where every "Be notified at launch" link goes (the TRI Newsletter signup). */
export const RCF_NOTIFY_PATH = '/resonance-core-framework#notify';

/** Sister sites in the RCF ecosystem. */
export const TRI_SITE_URL = 'https://theresonantidentity.com';
/** The podcast's front door for new listeners. */
export const TRI_START_HERE_URL = 'https://theresonantidentity.com/start-here/';
export const TRI_FRAMEWORK_URL = 'https://theresonantidentity.com/framework/';
export const TW_SITE_URL = 'https://terencewaters.com';
export const TW_ABOUT_URL = 'https://terencewaters.com/about/';
export const TW_FRAMEWORK_URL =
  'https://terencewaters.com/resonance-core-framework';

/**
 * Canonical RCF paragraph — the same core sentence appears on
 * theresonantidentity.com and terencewaters.com, each with its own close.
 * Keeping the language consistent across the three sites reinforces topical
 * authority for search engines and AI systems.
 */
export const RCF_CANONICAL_PARAGRAPH =
  'The Resonance Core Framework™ is a structured identity system built on the principle that sustainable change requires alignment, not force. Developed by Terence Waters through Fluxline Resonance Group, the RCF maps three dimensions of identity (inner signal, outward expression, and systemic impact) and provides named conceptual tools: Behavioral Gravity, Identity Coherence, the Window of Choice, the DRIVE Model, and The Decision Integrity Index (The DII). Delivered through coaching and consulting at Fluxline, it is also the foundation of The Resonant Identity podcast and the forthcoming book.';

/**
 * The three dimensions of identity the framework maps. Each is one Part of
 * the book: The Self, The Outward Reach, Systemic Architecture & Legacy.
 */
export const RCF_RINGS: { part: string; title: string; body: string }[] = [
  {
    part: 'Part I',
    title: 'The Self',
    body: 'The inner signal. Who you are beneath roles, pressure, and performance.',
  },
  {
    part: 'Part II',
    title: 'The Outward Reach',
    body: 'Expression. How your identity shows up in relationships, work, and decisions.',
  },
  {
    part: 'Part III',
    title: 'Systemic Architecture & Legacy',
    body: 'Impact. How your identity shapes the teams and systems you build.',
  },
];

/**
 * Named concepts — the canonical definitions. This page is the RCF's single
 * source of truth: theresonantidentity.com/framework and
 * terencewaters.com/resonance-core-framework show short summaries and link
 * here (by these `id` anchors) for more. Don't rename an `id` without
 * updating those links.
 */
export const RCF_CONCEPTS: {
  id: string;
  name: string;
  /** One-line summary, reused by the other sites. */
  summary: string;
  body: string;
}[] = [
  {
    id: 'behavioral-gravity',
    name: 'Behavioral Gravity',
    summary:
      'The pull a steady, regulated person has on the people around them, drawing others toward calm, presence, and clarity through how they show up.',
    body: 'The pull a steady, regulated person has on the people around them, drawing others toward calm, presence, and clarity through how they show up.',
  },
  {
    id: 'identity-coherence',
    name: 'Identity Coherence',
    summary: 'When your values, expression, and behavior agree.',
    body: 'The state in which your inner values, outer expression, and behavioral patterns are in agreement. It is alignment, not perfection. When you are coherent, decisions get simpler, because who you are and how you live point the same way.',
  },
  {
    id: 'window-of-choice',
    name: 'Window of Choice',
    summary:
      'The space between a trigger and your response where a conscious, identity-aligned choice becomes possible.',
    body: 'The range of choices you can actually see and act on in any moment. It widens with presence and clarity and narrows under stress. That matters most at threshold moments, when you can respond from who you are now rather than react from who you used to be. The work is keeping it wide through grounding, presence, and emotional intelligence.',
  },
  {
    id: 'drive-system',
    name: 'The DRIVE Model',
    summary:
      'Six stages (Spark, Coherence, Activation, Momentum, Endurance, Embodiment) that carry a DRIVE from first spark to lived identity.',
    body: 'The motivation architecture of the RCF: how identity-rooted goals become self-sustaining rather than dependent on willpower. Instead of pushing yourself toward a goal, DRIVE connects the goal to who you are, so small wins compound into momentum.',
  },
  {
    id: 'identity-distortion-loop',
    name: 'Judgment Loop',
    summary:
      'The cycle where judgments about yourself and others reinforce a distorted view of identity.',
    body: 'The cycle where judgments about yourself and others reinforce a distorted view of identity. It runs Dissonance Spike → Reactance → Confirmation Bias → Distorted Alignment → Identity Erosion. Each step feels reasonable in the moment, which is what makes the loop hard to see from the inside.',
  },
  {
    id: 'identity-alignment-loop',
    name: 'Data Loop',
    summary:
      'The practice of treating Cues as information: notice them, trace where they come from, test whether they are true, then decide.',
    body: 'The counterpart to the Judgment Loop. The practice of treating Cues as information: notice them, trace where they come from, test whether they are true, then decide. Each honest, identity-rooted choice makes the next one easier.',
  },
  {
    id: 'dii-protocol',
    name: 'The Decision Integrity Index (The DII)',
    summary:
      "The RCF's way of checking whether a decision lines up with your identity and values.",
    body: "The RCF's way of checking whether a decision lines up with your identity and values. It is anchored to six core values: Embodied Awareness, Modular Precision, Resilient Alignment, Somatic Discipline, Creative Truth, and Strategic Innovation. Its scores are personal markers, never grades.",
  },
  {
    id: 'decision-alignment-score',
    name: 'Decision Alignment Score (DAS)',
    summary: 'The score a single decision earns inside The DII.',
    body: 'The score a single decision earns inside The DII. It draws on three sub-scores: Self-State Integrity (SSI), Emotional Return on Investment (EROI), and System Impact / Shadow Index (SI). The book covers how each is scored.',
  },
];

/** A question and answer, with an optional plain list under the answer. */
export interface RcfFaqItem {
  question: string;
  answer: string;
  points?: string[];
}

/**
 * Plain-language FAQ: what the framework is, who it is for, how it differs,
 * where it came from, how it ties to the services, and the book. Rendered as
 * H3s and as FAQPage structured data. Term definitions live in RCF_CONCEPTS,
 * so they are not repeated here.
 */
export const RCF_FAQ: RcfFaqItem[] = [
  {
    question: 'What is The Resonance Core Framework™?',
    answer:
      'A practical system for making change that holds, built on alignment rather than force. It helps you get clear on who you are, then check your decisions against that identity.',
  },
  {
    question: 'Who is the RCF designed for?',
    answer:
      'Businesses, solopreneurs, and individuals: founders, leaders, creatives, and anyone seeking lasting change or clearer decisions.',
  },
  {
    question:
      'How is the RCF different from other coaching or identity frameworks?',
    answer:
      'The RCF offers tools to understand your patterns, test decisions against your values, and track alignment over time. It is a decision and identity framework, not therapy.',
  },
  {
    question: 'How was the RCF developed, and what is it built from?',
    answer:
      'Terence Waters developed the framework while building Fluxline, applying each idea to his own decisions, habits, and work with clients. It draws on six foundations:',
    points: [
      "The RCF's Universal Truths, which shape Fluxline's ethos and mission",
      'Psychological research',
      'Behavioral patterns',
      'Systems thinking',
      'Personal experimentation',
      'Real-world application',
    ],
  },
  {
    question: "How does the RCF connect to Fluxline's services?",
    answer:
      'Every Fluxline service applies the framework to a different part of your life or business: coaching applies it to you, business strategy to your decisions and operations, brand design and web development to how your identity shows up, and personal training to the body.',
  },
  {
    question: 'When is the book available?',
    answer:
      'The book is targeted for Q1 2027. Digital editions are available for pre-order on the Fluxline Store.',
  },
];

/** The FAQ answer as one plain string (answer plus any list), for JSON-LD. */
export function rcfFaqAnswerText(item: RcfFaqItem): string {
  if (!item.points?.length) return item.answer;
  return `${item.answer} ${item.points.join('; ')}.`;
}
