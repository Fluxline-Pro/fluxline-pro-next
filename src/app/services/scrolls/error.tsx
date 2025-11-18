/**
 * Error Boundary for Scrolls Pages
 */

'use client';

import { useEffect } from 'react';

export default function ScrollsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Scrolls page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-16 md:py-24">
      <div className="text-center max-w-lg">
        <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-lg mb-6">
          We encountered an error loading the scrolls. Please try again.
        </p>
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
      </div>
    </div>
  );
}
