/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import Script from 'next/script';
import { getBlogPostBySlug } from '../lib/blogLoader';
import { BlogPostDetailClient } from './BlogPostDetailClient';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { safeJsonLdStringify } from '@/utils/jsonLd';

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
    authors: [
      { name: post.author },
      { name: 'Fluxline Resonance Group', url: 'https://www.fluxline.pro' },
    ],
    openGraph: {
      title: post.seoMetadata.title,
      description: post.seoMetadata.description,
      type: 'article',
      publishedTime: post.publishedDate.toISOString(),
      modifiedTime: post.lastUpdated?.toISOString(),
      authors: [post.author],
      tags: post.tags,
      url: `https://www.fluxline.pro/blog/${slug}`,
      siteName: 'Fluxline Resonance Group',
      images: post.imageUrl
        ? [{ url: post.imageUrl, alt: post.imageAlt || post.title }]
        : [
            {
              url: '/images/FluxlineLogo.png',
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoMetadata.title,
      description: post.seoMetadata.description,
      creator: '@fluxlinepro',
    },
    alternates: {
      canonical: `/blog/${slug}`,
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

  // Article JSON-LD structured data for AI ingest and rich results
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://www.fluxline.pro/blog/${slug}#article`,
    headline: post.title,
    description: post.seoMetadata.description,
    url: `https://www.fluxline.pro/blog/${slug}`,
    datePublished: post.publishedDate.toISOString(),
    dateModified: (post.lastUpdated ?? post.publishedDate).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
      ...(post.author === 'Terence Waters' && {
        '@id': 'https://www.terencewaters.com/#person',
        url: 'https://www.terencewaters.com',
      }),
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.fluxline.pro/#organization',
      name: 'Fluxline Resonance Group',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.fluxline.pro/images/FluxlineLogo.png',
      },
    },
    image: post.imageUrl
      ? `https://www.fluxline.pro${post.imageUrl}`
      : 'https://www.fluxline.pro/images/FluxlineLogo.png',
    keywords: post.seoMetadata.keywords?.join(', '),
    articleSection: post.category,
    ...(post.tags?.length > 0 && {
      about: post.tags.map((tag) => ({ '@type': 'Thing', name: tag })),
    }),
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://www.fluxline.pro/blog#blog',
      name: 'Fluxline Blog',
      publisher: {
        '@id': 'https://www.fluxline.pro/#organization',
      },
    },
  };

  return (
    <>
      <Script
        id={`article-schema-${slug}`}
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(articleSchema) }}
      />
      <BlogPostDetailClient post={post} />
    </>
  );
}
