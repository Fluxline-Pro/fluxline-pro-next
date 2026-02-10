import React from 'react';
import type { Metadata } from 'next';
import { getAllBlogPosts, getAllTags } from '../../lib/blogLoader';
import { BlogTagClient } from './BlogTagClient';
import { notFound } from 'next/navigation';
import { findMatchingTag, tagsMatch } from '@/utils/tag-utils';

// Disable dynamic params - we only serve pre-generated static pages
export const dynamicParams = false;

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags();

  // Ensure we return an array even if empty
  if (!tags || tags.length === 0) {
    console.warn('No blog tags found for static generation');
    return [];
  }

  // Return unencoded tags - filesystem will have real spaces,
  // browser and Azure will handle URL encoding automatically
  return tags.map((tag) => ({
    tag: tag,
  }));
}

// Generate metadata for tag pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Tag: ${decodedTag}`,
    description: `Browse blog posts tagged with "${decodedTag}". Explore articles about ${decodedTag} and related topics.`,
    keywords: `${decodedTag}, blog, articles, technology, development, design`,
    openGraph: {
      title: `Tag: ${decodedTag} - Fluxline Blog`,
      description: `Browse blog posts tagged with "${decodedTag}".`,
      url: `https://www.fluxline.pro/blog/tag/${encodeURIComponent(tag)}`,
      siteName: 'Fluxline',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Tag: ${decodedTag} - Fluxline Blog`,
      description: `Browse blog posts tagged with "${decodedTag}".`,
    },
    alternates: {
      canonical: `/blog/tag/${encodeURIComponent(tag)}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface BlogTagPageProps {
  params: Promise<{ tag: string }>;
}

/**
 * Blog Tag Filter Page - Server Component
 * Handles static generation and passes data to client component
 * Uses fuzzy tag matching to handle spaces and case variations
 */
export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // Get all posts and filter by tag (with fuzzy matching)
  const allPosts = getAllBlogPosts();
  const allTags = getAllTags();

  // Find the canonical tag that matches (handles "Personal Growth" vs "PersonalGrowth")
  const matchedTag = findMatchingTag(decodedTag, allTags);

  if (!matchedTag) {
    notFound();
  }

  // Filter posts using fuzzy tag matching
  const posts = allPosts.filter((post) =>
    post.tags.some((postTag) => tagsMatch(postTag, decodedTag))
  );

  if (posts.length === 0) {
    notFound();
  }

  // Use the canonical matched tag for display
  return <BlogTagClient tag={matchedTag} posts={posts} />;
}
