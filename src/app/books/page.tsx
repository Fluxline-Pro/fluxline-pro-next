import React from 'react';
import type { Metadata } from 'next';
import { getAllBooks } from './lib/bookLoader';
import BooksListingClient from './BooksListingClient';

export const metadata: Metadata = {
  title: 'The Resonance Core Framework™ — Books | Fluxline',
  description:
    'The Resonance Core Framework™ explained: what it is, the DRIVE Model, who it is for, and what will be offered with the forthcoming book and companion workbook.',
  keywords:
    'resonance core framework, RCF, DRIVE model, book, companion workbook, identity, alignment, personal transformation, Terence Waters, Fluxline',
  openGraph: {
    title: 'The Resonance Core Framework™ — Coming Soon',
    description:
      'A practical system for making change that holds — built on alignment rather than force. Read what the framework is and what ships with the book.',
    url: 'https://www.fluxline.pro/books',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/RCF_Logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'The Resonance Core Framework™',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Resonance Core Framework™ — Coming Soon',
    description:
      'A practical system for making change that holds — built on alignment rather than force.',
    images: ['/images/RCF_Logo.jpeg'],
  },
  alternates: {
    canonical: '/books',
  },
  // The page now carries the full framework explainer rather than a thin
  // pre-launch stub, so it is safe to index.
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
