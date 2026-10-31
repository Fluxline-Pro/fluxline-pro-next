import React from 'react';
import type { Metadata } from 'next';
import { getAllBooks } from './lib/bookLoader';
import BooksListingClient from './BooksListingClient';

export const metadata: Metadata = {
  title: 'The Resonance Core Framework™ Book & Workbook',
  description:
    'The Resonance Core Framework™ book and companion workbook by Terence Waters, targeted for Q1 2027. Preorders open in early November 2026. See what is inside.',
  keywords: [
    'The Resonance Core Framework book',
    'resonance core framework',
    'RCF',
    'DRIVE model',
    'The Decision Integrity Index',
    'Behavioral Gravity',
    'book',
    'companion workbook',
    'identity',
    'alignment',
    'personal transformation',
    'self-improvement book',
    'Terence Waters',
    'Terence Waters book',
    'Fluxline',
  ],
  openGraph: {
    title: 'The Resonance Core Framework™ Book & Workbook',
    description:
      'The Resonance Core Framework™ book and companion workbook by Terence Waters, targeted for Q1 2027. Preorders open in early November 2026. See what is inside.',
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
    title: 'The Resonance Core Framework™ Book & Workbook',
    description:
      'The Resonance Core Framework™ book and companion workbook by Terence Waters, targeted for Q1 2027. Preorders open in early November 2026. See what is inside.',
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
