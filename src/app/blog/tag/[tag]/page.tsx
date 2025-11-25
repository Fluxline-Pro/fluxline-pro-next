import React from 'react';
import { getAllBlogPosts, getAllTags } from '../../lib/blogLoader';
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

  // Get all posts and filter by tag
  const allPosts = getAllBlogPosts();
  const posts = allPosts.filter((post) => post.tags.includes(decodedTag));

  if (posts.length === 0) {
    notFound();
  }

  return <BlogTagClient tag={decodedTag} posts={posts} />;
}
