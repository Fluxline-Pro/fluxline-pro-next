import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/app/blog/lib/blogLoader';
import { BlogPostDetailClient } from '@/app/blog/[slug]/BlogPostDetailClient';

const WEEK_3_CHALLENGE_SLUG = 'tri-7day-somatic-emotional-awareness';

export const metadata: Metadata = {
  title: 'Week 3: Somatic & Emotional Cue Awareness Challenge',
  description:
    'A 7-day practice to notice, name, and map your body’s signals to your Past Identity.',
  alternates: {
    canonical:
      '/blog/resonant-identity/challenges/week-3-somatic-emotional-awareness',
  },
};

export default function Week3SomaticEmotionalAwarenessPage() {
  const post = getBlogPostBySlug(WEEK_3_CHALLENGE_SLUG);

  if (!post) {
    notFound();
  }

  return <BlogPostDetailClient post={post} />;
}
