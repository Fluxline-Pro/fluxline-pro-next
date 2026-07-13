'use client';

import React from 'react';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
import { BlogPost } from './types';

interface BlogListingClientWrapperProps {
  initialPosts: BlogPost[];
  allTags: string[];
  allCategories: string[];
}

export function BlogListingClientWrapper({
  initialPosts,
  allCategories,
}: BlogListingClientWrapperProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<
    string | undefined
  >();

  const blogPosts = React.useMemo(() => {
    if (!selectedCategory) return initialPosts;
    return initialPosts.filter((post) => post.category === selectedCategory);
  }, [initialPosts, selectedCategory]);

  const cards = React.useMemo(() => {
    return blogPosts.map((post) => ({
      id: post.slug,
      title: post.title,
      description: post.excerpt,
      imageUrl: post.imageUrl,
      imageAlt: post.imageAlt || post.title,
      imageText: post.category || 'Article',
      date: post.publishedDate,
      category: post.category,
    }));
  }, [blogPosts]);

  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Category',
      options: [
        { key: '', text: 'All' },
        ...allCategories
          .filter((cat) => cat && typeof cat === 'string')
          .map((cat) => ({ key: cat, text: cat })),
      ],
      value: selectedCategory,
      onChange: setSelectedCategory,
    },
  ];

  return (
    <ContentListingPage
      title="Writing & Listening"
      kicker="Content"
      subhead="Essays, frameworks, and conversations on congruence."
      description="Essays, frameworks, and conversations on congruence."
      basePath="/blog"
      cards={cards}
      filters={filters}
      emptyStateTitle="No blog posts found"
      emptyStateMessage="Try adjusting your filters to see more posts."
      onClearFilters={() => setSelectedCategory(undefined)}
    />
  );
}
