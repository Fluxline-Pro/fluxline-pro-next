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
          <p style={{ fontSize: 18, color: 'var(--fx-text-body)' }}>
            No cue cards available at this time.
          </p>
        </div>
      </FadeUp>
    );
  }

  const layoutStyle: React.CSSProperties =
    layout === 'grid'
      ? {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }
      : {
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        };

  return (
    <FadeUp>
      <div className={className} style={layoutStyle}>
        {cards.map((card, index) => (
          <FadeUp key={card.id} delay={index * 0.1}>
            <CueCard data={toCueCardData(card)} variant={variant} />
          </FadeUp>
        ))}
      </div>
    </FadeUp>
  );
}
