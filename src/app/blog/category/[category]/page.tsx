import React from 'react';
import type { Metadata } from 'next';
import { getAllBlogPosts, getAllCategories } from '../../lib/blogLoader';
import { BlogCategoryClient } from './BlogCategoryClient';
import { notFound } from 'next/navigation';
import { findMatchingTag, tagsMatch } from '@/utils/tag-utils';

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

// Generate metadata for category pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  return {
    title: `Category: ${decodedCategory}`,
    description: `Explore blog posts in the "${decodedCategory}" category. Insights and articles about ${decodedCategory}.`,
    keywords: `${decodedCategory}, blog, articles, category, technology, development, design`,
    openGraph: {
      title: `Category: ${decodedCategory} - Fluxline Blog`,
      description: `Explore blog posts in the "${decodedCategory}" category.`,
      url: `https://www.fluxline.pro/blog/category/${encodeURIComponent(category)}`,
      siteName: 'Fluxline',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Category: ${decodedCategory} - Fluxline Blog`,
      description: `Explore blog posts in the "${decodedCategory}" category.`,
    },
    alternates: {
      canonical: `/blog/category/${encodeURIComponent(category)}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

interface BlogCategoryPageProps {
  params: Promise<{ category: string }>;
}

/**
 * Blog Category Filter Page - Server Component
 * Handles static generation and passes data to client component
 * Uses fuzzy matching to handle spaces and case variations
 */
export default async function BlogCategoryPage({
  params,
}: BlogCategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);

  // Get all posts and filter by category (with fuzzy matching)
  const allPosts = getAllBlogPosts();
  const allCategories = getAllCategories();

  // Find the canonical category that matches
  const matchedCategory = findMatchingTag(decodedCategory, allCategories);

  if (!matchedCategory) {
    notFound();
  }

  // Filter posts using fuzzy category matching
  const posts = allPosts.filter((post) =>
    tagsMatch(post.category, decodedCategory)
  );

  if (posts.length === 0) {
    notFound();
  }

  return <BlogCategoryClient category={matchedCategory} posts={posts} />;
}
