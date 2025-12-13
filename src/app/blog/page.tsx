import React from 'react';
import type { Metadata } from 'next';
import { BlogListingClientWrapper } from './BlogListingClientWrapper';
import {
  getAllBlogPosts,
  getAllTags,
  getAllCategories,
} from './lib/blogLoader';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Explore insights on technology, design, business transformation, and strategic thinking. Articles covering web development, consulting, and professional growth.',
  keywords:
    'blog, technology, web development, design, business transformation, consulting, professional development, strategy, innovation',
  openGraph: {
    title: 'Blog - Fluxline',
    description:
      'Insights on technology, design, business transformation, and strategic thinking.',
    url: 'https://www.fluxline.pro/blog',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Fluxline',
    description:
      'Insights on technology, design, business transformation, and strategic thinking.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/blog',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Blog Page - Server Component
 * Loads blog posts from file system and passes to client wrapper
 */
export default function BlogPage() {
  return (
    <BlogListingClientWrapper
      initialPosts={getAllBlogPosts()}
      allTags={getAllTags()}
      allCategories={getAllCategories()}
    />
  );
}
