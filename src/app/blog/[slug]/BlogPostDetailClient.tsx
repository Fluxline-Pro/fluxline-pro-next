'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { format } from 'date-fns';
import type { BlogPost } from '../types';
import { TERENCE_SOCIAL_LINKS, TRI_SOCIAL_LINKS } from '@/app/about/constants';
import { getContentTypeTag } from '@/app/podcasts/theresonantid/lib/taxonomy';
import { RedAppleFilterDemo } from '@/components/demos';

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
  const isIdentityChallengePost = post.tags.includes('Identity Challenge');
  const primaryRelatedTag = post.tags.find((tag) => tag !== 'Identity Challenge');

  const handleTagClick = (tag: string) => {
    if (isIdentityChallengePost) {
      router.push(
        `/podcasts/theresonantid/challenges?tag=${encodeURIComponent(tag)}`
      );
      return;
    }
    router.push(`/blog/tag/${encodeURIComponent(tag)}`);
  };

  const handleCategoryClick = () => {
    router.push(`/blog/category/${encodeURIComponent(post.category)}`);
  };

  const isRedAppleDemo = post.slug === 'tri-red-apple-perception-demo';

  const config: UnifiedContentDetailConfig = {
    title: post.title,
    content: post.content,
    contentType: 'markdown',
    excerpt: post.excerpt,
    backLink: isIdentityChallengePost
      ? { url: '/podcasts/theresonantid/challenges', label: 'Back to Challenges' }
      : isTRIPost
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
        post.author === 'Terence Waters'
          ? TERENCE_SOCIAL_LINKS
          : post.author === 'The Resonant Identity'
            ? TRI_SOCIAL_LINKS
            : undefined,
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
    // Inject the interactive demo component for the Red Apple post
    ...(isRedAppleDemo && {
      sections: [
        {
          title: 'Interactive Filter Demo',
          content: <RedAppleFilterDemo />,
        },
      ],
      sectionsPosition: 'before' as const,
      customModalContent: <RedAppleFilterDemo isModal />,
    }),
    cta: {
      title: isIdentityChallengePost ? 'Continue the Challenge Path' : 'Stay Connected',
      description: isIdentityChallengePost
        ? 'Return to all TRI challenges or jump to related articles based on this challenge’s focus.'
        : isTRIPost
          ? 'Explore more challenges, episode companions, and identity practices from The Resonant Identity.'
          : 'Get insights on the latest trends, best practices, and industry news.',
      buttons: isIdentityChallengePost
        ? [
            {
              label: 'Back to Challenges',
              onClick: () => router.push('/podcasts/theresonantid/challenges'),
              variant: 'primary' as const,
            },
            {
              label: 'Related Articles',
              onClick: () =>
                router.push(
                  primaryRelatedTag
                    ? `/blog/tag/${encodeURIComponent(primaryRelatedTag)}`
                    : '/blog/tag/Identity%20Challenge'
                ),
              variant: 'secondary' as const,
            },
          ]
        : [
            {
              label: isTRIPost ? 'Explore TRI Library' : 'Explore More Articles',
              onClick: () =>
                router.push(
                  isTRIPost ? '/podcasts/theresonantid/library' : '/blog'
                ),
              variant: 'primary' as const,
            },
            {
              label: 'Get in Touch',
              onClick: () => router.push('/contact'),
              variant: 'secondary' as const,
            },
          ],
    },
  };

  return <UnifiedContentDetail config={config} />;
}
