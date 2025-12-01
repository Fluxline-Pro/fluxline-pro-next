/**
 * CueCardsGrid Component
 * Responsive grid layout for displaying cue cards
 */

'use client';

import { CueCardItem } from '../types';
import { CueCard, CueCardData } from '@/theme/components/cue-card';
import { FadeUp } from '@/animations/fade-animations';

interface CueCardsGridProps {
  cards: CueCardItem[];
  layout?: 'grid' | 'list';
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

/**
 * Convert CueCardItem to CueCardData format for the component
 */
function toCueCardData(item: CueCardItem): CueCardData {
  return {
    id: item.id,
    icon: item.icon,
    title: item.title,
    mantra: item.mantra,
    action: item.action,
    overlay: item.overlay,
    link: item.link,
    linkText: item.linkText,
    tags: item.tags,
  };
}

export function CueCardsGrid({
  cards,
  layout = 'grid',
  variant = 'default',
  className = '',
}: CueCardsGridProps) {
  if (cards.length === 0) {
    return (
      <FadeUp>
        <div className='flex flex-col items-center justify-center py-16 px-4'>
          <p className='text-lg' style={{ color: 'var(--neutralSecondary)' }}>
            No cue cards available at this time.
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
        {cards.map((card, index) => (
          <FadeUp key={card.id} delay={index * 0.1}>
            <CueCard data={toCueCardData(card)} variant={variant} />
          </FadeUp>
        ))}
      </div>
    </FadeUp>
  );
}
