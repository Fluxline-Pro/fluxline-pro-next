import { slugify, buildSlugMap, resolveSlug } from './slug';

describe('slugify', () => {
  it('lowercases and hyphenates spaces', () => {
    expect(slugify('Personal Growth')).toBe('personal-growth');
  });

  it('collapses runs of whitespace into a single hyphen', () => {
    expect(slugify('Personal   Growth')).toBe('personal-growth');
  });

  it('trims leading and trailing whitespace', () => {
    expect(slugify('  Personal Growth  ')).toBe('personal-growth');
  });

  it('strips diacritics', () => {
    expect(slugify('Résumé Tips')).toBe('resume-tips');
    expect(slugify('Über Alles')).toBe('uber-alles');
  });

  it('collapses punctuation into single hyphens', () => {
    expect(slugify('UI/UX')).toBe('ui-ux');
    expect(slugify('Health & Wellness')).toBe('health-wellness');
    expect(slugify('C# / .NET')).toBe('c-net');
    expect(slugify('Next.js')).toBe('next-js');
    expect(slugify('SPFx (SharePoint Framework)')).toBe(
      'spfx-sharepoint-framework'
    );
  });

  it('never emits leading or trailing hyphens', () => {
    expect(slugify('...Leading')).toBe('leading');
    expect(slugify('Trailing!!!')).toBe('trailing');
    expect(slugify('  &  Both  &  ')).toBe('both');
  });

  it('preserves digits', () => {
    expect(slugify('Next.js 16')).toBe('next-js-16');
    expect(slugify('Microsoft 365')).toBe('microsoft-365');
  });

  it('is idempotent — slugifying a slug returns the same slug', () => {
    const inputs = [
      'Personal Growth',
      'UI/UX',
      'C# / .NET',
      'Next.js 16',
      'Résumé Tips',
    ];
    for (const input of inputs) {
      const once = slugify(input);
      expect(slugify(once)).toBe(once);
    }
  });

  it('returns an empty string when no alphanumerics survive', () => {
    expect(slugify('///')).toBe('');
    expect(slugify('   ')).toBe('');
  });
});

describe('buildSlugMap', () => {
  it('maps each slug back to its display name', () => {
    const map = buildSlugMap(['Personal Growth', 'UI/UX']);
    expect(map.get('personal-growth')).toBe('Personal Growth');
    expect(map.get('ui-ux')).toBe('UI/UX');
  });

  it('tolerates the same display name appearing twice', () => {
    expect(() => buildSlugMap(['Design', 'Design'])).not.toThrow();
    expect(buildSlugMap(['Design', 'Design']).size).toBe(1);
  });

  it('throws on a collision between two distinct display names', () => {
    expect(() => buildSlugMap(['AI/ML', 'AI ML'])).toThrow(/Slug collision/);
    expect(() => buildSlugMap(['AI/ML', 'AI ML'])).toThrow(/ai-ml/);
  });

  it('names both colliding terms in the error message', () => {
    expect(() => buildSlugMap(['AI/ML', 'AI ML'])).toThrow(/"AI\/ML"/);
    expect(() => buildSlugMap(['AI/ML', 'AI ML'])).toThrow(/"AI ML"/);
  });

  it('throws when a term produces an empty slug', () => {
    expect(() => buildSlugMap(['///'])).toThrow(/empty slug/);
    expect(() => buildSlugMap(['///'])).toThrow(/"\/\/\/"/);
  });

  it('treats case-only differences as a collision', () => {
    expect(() => buildSlugMap(['Design', 'design'])).toThrow(/Slug collision/);
  });
});

describe('resolveSlug', () => {
  const names = ['Personal Growth', 'Health & Wellness', 'Next.js'];

  it('resolves a slug to its display name', () => {
    expect(resolveSlug('personal-growth', names)).toBe('Personal Growth');
    expect(resolveSlug('health-wellness', names)).toBe('Health & Wellness');
    expect(resolveSlug('next-js', names)).toBe('Next.js');
  });

  it('returns undefined for an unknown slug', () => {
    expect(resolveSlug('nope', names)).toBeUndefined();
  });

  it('does not resolve a display name passed in place of a slug', () => {
    expect(resolveSlug('Personal Growth', names)).toBeUndefined();
  });
});
