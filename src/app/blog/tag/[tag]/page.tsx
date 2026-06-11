import React from 'react';
import type { Metadata } from 'next';
import { getAllTags, getBlogPostsByTag } from '../../lib/blogLoader';
import { BlogTagClient } from './BlogTagClient';
import { notFound } from 'next/navigation';
import { buildSlugMap, resolveSlug } from '@/utils/slug';

// Disable dynamic params - we only serve pre-generated static pages
export const dynamicParams = false;

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags();

  if (!tags || tags.length === 0) {
    console.warn('No blog tags found for static generation');
    return [];
  }

  return Array.from(buildSlugMap(tags).keys()).map((tag) => ({ tag }));
}

// Generate metadata for tag pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const displayTag = resolveSlug(tag, getAllTags());

  if (!displayTag) {
    return {};
  }

  return {
    title: `Tag: ${displayTag}`,
    description: `Browse blog posts tagged with "${displayTag}". Explore articles about ${displayTag} and related topics.`,
    keywords: `${displayTag}, blog, articles, technology, development, design`,
    openGraph: {
      title: `Tag: ${displayTag} - Fluxline Blog`,
      description: `Browse blog posts tagged with "${displayTag}".`,
      url: `https://www.fluxline.pro/blog/tag/${tag}`,
      siteName: 'Fluxline',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Tag: ${displayTag} - Fluxline Blog`,
      description: `Browse blog posts tagged with "${displayTag}".`,
    },
    alternates: {
      canonical: `/blog/tag/${tag}`,
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
 * Handles static generation and resolves slugged tags for display.
 */
export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag } = await params;
  const matchedTag = resolveSlug(tag, getAllTags());

  if (!matchedTag) {
    notFound();
  }

  const posts = getBlogPostsByTag(matchedTag);

  if (posts.length === 0) {
    notFound();
  }

  return <BlogTagClient tag={matchedTag} posts={posts} />;
}
