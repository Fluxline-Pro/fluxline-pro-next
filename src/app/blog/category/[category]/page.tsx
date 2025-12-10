import React from 'react';
import { getAllBlogPosts, getAllCategories } from '../../lib/blogLoader';
import { BlogCategoryClient } from './BlogCategoryClient';
import { notFound } from 'next/navigation';

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();

  // Ensure we return an array even if empty
  if (!categories || categories.length === 0) {
    console.warn('No blog categories found for static generation');
    return [];
  }

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

  // Get all posts and filter by category
  const allPosts = getAllBlogPosts();
  const posts = allPosts.filter((post) => post.category === decodedCategory);

  if (posts.length === 0) {
    notFound();
  }

  return <BlogCategoryClient category={decodedCategory} posts={posts} />;
}
