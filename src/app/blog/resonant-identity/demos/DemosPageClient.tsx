'use client';

import { DemosFilteredView } from '@/app/podcasts/theresonantid/TRI';
import type { DemoPost } from '@/app/podcasts/types';

interface DemosPageClientProps {
  posts: DemoPost[];
}

export function DemosPageClient({ posts }: DemosPageClientProps) {
  return (
    <DemosFilteredView
      posts={posts}
      basePath='/blog'
      backArrowPath='/blog'
      title='Interactive Demos'
      description='Experience perception, distortion, and identity through interactive visuals'
    />
  );
}
