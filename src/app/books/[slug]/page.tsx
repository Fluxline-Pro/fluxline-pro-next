import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBookSlugs, getBookBySlug } from '../lib/bookLoader';
import BookDetailClient from './BookDetailClient';

// Generate static params for all books
export async function generateStaticParams() {
  const slugs = getAllBookSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each book
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    return {
      title: 'Book Not Found | Fluxline',
    };
  }

  return {
    title: book.seoMetadata.title,
    description: book.seoMetadata.description,
    keywords: book.seoMetadata.keywords,
    openGraph: {
      title: book.seoMetadata.title,
      description: book.seoMetadata.description,
      type: 'book',
      publishedTime: book.publishedDate.toISOString(),
      authors: [book.author],
      tags: book.tags,
      images: book.coverImageUrl
        ? [
            {
              url: book.coverImageUrl,
              alt: book.coverImageAlt || book.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: book.seoMetadata.title,
      description: book.seoMetadata.description,
      images: book.coverImageUrl ? [book.coverImageUrl] : undefined,
    },
  };
}

/**
 * Book Detail Page - Server Component
 * Handles static generation and passes data to client component
 */
export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return <BookDetailClient book={book} />;
}
