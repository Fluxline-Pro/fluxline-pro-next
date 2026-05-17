import type { Metadata } from 'next';
import { getFilteredBlogPosts } from '@/app/blog/lib/blogLoader';
import type { ChallengePost } from '@/app/podcasts/types';
import { ChallengesPageClient } from './ChallengesPageClient';

export const metadata: Metadata = {
  title: 'Identity Challenges | The Resonant Identity',
  description:
    'Browse all 7-day identity challenges from The Resonant Identity. Structured practices rooted in the Resonance Core Framework™ to help you build identity coherence.',
  keywords:
    'identity challenges, 7-day challenge, resonant identity, TRI, identity coherence, resonance core framework, Terence Waters, personal growth, identity activation',
  openGraph: {
    title: 'Identity Challenges — The Resonant Identity',
    description:
      'Structured 7-day challenges for identity coherence from The Resonant Identity.',
    url: 'https://www.fluxline.pro/blog/resonant-identity/challenges',
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
    title: 'Identity Challenges — The Resonant Identity',
    description:
      'Structured 7-day challenges for identity coherence from The Resonant Identity.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/blog/resonant-identity/challenges',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Resonant Identity Challenges Page — Server Component
 * URL: /blog/resonant-identity/challenges
 *
 * Loads all blog posts in the "Resonant Identity" category that carry
 * the "Identity Challenge" tag, serializes them for safe Server→Client
 * boundary crossing, and renders the reusable ChallengesFilteredView.
 */
export default function ResonantIdentityChallengesPage() {
  const rawPosts = getFilteredBlogPosts({
    category: 'Resonant Identity',
    tag: 'Identity Challenge',
  });

  const challengePosts: ChallengePost[] = rawPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: post.imageUrl,
    imageAlt: post.imageAlt,
    tags: post.tags,
    publishedDate: post.publishedDate.toISOString(),
    featured: post.featured ?? false,
  }));

  return <ChallengesPageClient posts={challengePosts} />;
}
