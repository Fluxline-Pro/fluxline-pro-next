'use client';

import React from 'react';
import { format } from 'date-fns';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import { BlogPost } from './types';

interface BlogListingClientWrapperProps {
  initialPosts: BlogPost[];
  allTags: string[];
  allCategories: string[];
}

/**
 * Blog Listing Client Wrapper
 * Handles filtering logic and transforms blog data for the unified ContentListingPage
 */
export function BlogListingClientWrapper({
  initialPosts,
  allTags,
  allCategories,
}: BlogListingClientWrapperProps) {
  // State for filters
  const [selectedTag, setSelectedTag] = React.useState<string | undefined>();
  const [selectedCategory, setSelectedCategory] = React.useState<
    string | undefined
  >();

  // Filter blog posts based on selected filters
  const blogPosts = React.useMemo(() => {
    let filtered = [...initialPosts];

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag));
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    return filtered.sort(
      (a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()
    );
  }, [initialPosts, selectedTag, selectedCategory]);

  // Transform blog posts to card format
  const cards = React.useMemo(() => {
    return blogPosts.map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.excerpt,
      imageUrl: post.imageUrl,
      imageAlt: post.imageAlt || post.title,
      imageText: format(post.publishedDate, 'MMMM d, yyyy'),
    }));
  }, [blogPosts]);

  // Configure filters
  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Category',
      options: [
        { key: '', text: 'All Categories' },
        ...allCategories.map((cat) => ({ key: cat, text: cat })),
      ],
      value: selectedCategory,
      onChange: setSelectedCategory,
    },
    {
      type: 'single',
      label: 'Tag',
      options: [
        { key: '', text: 'All Tags' },
        ...allTags.map((tag) => ({ key: tag, text: tag })),
      ],
      value: selectedTag,
      onChange: setSelectedTag,
    },
  ];

  // Build results message
  const resultsMessage = `Showing ${blogPosts.length} ${blogPosts.length === 1 ? 'post' : 'posts'}${selectedCategory ? ` in ${selectedCategory}` : ''}${selectedTag ? ` tagged with ${selectedTag}` : ''}`;

  return (
    <ContentListingPage
      title='Blog'
      iconName={getIconForPath('/blog') || 'TextDocumentShared'}
      description='Insights, best practices, and thoughts on technology, design, and business transformation. Explore articles on software development, leadership, wellness, and strategic innovation.'
      basePath='/blog'
      cards={cards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle='No blog posts found'
      emptyStateMessage='Try adjusting your filters to see more posts.'
    />
  );
}
