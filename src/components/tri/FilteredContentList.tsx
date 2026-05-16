import React from 'react';
import Link from 'next/link';
import { getFilteredBlogPosts } from '../../app/blog/lib/blogLoader';
import { FeaturedCard } from './FeaturedCard';
import { LargeTileGrid } from './LargeTileGrid';

export interface FilteredContentListProps {
  category?: string;
  tags?: string[];
  dateRange?: {
    from?: string;
    to?: string;
  };
  limit?: number;
  basePath?: string;
}

/**
 * Server component that auto-loads markdown blog metadata and renders
 * filtered TRI content cards.
 */
export function FilteredContentList({
  category,
  tags = [],
  dateRange,
  limit = 6,
  basePath = '/blog',
}: FilteredContentListProps) {
  let posts = getFilteredBlogPosts({ category });

  if (tags.length > 0) {
    posts = posts.filter((post) => tags.some((tag) => post.tags.includes(tag)));
  }

  if (dateRange?.from) {
    const from = new Date(dateRange.from);
    posts = posts.filter((post) => post.publishedDate >= from);
  }

  if (dateRange?.to) {
    const to = new Date(dateRange.to);
    to.setHours(23, 59, 59, 999);
    posts = posts.filter((post) => post.publishedDate <= to);
  }

  const visiblePosts = posts.slice(0, limit);

  if (visiblePosts.length === 0) {
    return (
      <p className='text-sm text-gray-500' data-testid='tri-filtered-content-empty'>
        No content matched the current filters.
      </p>
    );
  }

  const [featuredPost, ...otherPosts] = visiblePosts;

  return (
    <div className='flex flex-col gap-6' data-testid='tri-filtered-content-list'>
      <FeaturedCard
        title={featuredPost.title}
        description={featuredPost.excerpt}
        href={`${basePath}/${featuredPost.slug}`}
        tags={featuredPost.tags.slice(0, 3)}
      />

      {otherPosts.length > 0 ? (
        <LargeTileGrid>
          {otherPosts.map((post) => (
            <article key={post.slug} className='rounded-lg border p-5'>
              <h3 className='mb-2 text-lg font-semibold'>{post.title}</h3>
              <p className='mb-3 text-sm text-gray-600'>{post.excerpt}</p>
              <Link href={`${basePath}/${post.slug}`} className='text-sm font-medium'>
                Read more →
              </Link>
            </article>
          ))}
        </LargeTileGrid>
      ) : null}
    </div>
  );
}

export default FilteredContentList;
