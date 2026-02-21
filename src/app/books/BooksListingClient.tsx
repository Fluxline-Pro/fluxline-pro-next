'use client';

import React from 'react';
import { format } from 'date-fns';
import { ContentListingPage } from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import { Book } from './types';

interface BooksListingClientProps {
  books: Book[];
}

/**
 * Books Listing Client Wrapper
 * Transforms book data for the unified ContentListingPage
 * No filters shown per requirements: "DO NOT show the main page with the filters"
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

  // Build results message
  const resultsMessage = `${books.length} ${books.length === 1 ? 'book' : 'books'} available`;

  return (
    <ContentListingPage
      title='Books'
      iconName={getIconForPath('/books') || 'BookAnswers'}
      description='Explore our collection of transformative books and resources. Purchase directly from Fluxline.pro or through major retailers.'
      basePath='/books'
      cards={cards}
      filters={[]} // No filters per requirements
      resultsMessage={resultsMessage}
      emptyStateTitle='No Books Available Yet'
      emptyStateMessage='Check back soon for our upcoming publications.'
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
