'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { format } from 'date-fns';
import type { BlogPost } from '../types';
import { TERENCE_SOCIAL_LINKS } from '@/app/about/constants';
import { getContentTypeTag } from '@/app/podcasts/theresonantid/lib/taxonomy';

interface BlogPostDetailClientProps {
  post: BlogPost;
}

/**
 * Blog Post Detail Client Component
 * Renders individual blog post using UnifiedContentDetail
 */
export function BlogPostDetailClient({ post }: BlogPostDetailClientProps) {
  const router = useRouter();

  const isTRIPost =
    post.category === 'Resonant Identity' ||
    getContentTypeTag(post.tags) !== null;

  const handleTagClick = (tag: string) => {
    router.push(`/blog/tag/${encodeURIComponent(tag)}`);
  };

  const handleCategoryClick = () => {
    router.push(`/blog/category/${encodeURIComponent(post.category)}`);
  };

  const config: UnifiedContentDetailConfig = {
    title: post.title,
    content: post.content,
    contentType: 'markdown',
    excerpt: post.excerpt,
    backLink: isTRIPost
      ? { url: '/podcasts/theresonantid/library', label: 'Back to TRI Library' }
      : { url: '/blog', label: 'Back to Blog Entries' },
    imageConfig: {
      source: post.imageUrl || '',
      alt: post.imageAlt || post.title,
      title: post.title,
      showTitle: false,
      gallery: post.gallery, // Pass gallery array
    },
    authorInfo: {
      name: post.author,
      publishDate: format(post.publishedDate, 'MMMM d, yyyy'),
      lastUpdated: post.lastUpdated
        ? format(post.lastUpdated, 'MMMM d, yyyy')
        : undefined,
      socialLinks:
        post.author === 'Terence Waters' ? TERENCE_SOCIAL_LINKS : undefined,
    },
    badges: [
      {
        label: post.category,
        variant: 'primary' as const,
        onClick: handleCategoryClick,
      },
      ...post.tags.map((tag) => ({
        label: `#${tag}`,
        variant: 'secondary' as const,
        onClick: () => handleTagClick(tag),
      })),
    ],
    generatedWithAI: post.generatedWithAI,
    cta: {
      title: 'Stay Connected',
      description: isTRIPost
        ? 'Explore more challenges, episode companions, and identity practices from The Resonant Identity.'
        : 'Get insights on the latest trends, best practices, and industry news.',
      buttons: [
        {
          label: isTRIPost ? 'Explore TRI Library' : 'Explore More Articles',
          onClick: () =>
            router.push(isTRIPost ? '/podcasts/theresonantid/library' : '/blog'),
          variant: 'primary',
        },
        {
          label: 'Get in Touch',
          onClick: () => router.push('/contact'),
          variant: 'secondary',
        },
      ],
    },
  };

  return <UnifiedContentDetail config={config} />;
}
