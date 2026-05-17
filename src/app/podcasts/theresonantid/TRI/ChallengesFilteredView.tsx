'use client';

import type { ChallengePost } from '@/app/podcasts/types';
import { TRIContentFilteredView } from './TRIContentFilteredView';

export interface ChallengesFilteredViewProps {
  /** Challenge posts pre-filtered to category "Resonant Identity" + tag "Identity Challenge" */
  posts: ChallengePost[];
  /** Base path for card navigation (default: "/blog") */
  basePath?: string;
  /** Back-arrow navigation path (default: "/blog") */
  backArrowPath?: string;
  /** Hero title (default: "Identity Challenges") */
  title?: string;
  /** Hero description */
  description?: string;
}

/**
 * ChallengesFilteredView
 *
 * Reusable component for displaying a filtered list of TRI identity challenges.
 * Provides:
 *  - Tag-chip quick-filter row
 *  - Featured challenge callout (most recent with `featured: true`)
 *  - Full-page grid using ContentListingPage (mirrors main blog page look/feel)
 *  - Hero CTA auto-linked to the newest featured or newest-by-date challenge
 *  - /blog is still the basepath due to taxonomy setup and blog post structure
 *  - The /podcast/resonant-identity/challenges page takes TRI posts and filters them down by the tag "Resonant Identity"
 *
 * Used on /podcast/resonant-identity/challenges and embeddable in other TRI sections.
 */
export function ChallengesFilteredView({
  posts,
  basePath = '/blog',
  backArrowPath = '/podcast/theresonantid',
  title = 'Identity Challenges',
  description = '7-day guided practices for identity coherence — structured challenges rooted in the Resonance Core Framework™.',
}: ChallengesFilteredViewProps) {
  return (
    <TRIContentFilteredView
      posts={posts}
      basePath={basePath}
      backArrowPath={backArrowPath}
      title={title}
      description={description}
      iconName='FitPage'
      itemLabelSingular='challenge'
      itemLabelPlural='challenges'
      cardLabel='Identity Challenge'
      allItemsLabel='All Challenges'
      allItemsSectionTitle='All Challenges'
      featuredSectionTitle='Featured Challenge'
      featuredButtonLabel='Start Challenge'
      featuredButtonIcon='FitPage'
      featuredButtonAriaLabelPrefix='Start the featured challenge'
      heroCtaTitle='Start the Latest 7-day Challenge'
      heroCtaButtonLabel='Start the Latest Challenge'
      heroCtaButtonIcon='FitPage'
      heroCtaAriaLabelPrefix='Start the most recent challenge'
      emptyStateTitle='No challenges found'
      emptyStateMessage='Try adjusting your filters to see more challenges.'
      availableViewTypes={['grid', 'small-tile', 'large-tile']}
      excludedTags={['Identity Challenge']}
    />
  );
}
