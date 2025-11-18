/**
 * ScrollsGrid Component
 * Responsive grid layout for displaying scroll cards
 */

'use client';

import { ScrollItem } from '../types';
import { ScrollCard } from './ScrollCard';
import { FadeUp } from '@/animations/fade-animations';

interface ScrollsGridProps {
  scrolls: ScrollItem[];
  layout?: 'grid' | 'list';
  className?: string;
}

export function ScrollsGrid({
  scrolls,
  layout = 'grid',
  className = '',
}: ScrollsGridProps) {
  if (scrolls.length === 0) {
    return (
      <FadeUp>
        <div className='flex flex-col items-center justify-center py-16 px-4'>
          <p className='text-lg' style={{ color: 'var(--neutralSecondary)' }}>
            No scrolls available at this time.
          </p>
        </div>
      </FadeUp>
    );
  }

  const gridClasses =
    layout === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      : 'flex flex-col gap-4';

  return (
    <FadeUp>
      <div className={`${gridClasses} ${className}`}>
        {scrolls.map((scroll, index) => (
          <FadeUp key={scroll.id} delay={index * 0.1}>
            <ScrollCard scroll={scroll} variant='compact' />
          </FadeUp>
        ))}
      </div>
    </FadeUp>
  );
}
