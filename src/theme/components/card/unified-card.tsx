'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Card } from '../card/card';
import { useAppTheme } from '../../hooks/useAppTheme';
import { useColorVisionFilter } from '../../hooks/useColorVisionFilter';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsTablet, useDeviceOrientation } from '../../hooks/useMediaQuery';
import { LoadingSpinner } from '../structural/loading-spinner';
import { Typography } from '../typography';

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
  const { theme } = useAppTheme();
  const { filter } = useColorVisionFilter(skipDarkModeFilter);
  const { shouldReduceMotion } = useReducedMotion();
  const isTablet = useIsTablet();
  const orientation = useDeviceOrientation();

  // Calculate elevation level once
  const elevationLevel = elevation === 'low' ? 1 : elevation === 'high' ? 3 : 2;

  // Determine if we should use tighter line clamping for descriptions
  const shouldClampDescription = isTablet || orientation === 'square';

  // Common overlay gradient for image text
  const overlayGradient = `linear-gradient(to top, ${theme.palette.black}CC, transparent)`;
  const publicationLabel = publicationDateText
    ? `Published ${publicationDateText}`
    : undefined;
  const smallTileHeight = 'clamp(150px, 16vw, 225px)';

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
                <LoadingSpinner size={SpinnerSize.large} />
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
                  padding: theme.spacing.m,
                  background: overlayGradient,
                  color: theme.palette.white,
                }}
              >
                <Typography
                  variant='h4'
                  style={{
                    margin: 0,
                    color: '#FFF',
                  }}
                >
                  {imageText}
                </Typography>
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
                  <LoadingSpinner size={SpinnerSize.medium} />
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
                  padding: theme.spacing.m,
                  background:
                    theme.themeMode === 'dark' ||
                    theme.themeMode === 'high-contrast' ||
                    theme.themeMode === 'grayscale-dark'
                      ? `linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.35))`
                      : overlayGradient,
                  color: theme.palette.white,
                }}
              >
                <Typography
                  variant='h4'
                  style={{
                    margin: `0 0 ${theme.spacing.xs} 0`,
                    lineHeight: 1.2,
                    color: '#FFFFFF',
                    textShadow: theme.shadows.m,
                    WebkitLineClamp: 3,
                    lineClamp: 3,
                    display: '-webkit-box',
                  }}
                >
                  {title}
                </Typography>
                {publicationDateText && (
                  <Typography
                    variant='label'
                    style={{
                      margin: 0,
                      opacity: 0.9,
                      color: '#FFFFFF',
                    }}
                  >
                    {publicationLabel}
                  </Typography>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: theme.spacing.m,
                minHeight: '200px',
                height: '100%',
              }}
            >
              <div>
                <Typography
                  variant='h4'
                  style={{
                    margin: 0,
                    color: theme.palette.neutralPrimary,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </Typography>
                {/* {description && (
                  <Typography
                    variant='label'
                    style={{
                      margin: `${theme.spacing.s} 0 0 0`,
                      color: theme.palette.neutralSecondary,
                      lineHeight: 1.5,
                    }}
                  >
                    {description}
                  </Typography>
                )} */}
              </div>
              {/* {imageText && (
                <Typography variant='label'
                  style={{
                    margin: 0,
                    color: theme.palette.neutralSecondary,
                  }}
                >
                  {imageText}
                </Typography>
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
                    height: '100%',
                    aspectRatio: '1 / 1',
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
                      <LoadingSpinner size={SpinnerSize.medium} />
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
                  padding: theme.spacing.m,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: 0,
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                }}
              >
                <div style={{ flex: '1 1 auto' }}>
                  <Typography
                    variant='h5'
                    style={{
                      margin: 0,
                      color: theme.palette.neutralPrimary,
                      lineHeight: 1.3,
                      marginBottom: theme.spacing.s2,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                    }}
                  >
                    {title}
                  </Typography>
                  {description && (
                    <Typography
                      variant='p'
                      style={{
                        margin: `${theme.spacing.s} 0 0 0`,
                        color: theme.palette.neutralSecondary,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: shouldClampDescription ? 2 : 3,
                        overflow: 'hidden',
                      }}
                    >
                      {description}
                    </Typography>
                  )}
                </div>
                <div
                  style={{ marginTop: 'auto', paddingTop: theme.spacing.xs }}
                >
                  {imageText && (
                    <Typography
                      variant='label'
                      style={{
                        margin: 0,
                        color: theme.palette.themePrimary,
                        fontWeight: 600,
                        display: 'block',
                      }}
                    >
                      {imageText}
                    </Typography>
                  )}
                  {publicationDateText && (
                    <Typography
                      variant='label'
                      style={{
                        margin: `${theme.spacing.xxs} 0 0 0`,
                        color: theme.palette.neutralSecondary,
                        display: 'block',
                      }}
                    >
                      {publicationLabel}
                    </Typography>
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
          height: '100%',
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
                height: '100%',
                minHeight: imageUrl ? '220px' : '175px',
              }}
            >
              {imageUrl && (
                <div
                  style={{
                    position: 'relative',
                    flex: '0 0 clamp(180px, 36%, 280px)',
                    aspectRatio: '1 / 1',
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
                      <LoadingSpinner size={SpinnerSize.large} />
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
                  padding: theme.spacing.l,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: 0,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Typography
                    variant='h4'
                    style={{
                      margin: `0 0 ${theme.spacing.s2} 0`,
                      color: theme.palette.neutralPrimary,
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </Typography>
                  {publicationLabel && (
                    <Typography
                      variant='h6'
                      style={{
                        margin: `${theme.spacing.s1} 0`,
                        color: theme.palette.themePrimary,
                        lineHeight: 1.4,
                      }}
                    >
                      {publicationLabel}
                    </Typography>
                  )}
                  {description && (
                    <Typography
                      variant='p'
                      style={{
                        margin: `${theme.spacing.xs} 0 0 0`,
                        color: theme.palette.neutralSecondary,
                        lineHeight: 1.5,
                        ...(shouldClampDescription && {
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                        }),
                      }}
                    >
                      {description}
                    </Typography>
                  )}
                </div>
                {imageText && (
                  <Typography
                    variant='label'
                    style={{
                      margin: `${theme.spacing.m} 0 0 0`,
                      color: theme.palette.neutralSecondary,
                    }}
                  >
                    {imageText}
                  </Typography>
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
            height: '100%',
            cursor: onClick ? 'pointer' : 'default',
          }}
        >
          {title && (
            <Typography
              variant='h5'
              style={{
                margin: `0 0 ${theme.spacing.s} 0`,
                color: theme.palette.neutralPrimary,
              }}
            >
              {title}
            </Typography>
          )}
          {description && (
            <Typography
              variant='label'
              style={{
                margin: 0,
                color: theme.palette.neutralSecondary,
              }}
            >
              {description}
            </Typography>
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
