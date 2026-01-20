'use client';

import React from 'react';
import { Book } from './types';
import { useTheme } from '@fluentui/react';
import { InteractiveCard } from '@/components/InteractiveCard';

interface BooksListingClientProps {
  books: Book[];
}

/**
 * Books Listing - Client Component
 * Simple display of available books without filters
 * As per requirements: "DO NOT show the main page with the filters"
 */
export default function BooksListingClient({
  books,
}: BooksListingClientProps) {
  const theme = useTheme();

  // If only one book, could redirect directly, but showing simple grid is better UX
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.palette.neutralLighterAlt,
        padding: '4rem 1rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Page Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: theme.palette.themePrimary }}
          >
            Books
          </h1>
          <p
            className="text-lg"
            style={{ color: theme.palette.neutralPrimary, maxWidth: '800px', margin: '0 auto' }}
          >
            Explore our collection of transformative books and resources. Purchase directly from
            Fluxline.pro or through major retailers.
          </p>
        </div>

        {/* Books Grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          }}
        >
          {books.map((book) => (
            <InteractiveCard
              key={book.id}
              id={book.id}
              title={book.title}
              description={book.excerpt}
              icon="BookAnswers"
              href={`/books/${book.slug}`}
              iconPosition="center"
              showLearnMore={true}
            />
          ))}
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
            }}
          >
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: theme.palette.neutralPrimary }}
            >
              No Books Available Yet
            </h2>
            <p style={{ color: theme.palette.neutralSecondary }}>
              Check back soon for our upcoming publications.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
