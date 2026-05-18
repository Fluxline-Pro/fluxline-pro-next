import type { Metadata } from 'next';
import { getFilteredBlogPosts } from '@/app/blog/lib/blogLoader';
import type { DemoPost } from '@/app/podcasts/types';
import { DemosPageClient } from './DemosPageClient';

export const metadata: Metadata = {
  title: 'Interactive Demos | The Resonant Identity',
  description:
    'Experience perception, distortion, and identity through interactive visuals from The Resonant Identity.',
  keywords:
    'interactive demos, resonant identity, TRI, perception, distortion, identity, resonance core framework',
  openGraph: {
    title: 'Interactive Demos — The Resonant Identity',
    description:
      'Hands-on interactive demos exploring perception, distortion, and identity.',
    url: 'https://www.fluxline.pro/podcasts/theresonantid/demos',
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
    title: 'Interactive Demos — The Resonant Identity',
    description:
      'Hands-on interactive demos exploring perception, distortion, and identity.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/podcasts/theresonantid/demos',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Resonant Identity Demos Page — Server Component
 * URL: /podcasts/theresonantid/demos
 *
 * Loads all blog posts in the "Resonant Identity" category that carry
 * the "Interactive Demo" tag, serializes them for safe Server→Client
 * boundary crossing, and renders DemosFilteredView via DemosPageClient.
 */
export default function ResonantIdentityDemosPage() {
  const rawPosts = getFilteredBlogPosts({
    category: 'Resonant Identity',
    tag: 'Interactive Demo',
  });

  const demoPosts: DemoPost[] = rawPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: post.imageUrl,
    imageAlt: post.imageAlt,
    tags: post.tags,
    publishedDate: post.publishedDate.toISOString(),
    featured: post.featured ?? false,
  }));

  return <DemosPageClient posts={demoPosts} />;
}
