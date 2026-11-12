import type { Metadata } from 'next';
import { GitHubClientWrapper } from './GitHubClientWrapper';
import { getGitHubRepos, getAllLanguages } from './lib/githubLoader';

export const metadata: Metadata = {
  title: 'GitHub',
  description:
    'Explore open-source projects, code samples, and technical resources from the Fluxline development team on GitHub.',
  openGraph: {
    title: 'GitHub - Fluxline',
    description:
      'Explore open-source projects, code samples, and technical resources from the Fluxline development team on GitHub.',
    url: 'https://www.fluxline.pro/github',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline GitHub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub - Fluxline',
    description:
      'Explore open-source projects, code samples, and technical resources from the Fluxline development team on GitHub.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/github',
  },
};

/**
 * GitHub Page - Server Component
 *
 * Fetches Fluxline organization repositories from the GitHub API at build time
 * and passes them to the client wrapper for rendering.
 */
export default async function GitHubPage() {
  const repos = await getGitHubRepos();
  const allLanguages = getAllLanguages(repos);

  return <GitHubClientWrapper repos={repos} allLanguages={allLanguages} />;
}
