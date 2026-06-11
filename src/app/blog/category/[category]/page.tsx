import React from 'react';
import type { Metadata } from 'next';
import {
  getAllCategories,
  getBlogPostsByCategory,
} from '../../lib/blogLoader';
import { BlogCategoryClient } from './BlogCategoryClient';
import { notFound } from 'next/navigation';
import { buildSlugMap, resolveSlug } from '@/utils/slug';

// Disable dynamic params - we only serve pre-generated static pages
export const dynamicParams = false;

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();

  if (!categories || categories.length === 0) {
    console.warn('No blog categories found for static generation');
    return [];
  }

  return Array.from(buildSlugMap(categories).keys()).map((category) => ({
    category,
  }));
}

// Generate metadata for category pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const displayCategory = resolveSlug(category, getAllCategories());

  if (!displayCategory) {
    return {};
  }

  return {
    title: `Category: ${displayCategory}`,
    description: `Explore blog posts in the "${displayCategory}" category. Insights and articles about ${displayCategory}.`,
    keywords: `${displayCategory}, blog, articles, category, technology, development, design`,
    openGraph: {
      title: `Category: ${displayCategory} - Fluxline Blog`,
      description: `Explore blog posts in the "${displayCategory}" category.`,
      url: `https://www.fluxline.pro/blog/category/${category}`,
      siteName: 'Fluxline',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Category: ${displayCategory} - Fluxline Blog`,
      description: `Explore blog posts in the "${displayCategory}" category.`,
    },
    alternates: {
      canonical: `/blog/category/${category}`,
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
 * Handles static generation and resolves slugged categories for display.
 */
export default async function BlogCategoryPage({
  params,
}: BlogCategoryPageProps) {
  const { category } = await params;
  const matchedCategory = resolveSlug(category, getAllCategories());

  if (!matchedCategory) {
    notFound();
  }

  const posts = getBlogPostsByCategory(matchedCategory);

  if (posts.length === 0) {
    notFound();
  }

  return <BlogCategoryClient category={matchedCategory} posts={posts} />;
}
