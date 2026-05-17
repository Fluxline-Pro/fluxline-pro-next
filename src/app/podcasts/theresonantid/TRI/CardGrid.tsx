'use client';

import React from 'react';
import { InteractiveCard } from '@/components/InteractiveCard';
import { FadeUp } from '@/animations/fade-animations';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

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
 * CardGrid - Responsive grid of InteractiveCards with fade-up animations
 * Used for displaying features, services, or content tiles
 */
export function CardGrid({
  cards,
  columns = 3,
  animationDelay = 0,
  animationStagger = 0.05,
  className,
}: CardGridProps) {
  const { theme } = useAppTheme();

  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
  }[columns];

  return (
    <div
      className={`grid gap-6 ${gridClass} ${className || ''}`}
      style={{ gap: theme.spacing.l }}
    >
      {cards.map((card, index) => (
        <FadeUp key={card.id} delay={animationDelay + index * animationStagger}>
          <InteractiveCard
            id={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconPosition={card.iconPosition || 'center'}
            href={card.href}
            onClick={card.onClick}
            showLearnMore={card.showLearnMore}
          />
        </FadeUp>
      ))}
    </div>
  );
}
