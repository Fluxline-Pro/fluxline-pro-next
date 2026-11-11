import {
  RESONANCE_CORE_SUMMARY,
  SERVICE_CATEGORIES,
} from '@/app/services/constants';
import { SERVICE_PRICING } from '@/app/services/pricing-data';
import {
  AUDIENCES,
  BOOK_PREORDER,
  ELEVATOR_PITCH,
  FLUXLINE_ONE_LINER,
  FOUNDER_LINE,
  HOW_IT_WORKS,
  PRICING_FAQ,
  SERVICE_STORIES,
} from './fluxlineStory';

/** Every dollar figure in a string, as a number ("$1,750+" -> 1750). */
function dollarFigures(text: string): number[] {
  return [...text.matchAll(/\$([\d,]+(?:\.\d{2})?)/g)].map((m) =>
    Number(m[1].replace(/,/g, ''))
  );
}

const allCopy: string[] = [
  ...ELEVATOR_PITCH,
  FLUXLINE_ONE_LINER,
  FOUNDER_LINE,
  ...HOW_IT_WORKS.flatMap((s) => [s.title, s.body]),
  ...AUDIENCES.flatMap((a) => [a.title, a.body, a.startLabel]),
  ...SERVICE_STORIES.flatMap((s) => [
    s.outcome,
    s.rcfTie,
    s.priceLabel,
    ...s.priceLines,
    s.priceNote ?? '',
  ]),
  ...BOOK_PREORDER.priceLines,
  BOOK_PREORDER.priceLabel,
  BOOK_PREORDER.priceNote,
  ...PRICING_FAQ.flatMap((f) => [f.question, f.answer]),
];

describe('fluxlineStory', () => {
  it('tells the story of exactly the five current offerings, RCF first', () => {
    expect(SERVICE_STORIES.map((s) => s.id)).toEqual([
      'resonance-core',
      'consulting',
      'design',
      'development',
      'personal-training',
    ]);
    expect(new Set(SERVICE_STORIES.map((s) => s.id))).toEqual(
      new Set(SERVICE_CATEGORIES.map((s) => s.id))
    );
  });

  it('points every audience at a real service', () => {
    for (const audience of AUDIENCES) {
      expect(
        SERVICE_CATEGORIES.some((s) => s.id === audience.startServiceId)
      ).toBe(true);
    }
  });

  it.each(['design', 'development', 'personal-training'])(
    'quotes only prices published in the %s tier table',
    (id) => {
      const story = SERVICE_STORIES.find((s) => s.id === id)!;
      const published = SERVICE_PRICING[id].tiers.flatMap((tier) =>
        dollarFigures(tier.monthlyRate)
      );
      const quoted = dollarFigures(
        [story.priceLabel, ...story.priceLines].join(' ')
      );
      expect(quoted.length).toBeGreaterThan(0);
      for (const figure of quoted) expect(published).toContain(figure);
      expect(story.fromPriceUsd).toBe(Math.min(...published));
    }
  );

  it('quotes the Identity in Motion price from the RCF service page', () => {
    const story = SERVICE_STORIES.find((s) => s.id === 'resonance-core')!;
    const published = dollarFigures(RESONANCE_CORE_SUMMARY);
    for (const figure of dollarFigures(story.priceLines.join(' '))) {
      expect(published).toContain(figure);
    }
    expect(story.fromPriceUsd).toBe(99);
  });

  it('shows no price for services priced by consultation', () => {
    const consulting = SERVICE_STORIES.find((s) => s.id === 'consulting')!;
    expect(consulting.fromPriceUsd).toBeUndefined();
    expect(consulting.priceLabel).toBe('By consultation');
    expect(dollarFigures(consulting.priceLines.join(' '))).toEqual([]);
  });

  it('sends the book pre-order to the store book page', () => {
    expect(BOOK_PREORDER.url).toMatch(/^https:\/\/[a-z0-9.-]+\/book$/);
  });

  it('follows the voice rules: no em dashes, exclamation points, or banned claims', () => {
    const banned =
      /\b(proven|research-backed|clinically|guaranteed?|unlock|leverage|supercharge|game-changing)\b/i;
    for (const line of allCopy) {
      expect(line).not.toMatch(/[—!]/);
      expect(line).not.toMatch(banned);
    }
  });

  it('marks The Resonance Core Framework with a trademark, never a registered mark', () => {
    const joined = allCopy.join(' ');
    expect(joined).toContain('The Resonance Core Framework™');
    expect(joined).not.toContain('®');
    expect(joined).not.toMatch(/Resonance Core Framework(?!™)/);
  });

  it('opens the elevator pitch with the one-line version', () => {
    expect(ELEVATOR_PITCH[0]).toBe(FLUXLINE_ONE_LINER);
  });

  it('keeps the elevator pitch to about sixty seconds read aloud', () => {
    const words = ELEVATOR_PITCH.join(' ').split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(90);
    expect(words).toBeLessThanOrEqual(160);
  });
});
