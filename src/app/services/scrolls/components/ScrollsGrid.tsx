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
}

export function ScrollsGrid({ scrolls, layout = 'grid' }: ScrollsGridProps) {
  if (scrolls.length === 0) {
    return (
      <FadeUp>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 64,
            paddingBottom: 64,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <p style={{ fontSize: 18, color: 'var(--fx-text-muted)' }}>
            No scrolls available at this time.
          </p>
        </div>
      </FadeUp>
    );
  }

  const gridStyle: React.CSSProperties =
    layout === 'grid'
      ? {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        };

  return (
    <FadeUp>
      <div style={gridStyle}>
        {scrolls.map((scroll, index) => (
          <FadeUp key={scroll.id} delay={index * 0.1}>
            <ScrollCard scroll={scroll} variant='compact' />
          </FadeUp>
        ))}
      </div>
    </FadeUp>
  );
}
