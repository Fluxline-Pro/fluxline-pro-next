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

export const RCF_RELEASE_WINDOW = 'Late Fall 2026';

/** The one-sentence version, for the home page and card summaries. */
export const RCF_ONE_LINER =
  'A practical system for making change that holds — built on alignment rather than force.';

/**
 * The short explanation, for the home page. Two short paragraphs: the problem,
 * then the premise. Anything longer belongs on /resonance-core-framework.
 */
export const RCF_BRIEF: string[] = [
  'Most self-help tells you what to do, but not how to do it — so the cycle runs inspiration, motivation, confusion, inaction, and then another book. The change never sets, because it was never built on anything structural.',
  'The Resonance Core Framework™ starts somewhere else: people make their best decisions when they act in alignment with who they actually are. Resonance is the felt sense of coherence between your identity, values, emotions, and lived behavior. When it is present, effort compounds. When it is absent, discipline has to carry the whole load — and eventually it drops it.',
];

/**
 * The full explainer. This is the copy Terence points people at when they ask
 * what the framework actually is.
 */
export const RCF_EXPLAINER: { heading: string; body: string }[] = [
  {
    heading: 'The problem it solves',
    body: 'Most self-help tells you what to do, but not how. You get the familiar cycle: inspiration, motivation, confusion, inaction — then another book. The change never sets, because nothing structural was holding it up.',
  },
  {
    heading: 'The idea it rests on',
    body: 'You decide best when you act as who you actually are — not who you were told to be. Resonance is the felt coherence between your identity, values, emotion, logic, and experience. With it, effort compounds. Without it, discipline carries the whole load, and eventually drops it.',
  },
  {
    heading: 'What it does',
    body: 'The framework turns this idea into something you can run. You get language for what you are experiencing, a repeatable way to test decisions against your values, and scorecards that track alignment over time. Change becomes measurable instead of aspirational.',
  },
  {
    heading: 'Where it came from',
    body: "Not a business initiative — a necessity. It was built while Fluxline's owner left a six-figure job to found Fluxline, then refined daily through journaling, decision tracking, and pattern observation until it held under real pressure. Documented experience first, theory second.",
  },
];

/** What the framework rests on — the inputs it was assembled from. */
export const RCF_FOUNDATIONS: string[] = [
  'Universal human truths',
  'Psychological research',
  'Behavioral patterns',
  'Systems thinking',
  'Personal experimentation',
  'Real-world application',
];

/** The DRIVE Model — the operating sequence at the centre of the framework. */
export const DRIVE_STEPS: { step: string; title: string; body: string }[] = [
  {
    step: 'Spark',
    title: 'Sparking curiosity',
    body: 'Notice the pull before you rationalise it. The first signal of a real DRIVE is interest that arrives unprompted.',
  },
  {
    step: 'Coherence',
    title: 'Testing viability',
    body: 'Run the spark against your values, capacity, and context. Coherence is where most goals quietly fail — and where the framework catches them.',
  },
  {
    step: 'Activation',
    title: 'Initiating the loop',
    body: 'Commit to the smallest honest action and start the DRIVE Alignment Loop: act, observe, re-test against values, adjust.',
  },
  {
    step: 'Momentum',
    title: 'Compounding identity',
    body: 'Repeated aligned action stops being something you do and starts being someone you are. Momentum is identity accruing interest.',
  },
  {
    step: 'Endurance',
    title: 'Sustaining the DRIVE',
    body: 'Build the structures that carry the DRIVE through low-energy seasons, so continuity does not depend on motivation.',
  },
  {
    step: 'Expansion',
    title: 'Identity evolution',
    body: 'Integrate the DRIVE into the wider system of your life, and let it change what the next spark is even capable of being.',
  },
];

/** Who the framework is for — used as a plain list. */
export const RCF_AUDIENCE: string[] = [
  'You want to make meaningful change and it keeps not sticking',
  'You feel stuck, or misaligned between who you are and how you show up',
  'You sense real potential but lack direction to point it at',
  'You want clarity in your decisions, not just more information',
  'You want to understand your own patterns more deeply',
  'You want a system you can actually apply, and keep applying',
];

/** The Resonant Identity Podcast — an extension of the framework. */
export const PODCAST_BLURB =
  'The Resonant Identity is the framework thinking out loud. Each episode works through identity architecture, self-improvement, and the practical business of navigating transitions with clarity — the same material the book systematises, explored in conversation rather than in structure. If you want to know how the framework sounds before you read how it works, start there.';

/** The framework's page (the former /resonance-core explainer redirects here). */
export const RCF_FRAMEWORK_PATH = '/resonance-core-framework';

/** Sister sites in the RCF ecosystem. */
export const TRI_SITE_URL = 'https://theresonantidentity.com';
export const TRI_FRAMEWORK_URL = 'https://theresonantidentity.com/framework/';
export const TW_SITE_URL = 'https://terencewaters.com';
export const TW_FRAMEWORK_URL =
  'https://terencewaters.com/resonance-core-framework';

/**
 * Canonical RCF paragraph — the same core sentence appears on
 * theresonantidentity.com and terencewaters.com, each with its own close.
 * Keeping the language consistent across the three sites reinforces topical
 * authority for search engines and AI systems.
 */
export const RCF_CANONICAL_PARAGRAPH =
  'The Resonance Core Framework™ is a structured identity system built on the principle that sustainable change requires alignment, not force. Developed by Terence Waters through Fluxline Resonance Group, the RCF maps three dimensions of identity — inner signal, outward expression, and systemic impact — and provides named conceptual tools: Behavioral Gravity, Identity Coherence, the Window of Choice, the DRIVE System, Creative Truth, and the DII Protocol. Delivered through coaching and consulting at Fluxline, it is also the foundation of The Resonant Identity podcast and the forthcoming book.';

/** The three dimensions (rings) of identity the framework maps. */
export const RCF_RINGS: { title: string; body: string }[] = [
  {
    title: 'Inward — the inner signal',
    body: 'The part of you that stays steady beneath roles, pressure, and performance. This is the identity you return to, not the one you perform.',
  },
  {
    title: 'Outward — expression',
    body: 'How that identity shows up in relationships, work, and decisions — where alignment and dissonance become visible.',
  },
  {
    title: 'Systemic — impact',
    body: 'How your identity scales into the teams, systems, and environments you build, so your impact reflects who you are.',
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
      "The unconscious pull toward what feels identity-consistent — even when it no longer fits who you're becoming.",
    body: "The unconscious pull toward behaviors, environments, and relationships that feel identity-consistent — even when they're no longer aligned with who you're becoming. It's why old habits feel like home and new ones feel like effort. Naming the pull is the first step to choosing whether to follow it.",
  },
  {
    id: 'identity-coherence',
    name: 'Identity Coherence',
    summary:
      'When your values, expression, and behavior agree. Not perfection — alignment.',
    body: 'The state in which your inner values, outer expression, and behavioral patterns are in agreement. Not perfection — alignment. When you are coherent, decisions get simpler, because who you are and how you live point the same way.',
  },
  {
    id: 'window-of-choice',
    name: 'Window of Choice',
    summary:
      'The range of choices you can see and act on — wide when present, narrow under stress.',
    body: 'The range of choices you can actually see and act on in any moment. It widens with presence and clarity and narrows under stress — which matters most at threshold moments, when you can respond from who you are now rather than react from who you used to be. The work is keeping it wide through grounding, presence, and emotional intelligence.',
  },
  {
    id: 'drive-system',
    name: 'The DRIVE System',
    summary:
      'How identity-rooted goals become self-sustaining instead of running on willpower.',
    body: 'The motivation architecture of the RCF: how identity-rooted goals become self-sustaining rather than dependent on willpower. Instead of pushing yourself toward a goal, DRIVE connects the goal to who you are, so small wins compound into momentum.',
  },
  {
    id: 'identity-distortion-loop',
    name: 'Identity Distortion Loop',
    summary: 'The cycle that erodes coherence. In the book: The Judgment Loop.',
    body: 'The cycle that erodes identity coherence: Dissonance Spike → Reactance → Confirmation Bias → Distorted Alignment → Identity Erosion. Each step feels reasonable in the moment, which is what makes the loop hard to see from the inside. In the book, this is called The Judgment Loop.',
  },
  {
    id: 'identity-alignment-loop',
    name: 'Identity Alignment Loop',
    summary: 'The cycle that rebuilds coherence. In the book: The Data Loop.',
    body: 'The counterpart to the Distortion Loop. Instead of reacting to a cue, you observe it, understand where it comes from, check whether it is valid, and then decide from a wider Window of Choice. Each honest, identity-rooted choice makes the next one easier. In the book, this is called The Data Loop.',
  },
  {
    id: 'creative-truth',
    name: 'Creative Truth',
    summary:
      'Expressing your truth without needing others to receive or confirm it.',
    body: "Expressing your inner truth without requiring others to receive or confirm it — the highest form of Identity Coherence in outward expression. It's speaking and creating from who you are, not from a need for approval.",
  },
  {
    id: 'dii-protocol',
    name: 'DII Protocol (Decision Integrity Index)',
    summary: 'A 1–5 way to score how well a decision aligns with who you are.',
    body: 'A structured way to score how well a decision aligns with your identity. It starts simply: journal a key decision, score it from 1 to 5, and justify the score honestly. Scores are anchored to six core values — Embodied Awareness, Modular Precision, Resilient Alignment, Somatic Discipline, Creative Truth, and Strategic Innovation — and are personal markers, never grades.',
  },
  {
    id: 'decision-alignment-score',
    name: 'Decision Alignment Score (DAS)',
    summary:
      'The DII’s composite view of a decision, from SSI, EROI, and the Shadow Index.',
    body: 'The composite result of the DII Protocol, drawing on three sub-scores — SSI (Self-State Integrity), EROI (Emotional Return on Investment), and the Shadow Index — for a single view of a decision’s alignment. The book covers how each is scored.',
  },
];

/** Plain-language FAQ. Rendered as H3s and as FAQPage structured data. */
export const RCF_FAQ: { question: string; answer: string }[] = [
  {
    question: 'What is the Resonance Core Framework?',
    answer:
      'The Resonance Core Framework™ (RCF) is a structured identity system created by Terence Waters. It helps you make change that holds by aligning your decisions with who you actually are, rather than relying on willpower alone.',
  },
  {
    question:
      'How is the RCF different from other coaching or identity frameworks?',
    answer:
      'Most approaches tell you what to do. The RCF gives you named tools for how — language for what you are experiencing, a repeatable way to test decisions against your values, and scorecards that make alignment measurable over time.',
  },
  {
    question: 'What is Behavioral Gravity?',
    answer:
      "Behavioral Gravity is the unconscious pull toward behaviors, environments, and relationships that feel identity-consistent — even when they're no longer aligned with who you're becoming. Naming it is the first step to choosing whether to follow it.",
  },
  {
    question: 'What is the DII Protocol?',
    answer:
      'The DII Protocol (Decision Integrity Index) is the RCF’s method for scoring how aligned a decision is with your identity. Scores are anchored to six core values and roll up into a Decision Alignment Score (DAS). The full protocol is detailed in the forthcoming book.',
  },
  {
    question: 'Is the RCF research-backed?',
    answer:
      'The RCF is research-informed. It draws on psychological research, behavioral patterns, and systems thinking, and was refined through documented personal practice and real-world application.',
  },
  {
    question: 'Who is the RCF designed for?',
    answer:
      'Founders, leaders, and creatives — and anyone who wants meaningful change that sticks, feels misaligned between who they are and how they show up, or wants more clarity in their decisions.',
  },
];
