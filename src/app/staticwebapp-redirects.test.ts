/**
 * Guards the retired-route redirects in staticwebapp.config.json.
 *
 * The matcher below follows the Azure Static Web Apps route rules
 * (https://learn.microsoft.com/azure/static-web-apps/configuration#routes):
 * - rules are evaluated in array order and the first match wins;
 * - matching is case-insensitive and ignores a trailing slash on exact routes
 *   (so `/x` covers `/x/`; listing both is rejected as a duplicate at deploy,
 *   see staticwebapp-config.test.ts);
 * - a wildcard is only supported at the end of the path, and `/x/*` does not
 *   match `/x` while `/x*` matches everything starting with `/x`;
 * - `*.{a,b}` filters a wildcard by file extension.
 */
import fs from 'fs';
import path from 'path';

interface Route {
  route: string;
  redirect?: string;
  statusCode?: number;
}

const config = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', '..', 'staticwebapp.config.json'),
    'utf8'
  )
) as { routes: Route[] };

const trim = (p: string) => p.toLowerCase().replace(/\/+$/, '') || '/';

function matches(pattern: string, requestPath: string): boolean {
  const star = pattern.indexOf('*');
  if (star === -1) return trim(pattern) === trim(requestPath);
  const prefix = pattern.slice(0, star);
  const filter = pattern.slice(star + 1);
  if (!requestPath.startsWith(prefix)) return false;
  if (!filter) return true;
  const exts = filter.startsWith('.{')
    ? filter
        .slice(2, -1)
        .split(',')
        .map((e) => `.${e}`)
    : [filter];
  return exts.some((e) => requestPath.endsWith(e));
}

function firstMatch(requestPath: string): Route | undefined {
  return config.routes.find((r) => matches(r.route, requestPath));
}

const RETIRED: Array<[string, string]> = [
  ['/podcasts', 'https://theresonantidentity.com/start-here/'],
  ['/videos', '/content/'],
  ['/cue-cards', '/resonance-core-framework/'],
  ['/github', '/portfolio/'],
  ['/book', '/contact/'],
  ['/services/scrolls', '/services/'],
  ['/services/scrolls/business-it-consulting', '/services/'],
  ['/bookings', '/contact/'],
];

describe('staticwebapp.config.json retired-route redirects', () => {
  it.each(RETIRED)(
    '%s redirects (301) with and without a trailing slash',
    (from, to) => {
      for (const requestPath of [from, `${from}/`]) {
        const rule = firstMatch(requestPath);
        expect(rule?.redirect).toBe(to);
        expect(rule?.statusCode).toBe(301);
      }
    }
  );

  it.each([
    '/books',
    '/books/',
    '/books/some-book/',
    '/videos/sample.mp4',
    '/videos/home/testimonial-placeholder.jpg',
    '/scrolls/pdfs/x.pdf',
    '/services/',
    '/services/consulting/',
    '/case-studies/',
    '/blog/',
    '/contact/',
  ])('%s is never redirected', (requestPath) => {
    expect(firstMatch(requestPath)?.redirect).toBeUndefined();
  });

  it('keeps cache headers on /videos/* media and /scrolls/pdfs/*', () => {
    expect(firstMatch('/videos/sample.mp4')?.route).toBe('/videos/*');
    expect(firstMatch('/scrolls/pdfs/x.pdf')?.route).toBe('/scrolls/pdfs/*');
  });
});
