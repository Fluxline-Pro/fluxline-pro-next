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
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-16 md:py-24">
      <div className="text-center max-w-lg">
        <h2 className="text-3xl font-bold mb-4">Scroll Not Found</h2>
        <p className="text-lg mb-6" style={{ color: 'var(--neutralSecondary)' }}>
          The scroll you're looking for might have been moved or doesn't exist.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--themePrimary)',
              color: 'var(--white)',
            }}
          >
            Try Again
          </button>
          <Link
            href="/services/scrolls"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold border transition-colors"
            style={{
              borderColor: 'var(--neutralLight)',
              color: 'var(--themePrimary)',
            }}
          >
            View All Scrolls
          </Link>
        </div>
      </div>
    </div>
  );
}
