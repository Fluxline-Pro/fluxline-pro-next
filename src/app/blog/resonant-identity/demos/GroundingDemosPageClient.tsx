'use client';

import { DemosFilteredView } from '@/app/podcasts/theresonantid/TRI';
import type { DemoPost } from '@/app/podcasts/types';

interface GroundingDemosPageClientProps {
  posts: DemoPost[];
}

export function GroundingDemosPageClient({ posts }: GroundingDemosPageClientProps) {
  return (
    <DemosFilteredView
      posts={posts}
      basePath='/blog/resonant-identity/demos'
      backArrowPath='/podcasts/theresonantid/library'
      title='Grounding Practices & Somatic Demos'
      description='Your toolkit for nervous system regulation and interoceptive awareness.'
    />
  );
}
