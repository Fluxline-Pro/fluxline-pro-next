'use client';

import React from 'react';
import { UnifiedCard } from './unified-card';
import { UnifiedCardContainer } from './UnifiedCardContainer';

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
  enableImageAdaptation?: boolean;
  className?: string;
  gridColumns?: number;
  onCardClick?: (id: string) => void;
}

/**
 * AdaptiveCardGrid - A smart card grid that adapts its layout based on image dimensions
 *
 * Features:
 * - Automatically adjusts column count based on image aspect ratios
 * - Handles landscape, portrait, and square images intelligently
 * - Falls back to standard grid behavior when image adaptation is disabled
 * - Responsive across mobile, tablet, and desktop breakpoints
 */
export const AdaptiveCardGrid: React.FC<AdaptiveCardGridProps> = ({
  cards,
  viewType = 'grid',
  gap = '1rem',
  enableImageAdaptation = true,
  className,
  gridColumns,
  onCardClick,
}) => {
  const [imageDimensions, setImageDimensions] = React.useState<{
    width: number;
    height: number;
    aspectRatio: number;
  } | null>(null);

  // Track the first image's dimensions to determine container layout
  const handleImageDimensionsChange = React.useCallback(
    (
      dimensions: { width: number; height: number; aspectRatio: number } | null
    ) => {
      // Use the first image's dimensions to set the container layout
      if (dimensions && !imageDimensions) {
        setImageDimensions(dimensions);
      } else if (!dimensions) {
        setImageDimensions(null);
      }
    },
    [imageDimensions]
  );

  return (
    <UnifiedCardContainer
      viewType={viewType}
      gap={gap}
      imageDimensions={imageDimensions}
      adaptToImageDimensions={enableImageAdaptation}
      className={className}
      gridColumns={gridColumns}
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
          onImageDimensionsChange={
            enableImageAdaptation && index === 0
              ? handleImageDimensionsChange
              : undefined
          }
        />
      ))}
    </UnifiedCardContainer>
  );
};

export default AdaptiveCardGrid;
