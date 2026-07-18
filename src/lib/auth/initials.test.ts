import { getInitials } from './initials';

describe('getInitials', () => {
  it('uses first and last name initials', () => {
    expect(getInitials('Terence Waters')).toBe('TW');
  });

  it('uses first and last of multi-part names', () => {
    expect(getInitials('Mary Jane van der Berg')).toBe('MB');
  });

  it('uses first two letters of a single name', () => {
    expect(getInitials('Terence')).toBe('TE');
  });

  it('trims and collapses whitespace', () => {
    expect(getInitials('  Terence   Waters  ')).toBe('TW');
  });

  it('strips punctuation from name parts', () => {
    expect(getInitials("(Terence) [Waters]")).toBe('TW');
  });

  it('falls back to email local part when name is missing', () => {
    expect(getInitials(undefined, 'terence@fluxline.pro')).toBe('TE');
    expect(getInitials('', 'a@b.com')).toBe('A');
  });

  it('treats an email-shaped display name as an email', () => {
    expect(getInitials('terence@fluxline.pro')).toBe('TE');
  });

  it('ignores punctuation in the email local part', () => {
    expect(getInitials(null, 't.waters@fluxline.pro')).toBe('TW');
  });

  it('supports non-latin letters', () => {
    expect(getInitials('Ægir Þór')).toBe('ÆÞ');
  });

  it('returns a placeholder when nothing usable is provided', () => {
    expect(getInitials()).toBe('?');
    expect(getInitials('', '')).toBe('?');
    expect(getInitials('   ', null)).toBe('?');
    expect(getInitials('!!!', '@')).toBe('?');
  });
});
