'use client';

import React from 'react';
import { format } from 'date-fns';
import { ContentListingPage } from '@/components/ContentListingPage';
import { Book } from './types';

interface BooksListingClientProps {
  books: Book[];
}

/**
 * Books Listing Client Wrapper
 * Transforms book data for the unified ContentListingPage
 */
export default function BooksListingClient({ books }: BooksListingClientProps) {
  // Transform books to card format
  const cards = React.useMemo(() => {
    return books.map((book) => ({
      id: book.slug,
      title: book.title,
      description: book.excerpt,
      imageUrl: book.coverImageUrl,
      imageAlt: book.coverImageAlt || book.title,
      imageText: `${book.author}${book.publishedDate ? ` • ${format(book.publishedDate, 'MMMM yyyy')}` : ''}`,
    }));
  }, [books]);

  return (
    <ContentListingPage
      title="Reading List"
      kicker="Library"
      subhead="Books that shaped the work."
      description="Explore our collection of transformative books and resources."
      basePath="/books"
      cards={cards}
      filters={[]}
      emptyStateTitle="No Books Available Yet"
      emptyStateMessage="Check back soon for our upcoming publications."
      ctaSection={{
        title: 'Stay Updated on New Releases',
        description:
          'Be the first to know when new books and resources become available. Join our mailing list for exclusive content and early access.',
        buttons: [
          {
            label: 'Get in Touch',
            variant: 'primary',
            path: '/contact',
          },
          {
            label: 'Explore Our Services',
            variant: 'secondary',
            path: '/services',
          },
        ],
      }}
    />
  );
}
