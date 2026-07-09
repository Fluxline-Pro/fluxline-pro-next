'use client';

import { InteractiveCard } from '@/components/InteractiveCard';
import { FadeUp } from '@/animations/fade-animations';
import type { TRIPost } from '../../types';

export interface FilteredContentListProps {
  posts: TRIPost[];
  basePath?: string;
  limit?: number;
}

/**
 * Client component that renders filtered TRI content using InteractiveCard.
 * Receives posts from parent Server Component.
 */
export function FilteredContentList({
  posts,
  basePath = '/blog',
  limit = 6,
}: FilteredContentListProps) {
  const visiblePosts = posts.slice(0, limit);

  if (visiblePosts.length === 0) {
    return (
      <h4 data-testid='tri-filtered-content-empty'>
        No content matched the current filters.
      </h4>
    );
  }

  return (
    <div
      data-testid='tri-filtered-content-list'
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}
    >
      {visiblePosts.map((post, index) => (
        <FadeUp key={post.slug} delay={index * 0.1}>
          <InteractiveCard
            id={post.slug}
            title={post.title}
            description={post.excerpt}
            href={`${basePath}/${post.slug}`}
            iconPosition='left'
            showLearnMore
          />
        </FadeUp>
      ))}
    </div>
  );
}

export default FilteredContentList;
