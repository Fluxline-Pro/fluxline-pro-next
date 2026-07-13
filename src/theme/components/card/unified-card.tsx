'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '../card/card';
import { useColorVisionFilter } from '../../hooks/useColorVisionFilter';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import {
  useIsTablet,
  useDeviceOrientation,
  useIsMobile,
} from '../../hooks/useMediaQuery';
import { LoadingSpinner } from '../structural/loading-spinner';

export type CardViewType = 'grid' | 'small' | 'large' | 'image';

export interface UnifiedCardProps {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  onClick?: () => void;
  elevation?: 'low' | 'medium' | 'high';
  viewType: CardViewType;
  // Image card specific props
  imageText?: string;
  publicationDateText?: string;
  delay?: number;
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
 * UnifiedCard - Flexible card component for content display
 *
 * Features:
 * - Automatic loading spinners for all images
 * - Aspect ratio preservation for landscape images
 * - Dark mode filtering with accessibility support
 * - Title overlay on images
 * - Responsive sizing
 * - Dimension detection for viewport optimization
 * - Multiple view types: grid, small, large, image
 */
export const UnifiedCard: React.FC<UnifiedCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  imageAlt,
  onClick,
  elevation = 'medium',
  viewType,
  imageText,
  publicationDateText,
  delay = 0,
  altText,
  showTitleOnImage = false,
  imageContainerStyle,
  contentContainerStyle,
  isViewportLeftPanel = false,
  skipDarkModeFilter = false,
  onImageDimensionsChange,
}) => {
  const { filter } = useColorVisionFilter(skipDarkModeFilter);
  const { shouldReduceMotion } = useReducedMotion();
  const isTabletHook = useIsTablet();
  const isMobileHook = useIsMobile();
  const isMobile = isMobileHook ?? false;
  const isTablet = isTabletHook ?? false;
  const orientation = useDeviceOrientation();

  // Calculate elevation level once
  const elevationLevel = elevation === 'low' ? 1 : elevation === 'high' ? 3 : 2;

  // Determine if we should use tighter line clamping for descriptions
  const shouldClampDescription = isTablet || orientation === 'square';

  // Common overlay gradient for image text
  const overlayGradient = 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)';
  const publicationLabel = publicationDateText
    ? `Published ${publicationDateText}`
    : undefined;
  const smallTileHeight = isMobile ? '120px' : 'clamp(130px, 11vw, 160px)';

  // Loading state management
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isLandscape, setIsLandscape] = React.useState(false);

  // Check if image is landscape and handle dimension detection (separate from visual loading)
  React.useEffect(() => {
    if (imageUrl) {
      // Reset all states when imageUrl changes
      setImageLoaded(false);
      setIsLandscape(false);
      // Clear dimensions in parent container
      onImageDimensionsChange?.(null);

      const img = new window.Image();
      img.onload = () => {
        // Capture the image's natural dimensions
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        const aspectRatio = naturalWidth / naturalHeight;

        // Mark as loaded here — the preload caches the image, so the rendered
        // <Image> onLoad may never fire if the browser already has it cached.
        setImageLoaded(true);

        // Notify parent container of dimensions change
        onImageDimensionsChange?.({
          width: naturalWidth,
          height: naturalHeight,
          aspectRatio: aspectRatio,
        });

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
        // Notify parent container that dimensions are cleared
        onImageDimensionsChange?.(null);
      };

      // Start loading the image
      img.src = imageUrl;
    }
  }, [imageUrl, onImageDimensionsChange, isViewportLeftPanel]);

  // For image view type
  if (viewType === 'image' && imageUrl) {
    // Calculate container dimensions based on landscape state
    const isLandscapePanel = isLandscape && isViewportLeftPanel;
    const containerWidth = isLandscapePanel ? '75%' : '100%';
    const containerHeight = isLandscapePanel ? 'auto' : '100%';

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
            {!imageLoaded && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                }}
              >
                <LoadingSpinner size={3} />
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
                onLoad={() => setImageLoaded(true)}
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
                  padding: '16px',
                  background: overlayGradient,
                  color: 'var(--fx-text-bright)',
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    color: '#FFF',
                  }}
                >
                  {imageText}
                </h4>
              </div>
            )}
          </Card>
        </div>
      </motion.div>
    );
  }

  // For grid view type
  if (viewType === 'grid') {
    return (
      <motion.div
        data-card-id={id}
        initial={{ y: 0 }}
        whileHover={{
          y: -4,
          transition: { duration: 0.2, ease: 'easeOut' },
        }}
        style={{
          cursor: onClick ? 'pointer' : 'default',
          height: '100%',
        }}
      >
        <Card
          elevation={elevationLevel}
          padding='none'
          hoverable={!!onClick}
          onClick={onClick}
        >
          {imageUrl ? (
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '60%', // 5:3 aspect ratio for grid cards
                overflow: 'hidden',
                borderRadius: '6px',
                minHeight: '200px',
              }}
            >
              {/* Loading Spinner */}
              {!imageLoaded && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                >
                  <LoadingSpinner size={2} />
                </div>
              )}

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
                onLoad={() => setImageLoaded(true)}
              />

              {/* Title and date overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '16px',
                  background: overlayGradient,
                  color: 'var(--fx-text-bright)',
                }}
              >
                <h4
                  style={{
                    margin: '0 0 4px 0',
                    lineHeight: 1.2,
                    color: '#FFFFFF',
                    textShadow: '0 3px 6px rgba(0,0,0,0.15)',
                    WebkitLineClamp: 3,
                    lineClamp: 3,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {title}
                </h4>
                {publicationDateText && (
                  <span
                    style={{
                      margin: 0,
                      opacity: 0.9,
                      color: '#FFFFFF',
                    }}
                  >
                    {publicationLabel}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '16px',
                minHeight: '200px',
                height: '100%',
              }}
            >
              <div>
                <h4
                  style={{
                    margin: 0,
                    color: 'var(--fx-text-heading)',
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h4>
                {/* {description && (
                  <span
                    style={{
                      margin: '8px 0 0 0',
                      color: 'var(--fx-text-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {description}
                  </span>
                )} */}
              </div>
              {/* {imageText && (
                <span
                  style={{
                    margin: 0,
                    color: 'var(--fx-text-muted)',
                  }}
                >
                  {imageText}
                </span>
              )} */}
            </div>
          )}
        </Card>
      </motion.div>
    );
  }

  // For small tile view - horizontal row layout with image on the left
  if (viewType === 'small') {
    return (
      <motion.div
        data-card-id={id}
        style={{
          cursor: onClick ? 'pointer' : 'default',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          height: smallTileHeight,
          display: 'flex',
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
        <div style={{ width: '100%', height: '100%' }}>
          <Card
            elevation={elevationLevel}
            padding='none'
            hoverable={!!onClick}
            onClick={onClick}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                width: '100%',
                height: smallTileHeight,
                minHeight: smallTileHeight,
                maxHeight: smallTileHeight,
              }}
            >
              {imageUrl && (
                <div
                  style={{
                    position: 'relative',
                    flex: '0 0 clamp(90px, 28%, 120px)',
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: '6px 0 0 6px',
                    flexShrink: 0,
                  }}
                >
                  {/* Loading Spinner */}
                  {!imageLoaded && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                      }}
                    >
                      <LoadingSpinner size={2} />
                    </div>
                  )}

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
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              )}
              <div
                style={{
                  padding: isMobile ? '8px' : '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: 0,
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                }}
              >
                <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
                  <h4
                    style={{
                      margin: 0,
                      color: 'var(--fx-text-heading)',
                      lineHeight: 1.3,
                      marginBottom: isMobile ? 0 : '4px',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                      fontSize: isMobile ? '1rem' : '1.125rem',
                    }}
                  >
                    {title}
                  </h4>
                  {/* Hide description on mobile for more compact small-tile cards */}
                  {!isMobile && description && (
                    <p
                      style={{
                        margin: '4px 0 0 0',
                        color: 'var(--fx-text-muted)',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        fontSize: '0.8rem',
                      }}
                    >
                      {description}
                    </p>
                  )}
                </div>
                <div
                  style={{ marginTop: 'auto', paddingTop: '2px' }}
                >
                  {imageText && (
                    <span
                      style={{
                        margin: 0,
                        color: 'var(--fx-accent)',
                        fontWeight: 600,
                        display: 'block',
                        fontSize: '0.75rem',
                      }}
                    >
                      {imageText}
                    </span>
                  )}
                  {publicationDateText && (
                    <span
                      style={{
                        margin: '2px 0 0 0',
                        color: 'var(--fx-text-muted)',
                        display: 'block',
                        fontSize: '0.875rem',
                      }}
                    >
                      {publicationLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    );
  }

  // For large tile view - horizontal row layout with image on the left
  if (viewType === 'large') {
    return (
      <motion.div
        data-card-id={id}
        style={{
          cursor: onClick ? 'pointer' : 'default',
          width: '100%',
          height: isMobile ? 'auto' : '100%',
          display: 'flex',
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
        <div style={{ width: '100%', height: isMobile ? 'auto' : '100%' }}>
          <Card
            elevation={elevationLevel}
            padding='none'
            hoverable={!!onClick}
            onClick={onClick}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                width: '100%',
                height: isMobile ? 'auto' : '100%',
                minHeight: imageUrl ? (isMobile ? 'auto' : '240px') : '200px',
                maxHeight: isMobile ? '125px' : 'auto',
              }}
            >
              {imageUrl && (
                <div
                  style={{
                    position: 'relative',
                    flex: '0 0 clamp(140px, 30%, 220px)',
                    overflow: 'hidden',
                    borderRadius: '6px 0 0 6px',
                    flexShrink: 0,
                  }}
                >
                  {/* Loading Spinner */}
                  {!imageLoaded && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                      }}
                    >
                      <LoadingSpinner size={3} />
                    </div>
                  )}

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
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              )}
              <div
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: 0,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h4
                    style={{
                      margin: '0 0 12px 0',
                      color: 'var(--fx-text-heading)',
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </h4>
                  {publicationLabel && (
                    <h6
                      style={{
                        margin: '6px 0',
                        color: 'var(--fx-accent)',
                        lineHeight: 1.4,
                      }}
                    >
                      {publicationLabel}
                    </h6>
                  )}
                  {!isMobile && description && (
                    <p
                      style={{
                        margin: '4px 0 0 0',
                        color: 'var(--fx-text-muted)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3,
                        overflow: 'hidden',
                      }}
                    >
                      {description}
                    </p>
                  )}
                </div>
                {imageText && (
                  <span
                    style={{
                      margin: '16px 0 0 0',
                      color: 'var(--fx-text-muted)',
                    }}
                  >
                    {imageText}
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>
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
        elevation={elevationLevel}
        padding='medium'
        hoverable={!!onClick}
        onClick={onClick}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: isMobile ? 'auto' : '100%',
            cursor: onClick ? 'pointer' : 'default',
          }}
        >
          {title && (
            <h5
              style={{
                margin: '0 0 8px 0',
                color: 'var(--fx-text-heading)',
              }}
            >
              {title}
            </h5>
          )}
          {!isMobile && description && (
            <span
              style={{
                margin: 0,
                color: 'var(--fx-text-muted)',
              }}
            >
              {description}
            </span>
          )}
          {imageUrl && (
            <div
              style={{
                marginTop: '16px',
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                overflow: 'hidden',
                borderRadius: '4px',
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
