'use client';

import { DemosFilteredView } from '@/app/podcasts/theresonantid/TRI';
import type { DemoPost } from '@/app/podcasts/types';

interface DemosPageClientProps {
  posts: DemoPost[];
}

/**
 * DemosPageClient
 *
 * Thin client wrapper for /podcasts/theresonantid/demos.
 * Receives serialized demo posts from the server component and passes them
 * to the reusable DemosFilteredView.
 */
export function DemosPageClient({ posts }: DemosPageClientProps) {
  return (
    <DemosFilteredView
      posts={posts}
      basePath='/blog'
      backArrowPath='/podcasts/theresonantid'
      title='Interactive Demos'
      description='Experience perception, distortion, and identity through interactive visuals'
    />
  );
}
