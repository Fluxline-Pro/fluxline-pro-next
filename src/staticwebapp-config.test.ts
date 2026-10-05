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
}

const config = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'staticwebapp.config.json'), 'utf8')
) as { routes: Route[] };

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

  it('uses only redirect status codes SWA accepts', () => {
    for (const r of config.routes.filter((x) => x.redirect)) {
      expect([301, 302]).toContain(r.statusCode ?? 302);
    }
  });
});
