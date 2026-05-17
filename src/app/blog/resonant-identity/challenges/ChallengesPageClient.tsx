'use client';

import { ChallengesFilteredView } from '@/app/podcasts/theresonantid/TRI/ChallengesFilteredView';
import type { ChallengePost } from '@/app/podcasts/types';

interface ChallengesPageClientProps {
  posts: ChallengePost[];
}

/**
 * ChallengesPageClient
 *
 * Thin client wrapper for /blog/resonant-identity/challenges.
 * Receives serialized challenge posts from the server component and passes them
 * to the reusable ChallengesFilteredView.
 */
export function ChallengesPageClient({ posts }: ChallengesPageClientProps) {
  return (
    <ChallengesFilteredView
      posts={posts}
      basePath='/blog'
      backArrowPath='/blog'
      title='Identity Challenges'
      description='7-day guided practices for identity coherence — structured challenges rooted in the Resonance Core Framework™.'
    />
  );
}
