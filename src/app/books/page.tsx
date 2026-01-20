import React from 'react';
import type { Metadata } from 'next';
import { getAllBooks } from './lib/bookLoader';
import BooksListingClient from './BooksListingClient';

export const metadata: Metadata = {
  title: 'Books - Fluxline',
  description:
    'Explore our collection of books on transformation, business strategy, and personal development. Purchase directly or through major retailers.',
  keywords:
    'books, resonance core framework, transformation, business books, self-help, professional development',
  openGraph: {
    title: 'Books - Fluxline',
    description:
      'Explore our collection of transformative books and resources.',
    url: 'https://www.fluxline.pro/books',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Books',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Books - Fluxline',
    description:
      'Explore our collection of transformative books and resources.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/books',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Books Page - Server Component
 * Loads books from Markdown files and passes to client component
 */
export default async function BooksPage() {
  const allBooks = getAllBooks();

  return <BooksListingClient books={allBooks} />;
}
