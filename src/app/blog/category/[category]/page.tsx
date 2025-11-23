import React from 'react';
import { getBlogPosts, getAllCategories } from '../../blogData';
import { BlogCategoryClient } from './BlogCategoryClient';
import { notFound } from 'next/navigation';

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category: category,
  }));
}

interface BlogCategoryPageProps {
  params: Promise<{ category: string }>;
}

/**
 * Blog Category Filter Page - Server Component
 * Handles static generation and passes data to client component
 */
export default async function BlogCategoryPage({
  params,
}: BlogCategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  // Get posts filtered by category
  const posts = getBlogPosts({ category: decodedCategory });

  if (posts.length === 0) {
    notFound();
  }

  return <BlogCategoryClient category={decodedCategory} posts={posts} />;
}
