import React from 'react';
import type { Metadata } from 'next';
import { getBlogPostsByCategory, getAllCategories } from '../../lib/blogLoader';
import { BlogCategoryClient } from './BlogCategoryClient';
import { notFound } from 'next/navigation';
import { slugify, resolveSlug } from '@/utils/slug';

// Disable dynamic params - we only serve pre-generated static pages
export const dynamicParams = false;

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();

  // Ensure we return an array even if empty
  if (!categories || categories.length === 0) {
    console.warn('No blog categories found for static generation');
    return [];
  }

  // Route params are URL-safe slugs, so generated folder names are byte-identical
  // whether the incoming request is percent-encoded or not.
  return categories.map((category) => ({
    category: slugify(category),
  }));
}

// Generate metadata for category pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = resolveSlug(categorySlug, getAllCategories());

  if (!category) return {};

  return {
    title: `Category: ${category}`,
    description: `Explore blog posts in the "${category}" category. Insights and articles about ${category}.`,
    keywords: `${category}, blog, articles, category, technology, development, design`,
    openGraph: {
      title: `Category: ${category} - Fluxline Blog`,
      description: `Explore blog posts in the "${category}" category.`,
      url: `https://www.fluxline.pro/blog/category/${categorySlug}`,
      siteName: 'Fluxline',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Category: ${category} - Fluxline Blog`,
      description: `Explore blog posts in the "${category}" category.`,
    },
    alternates: {
      canonical: `/blog/category/${categorySlug}`,
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
 * Resolves the URL slug back to its display name, then filters posts by that name.
 */
export default async function BlogCategoryPage({
  params,
}: BlogCategoryPageProps) {
  const { category: categorySlug } = await params;

  // Resolve the slug to the canonical display name from content frontmatter
  const category = resolveSlug(categorySlug, getAllCategories());

  if (!category) {
    notFound();
  }

  const posts = getBlogPostsByCategory(category);

  if (posts.length === 0) {
    notFound();
  }

  return <BlogCategoryClient category={category} posts={posts} />;
}
