import type { Metadata } from 'next';
import { TheResonantIdentityAboutPageClient } from './page.client';
import { getFilteredBlogPosts } from '@/app/blog/lib/blogLoader';
import type { TRIPost } from '../../types';

export const metadata: Metadata = {
  title: 'About The Resonant Identity',
  description:
    'The Resonant Identity is a space for identity transformation, micro-lessons, and applied resonance — extending The Resonance Core Framework into a living, accessible practice.',
  keywords:
    'The Resonant Identity, TRI, identity transformation, resonance, micro-lessons, 7-day setup, identity practice, Resonance Core Framework, community, Facebook Group, Terence Waters, Fluxline',
  openGraph: {
    title: 'About The Resonant Identity — Fluxline',
    description:
      'A living extension of The Resonance Core Framework — where identity becomes practice. Explore micro-lessons, the 7-day setup, and the TRI community.',
    url: 'https://www.fluxline.pro/podcasts/theresonantid/about',
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
    title: 'About The Resonant Identity — Fluxline',
    description:
      'A living extension of The Resonance Core Framework — where identity becomes practice.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/podcasts/theresonantid/about',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * The Resonant Identity — About/Philosophy Page (Server Component)
 * URL: /podcasts/theresonantid/about
 * Deep dive into the philosophy, frameworks, and community
 *
 * Server component that loads data and passes to client component
 */
export default function TheResonantIdentityAboutPage() {
  // Load TRI blog posts server-side for the content section
  const rawPosts = getFilteredBlogPosts({ category: 'Resonant Identity' });

  const triPosts: TRIPost[] = rawPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: post.imageUrl,
    imageAlt: post.imageAlt,
    tags: post.tags,
    publishedDate: post.publishedDate.toISOString(),
  }));

  return <TheResonantIdentityAboutPageClient triPosts={triPosts} />;
}
