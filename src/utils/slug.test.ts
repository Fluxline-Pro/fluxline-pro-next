import { buildSlugMap, resolveSlug, slugify } from './slug';

describe('slugify', () => {
  it('normalizes spaces, case, and surrounding whitespace', () => {
    expect(slugify('  Personal   GROWTH  ')).toBe('personal-growth');
  });

  it('removes diacritics', () => {
    expect(slugify('Résumé Tips')).toBe('resume-tips');
  });

  it('normalizes punctuation to single hyphens', () => {
    expect(slugify('C# / .NET')).toBe('c-net');
  });

  it('normalizes ampersands consistently', () => {
    expect(slugify('R&D and Strategy')).toBe('r-d-and-strategy');
  });

  it('is idempotent for already slugged input', () => {
    const slug = slugify('Already-Slugged Input');
    expect(slugify(slug)).toBe(slug);
  });
});

describe('buildSlugMap', () => {
  it('builds a slug to display-name map', () => {
    expect(
      Array.from(buildSlugMap(['Personal Growth', 'C# Applications']).entries())
    ).toEqual([
      ['personal-growth', 'Personal Growth'],
      ['c-applications', 'C# Applications'],
    ]);
  });

  it('allows duplicate identical display names', () => {
    expect(buildSlugMap(['Personal Growth', 'Personal Growth']).get('personal-growth')).toBe(
      'Personal Growth'
    );
  });

  it('throws when slugify produces an empty slug', () => {
    expect(() => buildSlugMap(['!!!'])).toThrow(
      'slugify produced an empty slug for taxonomy term "!!!"'
    );
  });

  it('throws on slug collisions', () => {
    expect(() => buildSlugMap(['AI ML', 'AI/ML'])).toThrow(
      'Slug collision: "AI ML" and "AI/ML" both map to "ai-ml"'
    );
  });
});

describe('resolveSlug', () => {
  it('returns the display name for a slug', () => {
    expect(resolveSlug('personal-growth', ['Personal Growth'])).toBe(
      'Personal Growth'
    );
  });

  it('returns undefined for unknown slugs', () => {
    expect(resolveSlug('missing', ['Personal Growth'])).toBeUndefined();
  });
});
