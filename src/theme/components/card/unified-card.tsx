'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { useAppTheme } from '../../hooks/useAppTheme';
// import { useIsMobile, useDeviceOrientation } from '../../hooks/useMediaQuery';
import { useColorVisionFilter } from '../../hooks/useColorVisionFilter';
import { useReducedMotion } from '../../hooks/useReducedMotion';
// import useIsTextColorLight from '../../hooks/useIsTextColorLight';
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
  // Callback for image dimensions (for container adaptation)
  onImageDimensionsChange?: (
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    } | null
  ) => void;
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
  onImageDimensionsChange,
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
      // Clear dimensions in parent container
      onImageDimensionsChange?.(null);

      const img = new window.Image();
      img.onload = () => {
        // Capture the image's natural dimensions
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const aspectRatio = naturalWidth / naturalHeight;

        // Store image dimensions for container sizing
        const dimensions = {
          width: naturalWidth,
          height: naturalHeight,
          aspectRatio: aspectRatio,
        };

        setImageDimensions(dimensions);

        // Notify parent container of dimensions change
        onImageDimensionsChange?.(dimensions);

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
        // Notify parent container that dimensions are cleared
        onImageDimensionsChange?.(null);
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
      <motion.div
        data-card-id={id}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{
          y: -4,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
        transition={{
          delay: delay / 1000, // Convert ms to seconds
          duration: 0.15,
          ease: 'easeOut',
        }}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
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
                    fontSize: theme.typography.fonts.xLarge.fontSize,
                    fontWeight: theme.typography.fonts.xLarge.fontWeight,
                    fontFamily: `${theme.typography.fonts.xLarge.fontFamily} !important`,
                  }}
                >
                  {imageText}
                </h2>
              </div>
            )}
          </Card>
        </div>
      </motion.div>
    );
  }

  // For grid view type, render image card with title overlay
  if (viewType === 'grid' && imageUrl) {
    return (
      <motion.div
        data-card-id={id}
        initial={{ y: 0 }}
        whileHover={{
          y: -4,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        <Card
          elevation={elevation === 'low' ? 1 : elevation === 'high' ? 3 : 2}
          padding='none'
          hoverable={!!onClick}
          onClick={onClick}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '60%', // 5:3 aspect ratio for grid cards
              overflow: 'hidden',
            }}
          >
            <Image
              src={imageUrl}
              alt={altText || imageAlt || title}
              fill
              style={{
                objectFit: 'cover',
                filter: filter,
              }}
            />

            {/* Title and date overlay */}
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
              <h3
                style={{
                  margin: `0 0 ${theme.spacing.xs} 0`,
                  fontSize: theme.fonts.large.fontSize,
                  fontWeight: theme.fonts.large.fontWeight as number,
                  fontFamily: `${theme.fonts.large.fontFamily} !important`,
                  lineHeight: 1.2,
                }}
              >
                {title}
              </h3>
              {imageText && (
                <p
                  style={{
                    margin: 0,
                    fontSize: theme.fonts.small.fontSize,
                    fontFamily: `${theme.fonts.small.fontFamily} !important`,
                    opacity: 0.9,
                  }}
                >
                  {imageText}
                </p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // For small tile view - compact horizontal layout
  if (viewType === 'small') {
    return (
      <motion.div
        data-card-id={id}
        style={{
          cursor: onClick ? 'pointer' : 'default',
        }}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{
          y: -2,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
        transition={{
          delay: delay / 1000, // Convert ms to seconds
          duration: 0.15,
          ease: 'easeOut',
        }}
      >
        <Card
          elevation={elevation === 'low' ? 1 : elevation === 'high' ? 3 : 2}
          padding='medium'
          hoverable={!!onClick}
          onClick={onClick}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.m,
              minHeight: '80px',
            }}
          >
            {imageUrl && (
              <div
                style={{
                  position: 'relative',
                  width: '80px',
                  height: '80px',
                  flexShrink: 0,
                  borderRadius: theme.effects.roundedCorner4,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={imageUrl}
                  alt={altText || imageAlt || title}
                  fill
                  style={{
                    objectFit: 'cover',
                    filter: filter,
                  }}
                />
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3
                style={{
                  margin: `0 0 ${theme.spacing.xs} 0`,
                  fontSize: theme.fonts.large.fontSize,
                  fontWeight: theme.fonts.large.fontWeight as number,
                  fontFamily: `${theme.fonts.large.fontFamily} !important`,
                  color: theme.palette.neutralPrimary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </h3>
              {imageText && (
                <p
                  style={{
                    margin: 0,
                    fontSize: theme.fonts.medium.fontSize,
                    fontFamily: `${theme.fonts.medium.fontFamily} !important`,
                    color: theme.palette.neutralSecondary,
                  }}
                >
                  {imageText}
                </p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // For large tile view - full content layout
  if (viewType === 'large') {
    return (
      <motion.div
        data-card-id={id}
        style={{
          cursor: onClick ? 'pointer' : 'default',
        }}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{
          y: -3,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
        transition={{
          delay: delay / 1000, // Convert ms to seconds
          duration: 0.15,
          ease: 'easeOut',
        }}
      >
        <Card
          elevation={elevation === 'low' ? 1 : elevation === 'high' ? 3 : 2}
          padding='large'
          hoverable={!!onClick}
          onClick={onClick}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {imageUrl && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '40%', // 5:2 aspect ratio for large tiles
                  marginBottom: theme.spacing.m,
                  borderRadius: theme.effects.roundedCorner4,
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={imageUrl}
                  alt={altText || imageAlt || title}
                  fill
                  style={{
                    objectFit: 'cover',
                    filter: filter,
                  }}
                />
              </div>
            )}
            <div>
              <h3
                style={{
                  margin: `0 0 ${theme.spacing.s} 0`,
                  fontSize: theme.fonts.xLarge.fontSize,
                  fontWeight: theme.fonts.xLarge.fontWeight as number,
                  fontFamily: `${theme.fonts.xLarge.fontFamily} !important`,
                  color: theme.palette.neutralPrimary,
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h3>
              {description && (
                <p
                  style={{
                    margin: `0 0 ${theme.spacing.s} 0`,
                    fontSize: theme.fonts.medium.fontSize,
                    fontFamily: `${theme.fonts.medium.fontFamily} !important`,
                    color: theme.palette.neutralSecondary,
                    lineHeight: 1.5,
                  }}
                >
                  {description}
                </p>
              )}
              {imageText && (
                <p
                  style={{
                    margin: 0,
                    fontSize: theme.fonts.medium.fontSize,
                    fontFamily: `${theme.fonts.medium.fontFamily} !important`,
                    color: theme.palette.themePrimary,
                    fontWeight: 500,
                  }}
                >
                  {imageText}
                </p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Fallback for other view types
  const contentWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    ...contentContainerStyle,
  };

  return (
    <motion.div
      data-card-id={id}
      style={{
        ...contentWrapperStyle,
        cursor: onClick ? 'pointer' : 'default',
      }}
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      transition={{
        delay: delay / 1000, // Convert ms to seconds
        duration: 0.15,
        ease: 'easeOut',
      }}
    >
      <Card
        elevation={elevation === 'low' ? 1 : elevation === 'high' ? 3 : 2}
        padding='medium'
        hoverable={!!onClick}
        onClick={onClick}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            cursor: onClick ? 'pointer' : 'default',
          }}
        >
          {title && (
            <h3
              style={{
                margin: `0 0 ${theme.spacing.s} 0`,
                fontSize: theme.fonts.large.fontSize,
                fontWeight: theme.fonts.large.fontWeight as number,
                fontFamily: `${theme.fonts.large.fontFamily} !important`,
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
                fontFamily: `${theme.fonts.medium.fontFamily} !important`,
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
                borderRadius: theme.effects.roundedCorner4,
              }}
            >
              <Image
                src={imageUrl}
                alt={altText || imageAlt || title}
                fill
                sizes='(max-width: 768px) 100vw, 50vw'
                style={{
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default UnifiedCard;
