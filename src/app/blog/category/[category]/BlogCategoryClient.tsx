'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ContentListingPage } from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import { format } from 'date-fns';
import type { BlogPost } from '../../types';

interface BlogCategoryClientProps {
  category: string;
  posts: BlogPost[];
}

/**
 * Blog Category Filter Client Component
 * Displays blog posts filtered by a specific category using ContentListingPage
 */
export function BlogCategoryClient({
  category,
  posts,
}: BlogCategoryClientProps) {
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
  const resultsMessage = `Showing ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} in ${category}`;

  return (
    <ContentListingPage
      title={`Category: ${category}`}
      iconName={getIconForPath('/blog') || 'TextDocumentShared'}
      description={`Browse all blog posts in the ${category} category.`}
      basePath='/blog'
      cards={cards}
      filters={[]}
      resultsMessage={resultsMessage}
      emptyStateTitle='No blog posts found'
      emptyStateMessage='No posts match this category.'
    />
  );
}
