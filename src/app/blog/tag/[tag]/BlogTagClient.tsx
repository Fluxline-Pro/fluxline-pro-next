'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ContentListingPage } from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import { format } from 'date-fns';
import type { BlogPost } from '../../types';

interface BlogTagClientProps {
  tag: string;
  posts: BlogPost[];
}

/**
 * Blog Tag Filter Client Component
 * Displays blog posts filtered by a specific tag using ContentListingPage
 */
export function BlogTagClient({ tag, posts }: BlogTagClientProps) {
  const router = useRouter();

  // Transform posts to cards
  const cards = React.useMemo(() => {
    return posts.map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.excerpt,
      imageUrl: post.imageUrl,
      imageAlt: post.imageAlt || post.title,
      imageText: format(post.publishedDate, 'MMMM d, yyyy'),
    }));
  }, [posts]);

  // Build results message
  const resultsMessage = `Showing ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} tagged with #${tag}`;

  return (
    <ContentListingPage
      title={`Posts Tagged: #${tag}`}
      iconName={getIconForPath('/blog') || 'TextDocumentShared'}
      description={`Browse all blog posts tagged with #${tag}.`}
      basePath='/blog'
      cards={cards}
      filters={[]}
      resultsMessage={resultsMessage}
      emptyStateTitle='No blog posts found'
      emptyStateMessage='No posts match this tag.'
    />
  );
}
