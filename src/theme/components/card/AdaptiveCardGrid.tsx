'use client';

import React from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { UnifiedCard } from './unified-card';
import { UnifiedCardContainer } from './UnifiedCardContainer';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';

export interface AdaptiveCardGridProps {
  cards: Array<{
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    imageText?: string;
  }>;
  viewType?: 'grid' | 'small' | 'large' | 'image';
  gap?: string;
  className?: string;
  gridColumns?: number;
  onCardClick?: (id: string) => void;
}

/**
 * AdaptiveCardGrid - A smart card grid that adapts its layout based on view type
 *
 * Features:
 * - Responsive column counts based on device breakpoints
 * - Handles grid, small, large, and image view types
 * - Falls back to standard grid behavior across all view types
 * - Responsive across mobile, tablet, and desktop breakpoints
 * - Smooth fade transitions when switching view types
 */
export const AdaptiveCardGrid: React.FC<AdaptiveCardGridProps> = ({
  cards,
  viewType = 'grid',
  gap = '1rem',
  className,
  gridColumns,
  onCardClick,
}) => {
  const { shouldReduceMotion } = useReducedMotion();

  // Animation variants for view type transitions
  const fadeInVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.4, 0.0, 0.2, 1.0],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={viewType}
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={fadeInVariants}
      >
        <UnifiedCardContainer
          viewType={viewType}
          gap={gap}
          className={className}
        >
          {cards.map((card, index) => (
            <UnifiedCard
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              imageAlt={card.imageAlt}
              imageText={card.imageText}
              viewType={viewType}
              delay={index * 25} // Much faster stagger: 25ms per card
              showTitleOnImage={viewType === 'image'}
              onClick={onCardClick ? () => onCardClick(card.id) : undefined}
            />
          ))}
        </UnifiedCardContainer>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdaptiveCardGrid;
