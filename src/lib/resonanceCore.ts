/**
 * The Resonance Core Framework™ — canonical content.
 *
 * Shared by three surfaces that each say something different about the same
 * thing, so they stay consistent:
 *
 *   /resonance-core  the framework itself — what it is, how it works, who it's for
 *   /books           the book and workbook built on it (see src/app/books/constants)
 *   /                a brief home-page explainer that points at both
 *
 * The paid engagement lives separately at /services/resonance-core. This module
 * describes the framework, not the service.
 */

export const RCF_TRADEMARK = 'The Resonance Core Framework™';

/** Public introduction preview, already published as a scroll PDF. */
export const RCF_PREVIEW_PDF =
  '/scrolls/pdfs/RCF_INTRODUCTIONTeaser_02042026.pdf';

export const RCF_LOGO_IMAGE = '/images/RCF_Logo.jpeg';
export const RCF_BOOK_IMAGE = '/images/RCF_BookConcept.jpg';

export const RCF_RELEASE_WINDOW = 'Late Fall 2026';

/** The one-sentence version, for the home page and card summaries. */
export const RCF_ONE_LINER =
  'A practical system for making change that holds — built on alignment rather than force.';

/**
 * The short explanation, for the home page. Two short paragraphs: the problem,
 * then the premise. Anything longer belongs on /resonance-core.
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
    heading: 'The problem it was built to solve',
    body: 'Most self-help tells you what to do, but not how to do it. The result is a cycle most of us know: inspiration, temporary motivation, confusion, inaction — then another book, another podcast, another fix. The change never sets, because it was never built on anything structural.',
  },
  {
    heading: 'The premise',
    body: 'People make their best decisions when they act in alignment with who they are. Not who they were told to be, and not who they think they should be — who they actually are, across identity, values, emotion, logic, and lived experience. Resonance is the felt sense of coherence between those layers. When it is present, decisions get easier and effort compounds. When it is absent, discipline alone has to carry the whole load, and eventually it drops it.',
  },
  {
    heading: 'What the framework does',
    body: 'The Resonance Core Framework™ turns that premise into something you can actually run. It gives you language for what you are experiencing, a repeatable method for testing decisions against your values, and scorecards for tracking alignment over time — so change becomes measurable instead of aspirational. It draws on universal human truths, psychological research, behavioral patterns, and systems thinking, and every part of it was tested in practice before it was written down.',
  },
  {
    heading: 'Where it came from',
    body: 'The framework did not begin as a business initiative. It began as a necessity — built while leaving a six-figure job to found Fluxline, and refined daily through journaling, decision tracking, and pattern observation until the system held under real pressure. It is documented experience first and theory second.',
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
