'use client';

import { ArticlesFilteredView } from '@/app/podcasts/theresonantid/TRI';
import type { ArticlePost } from '@/app/podcasts/types';

interface ArticlesPageClientProps {
  posts: ArticlePost[];
}

export function ArticlesPageClient({ posts }: ArticlesPageClientProps) {
  return (
    <ArticlesFilteredView
      posts={posts}
      basePath='/blog'
      backArrowPath='/podcasts/theresonantid'
      title='Companion Articles'
      description='Deep dives, frameworks, and reflections from the Resonant Identity ecosystem.'
    />
  );
}
