/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { getBlogPostBySlug } from '../lib/blogLoader';
import { BlogPostDetailClient } from './BlogPostDetailClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Conditionally import server-only functions
let getAllBlogPostSlugs: (() => string[]) | undefined;
if (typeof window === 'undefined') {
  try {
    const loader = require('../lib/blogLoader');
    getAllBlogPostSlugs = loader.getAllBlogPostSlugs;
  } catch (error) {
    console.warn('Could not load blog loader for generateStaticParams', error);
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  if (getAllBlogPostSlugs) {
    const slugs = getAllBlogPostSlugs();
    return slugs.map((slug) => ({
      slug: slug,
    }));
  }
  // Fallback: return empty array if loader not available
  return [];
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: post.seoMetadata.title,
    description: post.seoMetadata.description,
    keywords: post.seoMetadata.keywords,
    openGraph: {
      title: post.seoMetadata.title,
      description: post.seoMetadata.description,
      type: 'article',
      publishedTime: post.publishedDate.toISOString(),
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoMetadata.title,
      description: post.seoMetadata.description,
    },
  };
}

/**
 * Individual Blog Post Detail Page - Server Component
 * Handles static generation and passes data to client component
 */
export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Find the blog post data
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetailClient post={post} />;
}
