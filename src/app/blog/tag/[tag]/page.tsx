import React from 'react';
import type { Metadata } from 'next';
import { getBlogPostsByTag, getAllTags } from '../../lib/blogLoader';
import { BlogTagClient } from './BlogTagClient';
import { notFound } from 'next/navigation';
import { slugify, resolveSlug } from '@/utils/slug';

// Disable dynamic params - we only serve pre-generated static pages
export const dynamicParams = false;

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTags();

  // Ensure we return an array even if empty
  if (!tags || tags.length === 0) {
    console.warn('No blog tags found for static generation');
    return [];
  }

  // Route params are URL-safe slugs, so generated folder names are byte-identical
  // whether the incoming request is percent-encoded or not.
  return tags.map((tag) => ({
    tag: slugify(tag),
  }));
}

// Generate metadata for tag pages
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = resolveSlug(tagSlug, getAllTags());

  if (!tag) return {};

  return {
    title: `Tag: ${tag}`,
    description: `Browse blog posts tagged with "${tag}". Explore articles about ${tag} and related topics.`,
    keywords: `${tag}, blog, articles, technology, development, design`,
    openGraph: {
      title: `Tag: ${tag} - Fluxline Blog`,
      description: `Browse blog posts tagged with "${tag}".`,
      url: `https://www.fluxline.pro/blog/tag/${tagSlug}`,
      siteName: 'Fluxline',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `Tag: ${tag} - Fluxline Blog`,
      description: `Browse blog posts tagged with "${tag}".`,
    },
    alternates: {
      canonical: `/blog/tag/${tagSlug}`,
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
 * Resolves the URL slug back to its display name, then filters posts by that name.
 */
export default async function BlogTagPage({ params }: BlogTagPageProps) {
  const { tag: tagSlug } = await params;

  // Resolve the slug to the canonical display name from content frontmatter
  const tag = resolveSlug(tagSlug, getAllTags());

  if (!tag) {
    notFound();
  }

  const posts = getBlogPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return <BlogTagClient tag={tag} posts={posts} />;
}
