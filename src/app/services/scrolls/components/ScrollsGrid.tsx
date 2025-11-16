/**
 * ScrollsGrid Component
 * Responsive grid layout for displaying scroll cards
 */

'use client';

import { ScrollItem } from '../types';
import { ScrollCard } from './ScrollCard';

interface ScrollsGridProps {
  scrolls: ScrollItem[];
  layout?: 'grid' | 'list';
  className?: string;
}

export function ScrollsGrid({ scrolls, layout = 'grid', className = '' }: ScrollsGridProps) {
  if (scrolls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <p className="text-lg" style={{ color: 'var(--neutralSecondary)' }}>
          No scrolls available at this time.
        </p>
      </div>
    );
  }

  const gridClasses =
    layout === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'flex flex-col gap-4';

  return (
    <div className={`${gridClasses} ${className}`}>
      {scrolls.map((scroll) => (
        <ScrollCard key={scroll.id} scroll={scroll} variant="compact" />
      ))}
    </div>
  );
}
