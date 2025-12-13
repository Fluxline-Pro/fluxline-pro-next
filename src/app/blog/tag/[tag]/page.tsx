import React from 'react';
import type { Metadata } from 'next';
import { getAllBlogPosts, getAllTags } from '../../lib/blogLoader';
import { BlogTagClient } from './BlogTagClient';
import { notFound } from 'next/navigation';

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags();

  // Ensure we return an array even if empty
  if (!tags || tags.length === 0) {
    console.warn('No blog tags found for static generation');
    return [];
  }

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
 */
export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // Get all posts and filter by tag
  const allPosts = getAllBlogPosts();
  const posts = allPosts.filter((post) => post.tags.includes(decodedTag));

  if (posts.length === 0) {
    notFound();
  }

  return <BlogTagClient tag={decodedTag} posts={posts} />;
}
