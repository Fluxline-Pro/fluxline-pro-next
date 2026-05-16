import type { Metadata } from 'next';
import { getFilteredBlogPosts } from '@/app/blog/lib/blogLoader';
import { TRILibraryClient } from './TRILibraryClient';

export const metadata: Metadata = {
  title: 'Resonant Identity Library | The Resonant Identity',
  description:
    'Browse all articles, challenges, and interactive demos from The Resonant Identity. Filter by tag to explore Episode Companions, Identity Challenges, Interactive Demos, and more.',
  keywords:
    'resonant identity library, TRI articles, identity challenge, episode companion, interactive demo, resonance core, personal growth, identity architecture',
  openGraph: {
    title: 'Resonant Identity Library — Fluxline',
    description:
      'All content from The Resonant Identity — articles, challenges, and demos built on the Resonance Core Framework™.',
    url: 'https://www.fluxline.pro/podcasts/theresonantid/library',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/TheResonantIdentity_Logo.png',
        width: 2048,
        height: 2048,
        alt: 'The Resonant Identity',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resonant Identity Library — Fluxline',
    description:
      'All content from The Resonant Identity — articles, challenges, and demos built on the Resonance Core Framework™.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/podcasts/theresonantid/library',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Resonant Identity Library Page — Server Component
 * URL: /podcasts/theresonantid/library
 *
 * Loads all blog posts tagged with category "Resonant Identity" at build time
 * and passes them to the client component for interactive tag filtering.
 */
export default function TRILibraryPage() {
  const posts = getFilteredBlogPosts({ category: 'Resonant Identity' });

  return <TRILibraryClient initialPosts={posts} />;
}
