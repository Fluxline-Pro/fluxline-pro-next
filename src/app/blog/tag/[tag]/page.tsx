import React from 'react';
import { getBlogPosts, getAllTags } from '../../blogData';
import { BlogTagClient } from './BlogTagClient';
import { notFound } from 'next/navigation';

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
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

  // Get posts filtered by tag
  const posts = getBlogPosts({ tag: decodedTag });

  if (posts.length === 0) {
    notFound();
  }

  return <BlogTagClient tag={decodedTag} posts={posts} />;
}
