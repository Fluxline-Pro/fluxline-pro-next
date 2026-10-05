/**
 * Guards staticwebapp.config.json against rules that Azure Static Web Apps rejects at deploy time.
 *
 * The deploy action validates the config and aborts the whole upload on an error, so a bad rule
 * silently freezes the live site on its previous build (2026-09-26: "/resonance-core" and
 * "/resonance-core/" were treated as duplicates, and every deploy after that failed).
 */
import fs from 'fs';
import path from 'path';

interface Route {
  route: string;
  redirect?: string;
  statusCode?: number;
  headers?: Record<string, string>;
}

const config = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'staticwebapp.config.json'), 'utf8')
) as { routes: Route[]; globalHeaders?: Record<string, string> };

// SWA matches routes case-insensitively and ignores a trailing slash.
const normalize = (route: string) => route.toLowerCase().replace(/\/+$/, '') || '/';

describe('staticwebapp.config.json', () => {
  it('has no duplicate routes (case and trailing slash ignored)', () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const { route } of config.routes) {
      const key = normalize(route);
      if (seen.has(key)) duplicates.push(`${seen.get(key)} ~ ${route}`);
      else seen.set(key, route);
    }
    expect(duplicates).toEqual([]);
  });

  // The Articles of Conversion page previews its PDFs in <object> elements. Browsers apply X-Frame-Options to
  // that embedded content, so the global DENY would block the previews; the legal assets need SAMEORIGIN.
  it('lets the site embed its own legal PDFs (X-Frame-Options: SAMEORIGIN)', () => {
    expect(config.globalHeaders?.['X-Frame-Options']).toBe('DENY');
    const legal = config.routes.find((r) => r.route === '/assets/legal/*');
    expect(legal?.headers?.['X-Frame-Options']).toBe('SAMEORIGIN');
    // Routes match first-to-last, so the override must come before the catch-all.
    const catchAll = config.routes.findIndex((r) => r.route === '/*');
    expect(config.routes.indexOf(legal as Route)).toBeLessThan(catchAll === -1 ? Infinity : catchAll);
  });

  it('uses only redirect status codes SWA accepts', () => {
    for (const r of config.routes.filter((x) => x.redirect)) {
      expect([301, 302]).toContain(r.statusCode ?? 302);
    }
  });
});
