'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { UnifiedContentDetail } from '@/components/UnifiedContentDetail';
import type { UnifiedContentDetailConfig } from '@/components/UnifiedContentDetail';
import { FormButton } from '@/theme/components/form';
import type { GroundingDemoPost } from '../lib/groundingDemosLoader';

interface GroundingDemoDetailClientProps {
  post: GroundingDemoPost;
  relatedPosts: GroundingDemoPost[];
}

export function GroundingDemoDetailClient({
  post,
  relatedPosts,
}: GroundingDemoDetailClientProps) {
  const router = useRouter();

  const config: UnifiedContentDetailConfig = {
    title: post.title,
    content: post.content,
    contentType: 'markdown',
    excerpt: post.description,
    backLink: {
      url: '/blog/resonant-identity/demos',
      label: 'Back to Demos',
    },
    authorInfo: {
      name: post.author,
      publishDate: format(post.publishedDate, 'MMMM d, yyyy'),
    },
    badges: [
      {
        label: post.category,
        variant: 'primary',
      },
      ...post.tags.map((tag) => ({
        label: `#${tag}`,
        variant: 'secondary' as const,
        onClick: () => router.push(`/blog/tag/${encodeURIComponent(tag)}`),
      })),
    ],
    sections:
      relatedPosts.length > 0
        ? [
            {
              title: 'Related Practices',
              content: (
                <div className='flex flex-wrap gap-3'>
                  {relatedPosts.map((relatedPost) => (
                    <FormButton
                      key={relatedPost.slug}
                      variant='tertiary'
                      size='small'
                      onClick={() =>
                        router.push(`/blog/resonant-identity/demos/${relatedPost.slug}`)
                      }
                    >
                      {relatedPost.title}
                    </FormButton>
                  ))}
                </div>
              ),
            },
          ]
        : undefined,
    cta: {
      title: 'Continue Your TRI Practice',
      description:
        'Keep your system regulated and your identity work embodied with another grounding step.',
      buttons: [
        {
          label: 'Back to Demos',
          onClick: () => router.push('/blog/resonant-identity/demos'),
          variant: 'primary',
        },
        ...(post.linkedChallengeUrl
          ? [
              {
                label: post.linkedChallengeLabel ?? 'Try this with a TRI Challenge',
                onClick: () =>
                  post.linkedChallengeUrl && router.push(post.linkedChallengeUrl),
                variant: 'secondary' as const,
              },
            ]
          : []),
      ],
    },
  };

  return <UnifiedContentDetail config={config} />;
}
