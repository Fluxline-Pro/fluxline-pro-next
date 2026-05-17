'use client';

import type { ArticlePost } from '@/app/podcasts/types';
import { TRIContentFilteredView } from './TRIContentFilteredView';

export interface ArticlesFilteredViewProps {
  posts: ArticlePost[];
  basePath?: string;
  backArrowPath?: string;
  title?: string;
  description?: string;
}

export function ArticlesFilteredView({
  posts,
  basePath = '/blog',
  backArrowPath = '/podcasts/theresonantid',
  title = 'Companion Articles',
  description = 'Deep dives, frameworks, and reflections from the Resonant Identity ecosystem.',
}: ArticlesFilteredViewProps) {
  return (
    <TRIContentFilteredView
      posts={posts}
      basePath={basePath}
      backArrowPath={backArrowPath}
      title={title}
      description={description}
      iconName='TextDocumentShared'
      itemLabelSingular='article'
      itemLabelPlural='articles'
      cardLabel='Companion Article'
      allItemsLabel='All Articles'
      allItemsSectionTitle='All Articles'
      featuredSectionTitle='Featured Article'
      featuredButtonLabel='Read Article'
      featuredButtonIcon='ReadingMode'
      featuredButtonAriaLabelPrefix='Read the featured article'
      heroCtaTitle='Read the Latest Article'
      heroCtaButtonLabel='Read the Latest Article'
      heroCtaButtonIcon='ReadingMode'
      heroCtaAriaLabelPrefix='Read the latest article'
      emptyStateTitle='No companion articles found'
      emptyStateMessage='Try adjusting your filters to see more articles.'
      availableViewTypes={['large-tile']}
    />
  );
}
