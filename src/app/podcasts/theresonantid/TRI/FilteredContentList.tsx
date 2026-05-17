'use client';

import { InteractiveCard } from '@/components/InteractiveCard';
import { FadeUp } from '@/animations/fade-animations';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { BlogPost } from '@/app/blog/types';
import { Typography } from '@/theme/components/typography/typography';

export interface FilteredContentListProps {
  posts: BlogPost[];
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
  const { theme } = useAppTheme();

  const visiblePosts = posts.slice(0, limit);

  if (visiblePosts.length === 0) {
    return (
      <Typography
        variant='h4'
        data-testid='tri-filtered-content-empty'
      >
        No content matched the current filters.
      </Typography>
    );
  }

  return (
    <div
      className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
      data-testid='tri-filtered-content-list'
      style={{ gap: theme.spacing.l }}
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
