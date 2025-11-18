/**
 * Not Found Page for Scroll Detail
 */

import Link from 'next/link';

export default function ScrollNotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-16 md:py-24">
      <div className="text-center max-w-lg">
        <h2 className="text-3xl font-bold mb-4">Scroll Not Found</h2>
        <p className="text-lg mb-6" style={{ color: 'var(--neutralSecondary)' }}>
          The scroll you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/services/scrolls"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--themePrimary)',
              color: 'var(--white)',
            }}
          >
            View All Scrolls
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold border transition-colors"
            style={{
              borderColor: 'var(--neutralLight)',
              color: 'var(--themePrimary)',
            }}
          >
            Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
}
