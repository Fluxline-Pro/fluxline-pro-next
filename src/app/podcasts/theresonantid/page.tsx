import type { Metadata } from 'next';
import { PodcastListingClient } from '../PodcastListingClient';
import { PodcastPageWrapper } from '../PodcastPageWrapper';
import { getFilteredBlogPosts } from '@/app/blog/lib/blogLoader';
import type { TRIPost } from '../types';

export const metadata: Metadata = {
  title: 'The Resonant Identity Podcast',
  description:
    'The Resonant Identity — a podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
  keywords:
    'podcast, audio, The Resonant Identity, Fluxline, transformation, strategy, identity, authenticity, mental health, self-help, self-improvement, personal development, Apple Podcasts, Spotify, Amazon Music, Deezer, Podchaser, Spreaker',
  openGraph: {
    title: 'The Resonant Identity Podcast — Fluxline',
    description:
      'A podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
    url: 'https://www.fluxline.pro/podcasts/theresonantid',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/TheResonantIdentity_Logo.png',
        width: 2048,
        height: 2048,
        alt: 'The Resonant Identity Podcast',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Resonant Identity Podcast — Fluxline',
    description:
      'A podcast blending identity architecture, self-improvement, and practical frameworks for navigating transitions with clarity and intention.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/podcasts/theresonantid',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * The Resonant Identity Podcast Home Page
 * URL: /podcasts/theresonantid
 * Shows episodes, player, and platform links, plus TRI content sections.
 *
 * Blog posts with category "Resonant Identity" are loaded server-side and
 * serialised so they can be passed as plain props to the client component.
 */
export default function TheResonantIdentityPodcastPage() {
  // Load all Resonant Identity blog posts at build time (Server Component)
  const rawPosts = getFilteredBlogPosts({ category: 'Resonant Identity' });

  const triPosts: TRIPost[] = rawPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: post.imageUrl,
    tags: post.tags,
    publishedDate: post.publishedDate.toISOString(),
  }));

  return (
    <PodcastPageWrapper>
      <PodcastListingClient triPosts={triPosts} />
    </PodcastPageWrapper>
  );
}

