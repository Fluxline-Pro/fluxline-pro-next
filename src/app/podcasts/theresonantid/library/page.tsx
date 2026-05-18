import type { Metadata } from 'next';
import { getFilteredBlogPosts } from '@/app/blog/lib/blogLoader';
import { TRIPost } from '@/app/podcasts/types';
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
      'All content from The Resonant Identity — articles, challenges, and demos built on The Resonance Core Framework™.',
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
      'All content from The Resonant Identity — articles, challenges, and demos built on The Resonance Core Framework™.',
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
 * and serializes them to TRIPost[] for safe Server→Client transfer.
 */
export default function TRILibraryPage() {
  // Load all Resonant Identity blog posts at build time (Server Component)
  const rawPosts = getFilteredBlogPosts({ category: 'Resonant Identity' });

  // Serialize to TRIPost[] for safe Server→Client boundary crossing
  const triPosts: TRIPost[] = rawPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: post.imageUrl,
    imageAlt: post.imageAlt,
    tags: post.tags,
    publishedDate: post.publishedDate.toISOString(),
  }));

  return <TRILibraryClient initialPosts={triPosts} />;
}
