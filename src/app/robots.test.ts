/**
 * Guards robots.txt: production names the search and AI crawlers in one allow
 * group that repeats the `*` disallows, and dev/test still blocks everything.
 */
import type { MetadataRoute } from 'next';

const ORIGINAL_ENV = process.env.NEXT_PUBLIC_ENVIRONMENT;

function loadRobots(environment: string): MetadataRoute.Robots {
  process.env.NEXT_PUBLIC_ENVIRONMENT = environment;
  let result: MetadataRoute.Robots | undefined;
  jest.isolateModules(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const robots = require('./robots').default as () => MetadataRoute.Robots;
    result = robots();
  });
  return result as MetadataRoute.Robots;
}

type Rule = {
  userAgent?: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
};

afterEach(() => {
  process.env.NEXT_PUBLIC_ENVIRONMENT = ORIGINAL_ENV;
});

describe('robots', () => {
  it('blocks every crawler outside production', () => {
    for (const env of ['dev', 'test']) {
      expect(loadRobots(env)).toEqual({
        rules: [{ userAgent: '*', disallow: '/' }],
      });
    }
  });

  describe('production', () => {
    const robots = () => loadRobots('prod');
    const rules = () => robots().rules as Rule[];

    it('names the search and AI crawlers in one allow group', () => {
      const named = rules().filter((r) => Array.isArray(r.userAgent));
      expect(named).toHaveLength(1);
      expect(named[0].userAgent).toEqual(
        expect.arrayContaining([
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-SearchBot',
          'Claude-User',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Googlebot',
          'Google-Extended',
          'Bingbot',
          'Applebot',
          'Applebot-Extended',
          'Amazonbot',
          'Meta-ExternalAgent',
          'DuckDuckBot',
          'DuckAssistBot',
          'MistralAI-User',
          'CCBot',
        ])
      );
    });

    it('repeats the * disallows in the named group', () => {
      const [wildcard, named] = rules();
      expect(wildcard.userAgent).toBe('*');
      expect(named.disallow).toEqual(wildcard.disallow);
      expect(named.allow).toBe('/');
    });

    it('keeps Next.js assets crawlable so pages can render', () => {
      for (const rule of rules()) {
        const disallow = ([] as string[]).concat(rule.disallow ?? []);
        expect(disallow).not.toContain('/_next/');
        expect(disallow).not.toContain('/static/');
      }
    });

    it('points at the sitemap', () => {
      expect(robots().sitemap).toBe('https://www.fluxline.pro/sitemap.xml');
    });
  });
});
