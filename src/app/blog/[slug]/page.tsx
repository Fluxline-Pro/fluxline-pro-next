import React from 'react';
import { blogPostsMockData } from '../blogData';
import { BlogPostDetailClient } from './BlogPostDetailClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPostsMockData.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsMockData.find((p) => p.slug === slug);

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
  const post = blogPostsMockData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostDetailClient post={post} />;
}
