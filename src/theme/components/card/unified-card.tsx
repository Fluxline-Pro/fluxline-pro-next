'use client';

import React from 'react';

import { useAppTheme } from '../../hooks/useAppTheme';
// import { useIsMobile, useDeviceOrientation } from '../../hooks/useMediaQuery';
import { useColorVisionFilter } from '../../hooks/useColorVisionFilter';
import { useReducedMotion } from '../../hooks/useReducedMotion';
// import useIsTextColorLight from '../../hooks/useIsTextColorLight';
import { FadeIn } from '../../../animations/fade-animations';
import { Card } from '../card/card';
import Image from 'next/image';

export type CardViewType = 'grid' | 'small' | 'large' | 'image';

export interface UnifiedCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  onClick?: () => void;
  isLoading?: boolean;
  elevation?: 'low' | 'medium' | 'high';
  viewType: CardViewType;
  // Image card specific props
  imageText?: string;
  delay?: number;
  useSpinner?: boolean;
  altText?: string;
  // Optional flag to show title on image
  showTitleOnImage?: boolean;
  // Optional style overrides
  imageContainerStyle?: React.CSSProperties;
  contentContainerStyle?: React.CSSProperties;
  // Flag to indicate this card is used as the left panel in ViewportGrid
  isViewportLeftPanel?: boolean;
  // Flag to skip dark mode filter (useful for dark logos)
  skipDarkModeFilter?: boolean;
}

/**
 * UnifiedCard - Flexible card component for image display
 * Simplified version focused on page-wrapper image card use case
 * Handles:
 * - Image loading with spinner
 * - Aspect ratio preservation for landscape images
 * - Dark mode filtering
 * - Title overlay on images
 * - Responsive sizing
 */
export const UnifiedCard: React.FC<UnifiedCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
  onClick,
  isLoading = false,
  elevation = 'medium',
  viewType,
  imageText,
  delay = 0,
  useSpinner = false,
  altText,
  showTitleOnImage = false,
  imageContainerStyle,
  contentContainerStyle,
  isViewportLeftPanel = false,
  skipDarkModeFilter = false,
}) => {
  const { theme } = useAppTheme();
  // const isMobile = useIsMobile(); -- commented out for now due to not used yet
  // const deviceOrientation = useDeviceOrientation(); -- commented out for now due to not used yet
  const { filter } = useColorVisionFilter(skipDarkModeFilter);
  const { shouldReduceMotion } = useReducedMotion();

  // Get text color based on image brightness
  // const { isLight } = useIsTextColorLight(imageUrl || ''); -- commmented out for now due to not used yet

  // Loading state management
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isLandscape, setIsLandscape] = React.useState(false);
  const [imageDimensions, setImageDimensions] = React.useState<{
    width: number;
    height: number;
    aspectRatio: number;
  } | null>(null);

  // Check if image is landscape and handle image loading
  React.useEffect(() => {
    if (imageUrl) {
      // Reset loading state when imageUrl changes
      setImageLoaded(false);
      setImageDimensions(null);
      setIsLandscape(false);

      const img = new window.Image();
      img.onload = () => {
        // Capture the image's natural dimensions
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const aspectRatio = naturalWidth / naturalHeight;

        // Store image dimensions for container sizing
        setImageDimensions({
          width: naturalWidth,
          height: naturalHeight,
          aspectRatio: aspectRatio,
        });

        // Mark image as loaded first
        setImageLoaded(true);

        // Only apply landscape detection when this card is in the ViewportGrid left panel
        if (isViewportLeftPanel) {
          const isImageLandscape = naturalWidth > naturalHeight;

          if (isImageLandscape) {
            // Add proper timing for smooth animation sequence
            const fadeInTime = 300; // ms - time for image to fade in
            const containerTransitionDelay = fadeInTime + 50; // ms

            setTimeout(() => {
              setIsLandscape(true);
            }, containerTransitionDelay);
          }
        }
      };
      img.onerror = () => {
        // Still mark as loaded on error to prevent infinite loading state
        setImageLoaded(true);
        setImageDimensions(null);
      };

      // Start loading the image
      img.src = imageUrl;
    }
  }, [imageUrl, isViewportLeftPanel]);

  // For image view type
  if (viewType === 'image' && imageUrl) {
    const elevationLevel =
      elevation === 'low' ? 1 : elevation === 'high' ? 3 : 2;

    // Calculate container dimensions based on landscape state
    const containerWidth = isLandscape && isViewportLeftPanel ? '75%' : '100%';
    const containerHeight =
      isLandscape && isViewportLeftPanel ? 'auto' : '100%';

    const containerStyles: React.CSSProperties = {
      position: 'relative',
      width: containerWidth,
      height: containerHeight,
      maxHeight: isViewportLeftPanel ? '90vh' : '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      transition: shouldReduceMotion
        ? 'none'
        : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      ...imageContainerStyle,
    };

    return (
      <FadeIn delay={delay}>
        <div style={containerStyles}>
          <Card
            elevation={elevationLevel}
            padding='none'
            hoverable={!!onClick}
            onClick={onClick}
          >
            {/* Loading Spinner */}
            {useSpinner && !imageLoaded && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: `4px solid ${theme.palette.neutralLight}`,
                    borderTop: `4px solid ${theme.palette.themePrimary}`,
                    borderRadius: '50%',
                    animation: shouldReduceMotion
                      ? 'none'
                      : 'spin 1s linear infinite',
                  }}
                />
              </div>
            )}

            {/* Image - Using Next.js Image component with fill prop for responsive behavior */}
            <div
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
                src={imageUrl}
                alt={altText || imageAlt || title}
                fill
                style={{
                  objectFit: 'cover',
                  filter: filter,
                  opacity: imageLoaded ? 1 : 0,
                  transition: shouldReduceMotion
                    ? 'none'
                    : 'opacity 0.3s ease-in-out',
                }}
              />
            </div>

            {/* Title Overlay */}
            {showTitleOnImage && imageText && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: theme.spacing.m,
                  background: `linear-gradient(to top, ${theme.palette.black}CC, transparent)`,
                  color: theme.palette.white,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: theme.fonts.xLarge.fontSize,
                    fontWeight: theme.fonts.xLarge.fontWeight as number,
                    fontFamily: theme.fonts.xLarge.fontFamily,
                  }}
                >
                  {imageText}
                </h2>
              </div>
            )}
          </Card>
        </div>
      </FadeIn>
    );
  }

  // For other view types (grid, small, large), render basic card
  const contentWrapperStyle: React.CSSProperties = {
    ...contentContainerStyle,
  };

  return (
    <div style={contentWrapperStyle}>
      <Card
        elevation={elevation === 'low' ? 1 : elevation === 'high' ? 3 : 2}
        padding='medium'
        hoverable={!!onClick}
        onClick={onClick}
      >
        <div>
          {title && (
            <h3
              style={{
                margin: `0 0 ${theme.spacing.s} 0`,
                fontSize: theme.fonts.large.fontSize,
                fontWeight: theme.fonts.large.fontWeight as number,
                color: theme.palette.neutralPrimary,
              }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              style={{
                margin: 0,
                fontSize: theme.fonts.medium.fontSize,
                color: theme.palette.neutralSecondary,
              }}
            >
              {description}
            </p>
          )}
          {imageUrl && (
            <div
              style={{
                marginTop: theme.spacing.m,
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                overflow: 'hidden',
                borderRadius: theme.borderRadius.s,
              }}
            >
              <Image
                src={imageUrl}
                alt={altText || imageAlt || title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UnifiedCard;
