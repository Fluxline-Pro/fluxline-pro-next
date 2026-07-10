'use client';

/**
 * ImageCarouselModal Component
 * Fullscreen modal for viewing image galleries with navigation
 * Includes left/right arrows, image captions, and keyboard navigation
 *
 * Styled with DSM CSS custom properties (var(--fx-*) tokens).
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from './Modal';
import { useColorVisionFilter } from '@/theme/hooks/useColorVisionFilter';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { LoadingSpinner } from '@/theme/components/structural';
import Image from 'next/image';

export interface CarouselImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface ImageCarouselModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onDismiss: () => void;
  /** Array of images to display in carousel */
  images: CarouselImage[];
  /** Initial image index to display (default: 0) */
  initialIndex?: number;
}

export const ImageCarouselModal: React.FC<ImageCarouselModalProps> = ({
  isOpen,
  onDismiss,
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [lastOpenState, setLastOpenState] = useState(isOpen);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { shouldReduceMotion } = useReducedMotion();
  const { filter: colorVisionFilter } = useColorVisionFilter();

  // Reset index when modal opens (derived state pattern)
  if (isOpen !== lastOpenState) {
    setLastOpenState(isOpen);
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsImageLoading(true);
    }
  }

  // Navigate to next image
  const handleNext = useCallback(() => {
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Navigate to previous image
  const handlePrevious = useCallback(() => {
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrevious]);

  const currentImage = images[currentIndex];
  const showNavigation = images.length > 1;

  // Image animation variants
  const imageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleNextWithDirection = () => {
    setDirection(1);
    handleNext();
  };

  const handlePreviousWithDirection = () => {
    setDirection(-1);
    handlePrevious();
  };

  const navigationButtonStyles: React.CSSProperties = {
    background: 'var(--fx-surface-card)',
    border: '2px solid var(--fx-border)',
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
    zIndex: 10,
    fontSize: '24px',
    color: 'var(--fx-accent)',
    lineHeight: 1,
    padding: 0,
  };

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      ariaLabel='Image gallery'
      maxWidth='95vw'
      maxHeight='95vh'
      showCloseButton={true}
      style={{
        backgroundColor: 'var(--fx-surface-card)',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Image container with navigation */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '28px',
          }}
        >
          {/* Previous button */}
          {showNavigation && (
            <button
              type='button'
              onClick={handlePreviousWithDirection}
              aria-label='Previous image'
              style={{
                ...navigationButtonStyles,
                position: 'absolute',
                left: '20px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--fx-hover-fill)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--fx-surface-card)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {'‹'}
            </button>
          )}

          {/* Image with animation */}
          <div
            style={{
              position: 'relative',
              maxWidth: '85%',
              maxHeight: '70vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Loading spinner */}
            {isImageLoading && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 5,
                }}
              >
                <LoadingSpinner showLabel={false} />
              </div>
            )}

            <AnimatePresence initial={false} custom={direction} mode='wait'>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={shouldReduceMotion ? undefined : imageVariants}
                initial={shouldReduceMotion ? 'center' : 'enter'}
                animate='center'
                exit={shouldReduceMotion ? 'center' : 'exit'}
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt}
                  width={1200}
                  height={800}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '70vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    opacity: isImageLoading ? 0 : 1,
                    transition: 'opacity 0.2s ease-in-out',
                    filter: colorVisionFilter,
                  }}
                  onLoadingComplete={() => setIsImageLoading(false)}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button */}
          {showNavigation && (
            <button
              type='button'
              onClick={handleNextWithDirection}
              aria-label='Next image'
              style={{
                ...navigationButtonStyles,
                position: 'absolute',
                right: '20px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--fx-hover-fill)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--fx-surface-card)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {'›'}
            </button>
          )}
        </div>

        {/* Caption and counter */}
        <div
          style={{
            width: '100%',
            padding: '20px 28px',
            backgroundColor: 'var(--fx-surface-alt)',
            borderTop: '1px solid var(--fx-border)',
            textAlign: 'center',
          }}
        >
          {/* Image counter */}
          {showNavigation && (
            <p
              style={{
                color: 'var(--fx-text-muted)',
                fontSize: '12px',
                margin: 0,
                marginBottom: currentImage.caption ? '8px' : 0,
              }}
            >
              {currentIndex + 1} / {images.length}
            </p>
          )}

          {/* Caption */}
          {currentImage.caption && (
            <p
              style={{
                color: 'var(--fx-text-heading)',
                fontSize: '14px',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              {currentImage.caption}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageCarouselModal;
