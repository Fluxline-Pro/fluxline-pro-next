'use client';

import React from 'react';
import FxCard from '@/theme/components/dsm/FxCard';
import { FadeUp } from '@/animations/fade-animations';

export interface CardGridItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  iconPosition?: 'left' | 'center';
  href?: string;
  onClick?: () => void;
  showLearnMore?: boolean;
}

export interface CardGridProps {
  cards: CardGridItem[];
  columns?: 1 | 2 | 3 | 4;
  animationDelay?: number;
  animationStagger?: number;
  className?: string;
}

/**
 * CardGrid - Responsive grid of FxCards with fade-up animations
 * Used for displaying features, services, or content tiles
 */
export function CardGrid({
  cards,
  columns = 3,
  animationDelay = 0,
  animationStagger = 0.05,
  className,
}: CardGridProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
  }[columns];

  return (
    <div
      className={`grid gap-6 ${gridClass} ${className || ''}`}
      style={{ gap: 20 }}
    >
      {cards.map((card, index) => (
        <FadeUp key={card.id} delay={animationDelay + index * animationStagger}>
          <FxCard
            interactive={!!card.href || !!card.onClick}
            href={card.href}
            style={{ padding: '28px 28px 24px' }}
          >
            <h4
              style={{
                fontSize: 'var(--fx-h4-size)',
                fontWeight: 600,
                color: 'var(--fx-text-heading)',
                marginBottom: 8,
              }}
            >
              {card.title}
            </h4>
            <p
              style={{
                color: 'var(--fx-text-muted)',
                fontSize: '0.95rem',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              {card.description}
            </p>
            {card.showLearnMore && (
              <span
                style={{
                  display: 'inline-block',
                  marginTop: 12,
                  color: 'var(--fx-accent)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                Learn More ›
              </span>
            )}
          </FxCard>
        </FadeUp>
      ))}
    </div>
  );
}
