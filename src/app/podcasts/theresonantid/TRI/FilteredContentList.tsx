'use client';

import FxCard from '@/theme/components/dsm/FxCard';
import { FadeUp } from '@/animations/fade-animations';
import type { TRIPost } from '../../types';

export interface FilteredContentListProps {
  posts: TRIPost[];
  basePath?: string;
  limit?: number;
}

/**
 * Client component that renders filtered TRI content using FxCard.
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
          <FxCard
            interactive
            href={`${basePath}/${post.slug}`}
            style={{ padding: '28px 28px 24px' }}
          >
            <h4
              style={{
                fontSize: 'var(--fx-h4-size)',
                fontWeight: 600,
                color: 'var(--fx-text-heading)',
                marginBottom: 8,
              }}
            >
              {post.title}
            </h4>
            <p
              style={{
                color: 'var(--fx-text-muted)',
                fontSize: '0.95rem',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {post.excerpt}
            </p>
            <span
              style={{
                display: 'inline-block',
                marginTop: 12,
                color: 'var(--fx-accent)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Learn More ›
            </span>
          </FxCard>
        </FadeUp>
      ))}
    </div>
  );
}

export default FilteredContentList;
