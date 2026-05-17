'use client';

import type { DemoPost } from '@/app/podcasts/types';
import { TRIContentFilteredView } from './TRIContentFilteredView';

export interface DemosFilteredViewProps {
  posts: DemoPost[];
  basePath?: string;
  backArrowPath?: string;
  title?: string;
  description?: string;
}

export function DemosFilteredView({
  posts,
  basePath = '/blog',
  backArrowPath = '/blog',
  title = 'Interactive Demos',
  description = 'Experience perception, distortion, and identity through interactive visuals',
}: DemosFilteredViewProps) {
  return (
    <TRIContentFilteredView
      posts={posts}
      basePath={basePath}
      backArrowPath={backArrowPath}
      title={title}
      description={description}
      iconName='LightningBolt'
      itemLabelSingular='demo'
      itemLabelPlural='demos'
      cardLabel='Interactive Demo'
      allItemsLabel='All Demos'
      allItemsSectionTitle='All Demos'
      featuredSectionTitle='Featured Demo'
      featuredButtonLabel='Try Demo'
      featuredButtonIcon='Play'
      featuredButtonAriaLabelPrefix='Try the featured demo'
      heroCtaTitle='Try the Latest Demo'
      heroCtaButtonLabel='Try the Latest Demo'
      heroCtaButtonIcon='Play'
      heroCtaAriaLabelPrefix='Try the latest demo'
      emptyStateTitle='No demos found'
      emptyStateMessage='Try adjusting your filters to see more demos.'
      availableViewTypes={['large-tile']}
      excludedTags={['Interactive Demo']}
    />
  );
}
