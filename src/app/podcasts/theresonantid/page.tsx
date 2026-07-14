import type { Metadata } from 'next';
import TheResonantIdRedirect from './TheResonantIdRedirect';

export const metadata: Metadata = {
  title: 'The Resonant Identity has moved',
  description:
    'The Resonant Identity now lives at TheResonantIdentity.com. Update your bookmarks — redirecting shortly.',
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Retired /podcasts/theresonantid landing page.
 *
 * The Resonant Identity has been moved to its own site, TheResonantIdentity.com.
 * This static page renders a bookmark-update notice and auto-redirects there.
 * Deep paths under /podcasts/theresonantid/* are rewritten to this page by the
 * Azure Static Web Apps route config (staticwebapp.config.json), so any legacy
 * bookmark below this route lands on the same notice.
 */
export default function TheResonantIdRedirectPage() {
  return <TheResonantIdRedirect />;
}
