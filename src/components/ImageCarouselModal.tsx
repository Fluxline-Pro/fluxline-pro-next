'use client';

/**
 * ImageCarouselModal Component
 * Fullscreen modal for viewing image galleries with navigation
 * Includes left/right arrows, image captions, and keyboard navigation
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from './Modal';
import { Icon } from '@fluentui/react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
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
  const { theme } = useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();

  // Reset index when modal opens (derived state pattern)
  if (isOpen !== lastOpenState) {
    setLastOpenState(isOpen);
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }

  // Navigate to next image
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Navigate to previous image
  const handlePrevious = useCallback(() => {
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

  const navigationButtonStyles = {
    background: theme.palette.white,
    border: `2px solid ${theme.palette.neutralLight}`,
    borderRadius: '50%',
    width: '56px',
    height: '56px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    boxShadow: theme.effects.elevation8,
    zIndex: 10,
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
        backgroundColor: theme.palette.neutralDark,
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
            padding: theme.spacing.l2,
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
                left: theme.spacing.l1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.palette.neutralLighter;
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.palette.white;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Icon
                iconName='ChevronLeft'
                styles={{
                  root: {
                    fontSize: '24px',
                    color: theme.palette.themePrimary,
                  },
                }}
              />
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
                    borderRadius: theme.effects.roundedCorner4,
                  }}
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
                right: theme.spacing.l1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.palette.neutralLighter;
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.palette.white;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Icon
                iconName='ChevronRight'
                styles={{
                  root: {
                    fontSize: '24px',
                    color: theme.palette.themePrimary,
                  },
                }}
              />
            </button>
          )}
        </div>

        {/* Caption and counter */}
        <div
          style={{
            width: '100%',
            padding: `${theme.spacing.l1} ${theme.spacing.l2}`,
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            borderTop: `1px solid ${theme.palette.neutralTertiary}`,
            textAlign: 'center',
          }}
        >
          {/* Image counter */}
          {showNavigation && (
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: theme.fonts.small.fontSize,
                marginBottom: currentImage.caption ? theme.spacing.s1 : 0,
              }}
            >
              {currentIndex + 1} / {images.length}
            </Typography>
          )}

          {/* Caption */}
          {currentImage.caption && (
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: theme.fonts.medium.fontSize,
                fontStyle: 'italic',
              }}
            >
              {currentImage.caption}
            </Typography>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ImageCarouselModal;
