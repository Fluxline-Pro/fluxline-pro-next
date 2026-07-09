/**
 * Error Boundary for Individual Scroll Detail Page
 */

'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function ScrollDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Scroll detail page error:', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 512 }}>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 700,
            marginBottom: 16,
            color: 'var(--fx-text-heading)',
          }}
        >
          Scroll Not Found
        </h2>
        <p
          style={{
            fontSize: 18,
            marginBottom: 24,
            color: 'var(--fx-text-body)',
          }}
        >
          The scroll you&apos;re looking for might have been moved or doesn&apos;t exist.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            justifyContent: 'center',
          }}
        >
          <button
            onClick={reset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              borderRadius: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'filter 0.2s',
              backgroundColor: 'var(--fx-accent)',
              color: 'var(--fx-accent-ink)',
            }}
          >
            Try Again
          </button>
          <Link
            href="/services/scrolls"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 12,
              paddingBottom: 12,
              borderRadius: 12,
              fontWeight: 600,
              border: '1px solid var(--fx-border)',
              textDecoration: 'none',
              transition: 'filter 0.2s',
              color: 'var(--fx-accent)',
            }}
          >
            View All Scrolls
          </Link>
        </div>
      </div>
    </div>
  );
}
