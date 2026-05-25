import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getFilteredBlogPosts } from '@/app/blog/lib/blogLoader';
import type { ArticlePost } from '@/app/podcasts/types';
import { normalizeTag } from '../lib/taxonomy';
import { ArticlesPageClient } from './ArticlesPageClient';

const ARTICLE_CONTENT_TAGS = ['Episode Companion', 'Foundations', 'Deep Dive'];

export const metadata: Metadata = {
  title: 'Companion Articles | The Resonant Identity',
  description:
    'Deep dives, frameworks, and reflections from the Resonant Identity ecosystem.',
  keywords:
    'companion articles, resonant identity, TRI, episode companion, foundations, deep dive, identity frameworks, Terence Waters',
  openGraph: {
    title: 'Companion Articles — The Resonant Identity',
    description:
      'Explore companion articles for The Resonant Identity, including episode companions, foundations, and deep dives.',
    url: 'https://www.fluxline.pro/podcasts/theresonantid/articles',
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
    title: 'Companion Articles — The Resonant Identity',
    description:
      'Explore companion articles for The Resonant Identity, including episode companions, foundations, and deep dives.',
    images: ['/images/TheResonantIdentity_Logo.png'],
  },
  alternates: {
    canonical: '/podcasts/theresonantid/articles',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResonantIdentityArticlesPage() {
  const rawPosts = getFilteredBlogPosts({ category: 'Resonant Identity' });
  const normalizedAllowedTags = ARTICLE_CONTENT_TAGS.map(normalizeTag);

  const rawArticlePosts = rawPosts.filter((post) =>
    post.tags.some((tag) => normalizedAllowedTags.includes(normalizeTag(tag)))
  );

  const articlePosts: ArticlePost[] = rawArticlePosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: post.imageUrl,
    imageAlt: post.imageAlt,
    tags: post.tags,
    publishedDate: post.publishedDate.toISOString(),
    featured: post.featured ?? false,
  }));

  return (
    <Suspense fallback={null}>
      <ArticlesPageClient posts={articlePosts} />
    </Suspense>
  );
}
