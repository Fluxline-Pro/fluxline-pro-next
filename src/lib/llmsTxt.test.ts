import { SERVICE_CATEGORIES } from '@/app/services/constants';
import { buildLlmsTxt } from './llmsTxt';

describe('llms.txt', () => {
  const text = buildLlmsTxt();

  it('opens with the site name and a one-paragraph summary', () => {
    const lines = text.split('\n');
    expect(lines[0]).toBe('# Fluxline Resonance Group');
    expect(lines[2].startsWith('> Fluxline helps businesses')).toBe(true);
  });

  it('lists every service with its page and a price line', () => {
    for (const service of SERVICE_CATEGORIES) {
      expect(text).toContain(`https://www.fluxline.pro${service.path}/`);
    }
    expect(text).toContain('Price: Starter: $800');
    expect(text).toContain('By consultation');
  });

  it('links pricing, the framework, the store, and the sister sites', () => {
    for (const url of [
      'https://www.fluxline.pro/pricing/',
      'https://www.fluxline.pro/resonance-core-framework/',
      'https://store.fluxline.pro/book',
      'https://theresonantidentity.com/start-here/',
      'https://terencewaters.com/',
    ]) {
      expect(text).toContain(url);
    }
  });

  it('never links a retired route', () => {
    expect(text).not.toMatch(
      /www\.fluxline\.pro\/(podcasts|videos|cue-cards|github|book|bookings|services\/scrolls)(\/|\)|$)/m
    );
  });

  it('carries no DII scale and no registered mark', () => {
    expect(text).not.toMatch(/1\s?(–|-|to)\s?5\b/);
    expect(text).not.toContain('®');
  });
});
