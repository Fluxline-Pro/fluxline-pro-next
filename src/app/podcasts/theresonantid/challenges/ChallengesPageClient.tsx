'use client';

import { ChallengesFilteredView } from '@/app/podcasts/theresonantid/TRI/ChallengesFilteredView';
import type { ChallengePost } from '@/app/podcasts/types';

interface ChallengesPageClientProps {
  posts: ChallengePost[];
}

/**
 * ChallengesPageClient
 *
 * Thin client wrapper for /podcasts/theresonantid/challenges.
 * Receives serialized challenge posts from the server component and passes them
 * to the reusable ChallengesFilteredView.
 */
export function ChallengesPageClient({ posts }: ChallengesPageClientProps) {
  return (
    <ChallengesFilteredView
      posts={posts}
      basePath='/blog'
      backArrowPath='/podcasts/theresonantid'
      title='TRI Challenges'
      description='7-day guided practices for identity coherence — structured challenges rooted in The Resonance Core Framework™.'
    />
  );
}
