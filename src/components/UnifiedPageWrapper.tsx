'use client';

import React from 'react';
import { usePathname, useParams } from 'next/navigation';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Typography } from '../theme/components/typography';
import { UnifiedMarkdownRenderer } from '../utils/markdownRenderer';
import { ProtectedEmail } from './ProtectedEmail';

import { useContentFilterStore } from '../store/store';
import { useAppTheme } from '../theme/hooks/useAppTheme';
import { useSimpleLayout } from '@/theme/hooks/useSimpleLayout';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { useIsMobile, useIsTabletPortrait } from '@/theme/hooks/useMediaQuery';
import { useContentScrollable } from '@/theme/hooks/useContentScrollable';
import { useHoverEffects } from '../hooks/useHoverEffects';
import { useHeaderHeight } from '../theme/hooks/useHeaderHeight';
import { ThemeMode } from '../theme/theme';

import { typography, spacing } from '../theme/theme';

// Import images directly
import FluxlineLogoDarkMode from '../assets/images/FluxlineLogoDarkMode.png';
import FluxlineLogoLightMode from '../assets/images/FluxlineLogoLightMode.png';
import FluxlineEthos from '../assets/images/FluxlineEthos.png';
import FluxlineTestimonials from '../assets/images/FluxlineTestimonials.png';
import OurServicesImage from '../assets/images/OurServices1197x1600.jpg';
import ConsultingImage from '../assets/images/ConsultingPortrait.jpg';
import GitHubImage from '../assets/images/GitHubPortrait.jpg';
import EducationImage from '../assets/images/EducationTrainingPortrait.jpg';
import PersonalTrainingImage from '../assets/images/PersonalTrainingPortrait.jpg';
import PressReleaseImage from '../assets/images/FluxlinePressReleases.png';
import ResonanceCoreImage from '../assets/images/LifeCoachingResonanceCore.jpg';
import DesignImage from '../assets/images/Portfolio1280x1815.jpg';
import BlogImage from '../assets/images/Blog1280x1815.jpg';
import ContactImage from '../assets/images/ContactMe2400x1600.jpg';
import BooksImage from '../assets/images/EducationTrainingPortrait.jpg';
import ContentImage from '../assets/images/Content1280x1815.jpg';
import PortfolioImage from '../assets/images/Portfolio1280x1815.jpg';

// Dark mode themes: dark, high-contrast, grayscale-dark
const darkModeThemes: ThemeMode[] = ['dark', 'high-contrast', 'grayscale-dark'];

// Helper function to get the appropriate Fluxline logo based on theme mode
const getFluxlineLogo = (themeMode: ThemeMode): string => {
  if (darkModeThemes.includes(themeMode)) {
    return FluxlineLogoDarkMode.src;
  }
  return FluxlineLogoLightMode.src;
};

// Unified page configurations
const PAGE_CONFIGS: Record<
  string,
  { image: string | 'FLUXLINE_LOGO'; imageText: string }
> = {
  '/about': {
    image: 'FLUXLINE_LOGO',
    imageText: 'About Fluxline',
  },
  '/services': {
    image: OurServicesImage.src,
    imageText: 'Services',
  },
  '/white-pages': {
    image: 'FLUXLINE_LOGO',
    imageText: '',
  },
  '/legal': {
    image: 'FLUXLINE_LOGO',
    imageText: '',
  },
  '/legal/terms': {
    image: ConsultingImage.src,
    imageText: 'Terms of Use',
  },
  '/legal/privacy-policy': {
    image: GitHubImage.src,
    imageText: 'Privacy Policy',
  },
  '/legal/glossary': {
    image: EducationImage.src,
    imageText: 'Glossary of Terms',
  },
  '/legal/stewardship-contract': {
    image: ResonanceCoreImage.src,
    imageText: 'Stewardship Contract',
  },
  '/legal/articles-of-conversion': {
    image: ConsultingImage.src,
    imageText: 'Articles of Conversion',
  },
  '/services/education': {
    image: EducationImage.src,
    imageText: 'Education & Training',
  },
  '/services/personal-training': {
    image: PersonalTrainingImage.src,
    imageText: 'Personal Training & Wellness',
  },
  '/services/consulting': {
    image: ConsultingImage.src,
    imageText: 'Business Consulting',
  },
  '/services/development': {
    image: GitHubImage.src,
    imageText: 'Web & App Development',
  },
  '/services/resonance-core': {
    image: ResonanceCoreImage.src,
    imageText: 'Life Coaching: Resonance Core',
  },
  '/services/design': {
    image: DesignImage.src,
    imageText: 'Brand & Experience Design',
  },
  '/fluxline-ethos': {
    image: FluxlineEthos.src,
    imageText: 'Fluxline Ethos',
  },
  '/case-studies': {
    image: 'FLUXLINE_LOGO',
    imageText: 'Case Studies',
  },
  '/blog': {
    image: BlogImage.src,
    imageText: 'Blog',
  },
  '/contact': {
    image: ContactImage.src,
    imageText: "Let's Connect",
  },
  '/books': {
    image: BooksImage.src,
    imageText: 'Books',
  },
  '/github': {
    image: GitHubImage.src,
    imageText: 'GitHub',
  },
  '/my-content': {
    image: ContentImage.src,
    imageText: 'My Content',
  },
  '/portfolio': {
    image: PortfolioImage.src,
    imageText: 'Portfolio',
  },
  '/press-release': {
    image: PressReleaseImage.src,
    imageText: 'Press Release',
  },
  '/testimonials': {
    image: FluxlineTestimonials.src,
    imageText: 'Testimonials',
  },
};

// Special configuration for 404 page
const NOT_FOUND_CONFIG = {
  image: ConsultingImage.src,
  imageText: '404 - Not Found',
};

// Pages that should NOT use the wrapper (like home page)
const EXCLUDED_PAGES = ['/'];

// Type definitions
type LayoutType = 'responsive-grid' | 'legal-document';
type TabletPortraitLayout = 'side-by-side' | 'stacked' | 'image-small';

interface LegalPageConfig {
  showBackNavigation?: boolean;
  backNavigationUrl?: string;
  showCopyright?: boolean;
  documentType?: 'policy' | 'terms' | 'contract' | 'glossary' | 'article';
  title?: string;
  subtitle?: string;
  content?: string;
}

interface ImageConfig {
  source: string;
  alt: string;
  title?: string;
  showTitle?: boolean;
}

export interface UnifiedPageWrapperProps {
  children?: React.ReactNode;

  // Layout type selection
  layoutType?: LayoutType;

  // SimplePageWrapper props
  showImageTitle?: boolean;
  contentImage?: string;
  tabletPortraitLayout?: TabletPortraitLayout;

  // PageWrapper props
  respectLayoutPreference?: boolean;

  // Unified options
  imageConfig?: ImageConfig;

  // Legal/Document-specific
  legalPageConfig?: LegalPageConfig;
}

/**
 * UnifiedPageWrapper - Unified layout wrapper consolidating:
 * - PageWrapper and SimplePageWrapper (responsive-grid layout)
 * - LegalPageLayout (legal-document layout)
 *
 * Provides:
 * - Consistent responsive layouts across all page types
 * - Reliable Next.js Image rendering with sticky positioning
 * - Theme-aware logo and image display
 * - Animated page transitions
 * - Legal page specific features
 */
export const UnifiedPageWrapper: React.FC<UnifiedPageWrapperProps> = ({
  children,
  layoutType = 'responsive-grid',
  showImageTitle = true,
  contentImage,
  tabletPortraitLayout,
  respectLayoutPreference = true,
  imageConfig,
  legalPageConfig,
}) => {
  const pathname = usePathname();

  const { selectedPost } = useContentFilterStore();
  const params = useParams();
  const { themeMode, theme, layoutPreference } = useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const isMobile = useIsMobile();
  const isTabletPortrait = useIsTabletPortrait();
  const headerHeight = useHeaderHeight();
  const { containerStyle, contentStyle, imageStyle } = useSimpleLayout(
    theme,
    layoutPreference
  );

  // Extract id from params if it exists
  const id = params?.id as string | undefined;

  // Create ref for content to detect scrollability
  const contentRef = React.useRef<HTMLDivElement>(null);
  const isContentScrollable = useContentScrollable(contentRef);

  // Add state to ensure we don't check scrollability until content is fully mounted
  const [isContentMounted, setIsContentMounted] = React.useState(false);
  React.useEffect(() => {
    setIsContentMounted(false);

    if (!contentRef.current || typeof ResizeObserver === 'undefined') {
      setIsContentMounted(true);
      return;
    }

    const observer = new ResizeObserver(() => {
      setIsContentMounted(true);
    });
    observer.observe(contentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  // Check if current path should use the wrapper
  const shouldUseWrapper = !EXCLUDED_PAGES.includes(pathname);

  // Hide title for services views except about view to prevent duplicate titles
  const shouldShowTitle = React.useMemo(() => {
    if (imageConfig?.showTitle !== undefined) {
      return imageConfig.showTitle;
    }
    if (showImageTitle !== undefined) {
      return showImageTitle;
    }
    if (pathname.startsWith('/services') && pathname !== '/about') {
      return false;
    }
    return true;
  }, [pathname, showImageTitle, imageConfig?.showTitle]);

  // Initialize hover effects for legal layout (always call hooks unconditionally)
  const linkHoverEffects = useHoverEffects({
    type: 'link',
    enableTransform: false,
  });

  // Determine effective layout type
  const effectiveLayoutType = React.useMemo(() => {
    if (layoutType === 'legal-document' || pathname.startsWith('/legal')) {
      return 'legal-document';
    }
    return 'responsive-grid';
  }, [layoutType, pathname]);

  if (!shouldUseWrapper) {
    return <>{children}</>;
  }

  // Normalize pathname by removing trailing slash for consistent lookup
  const normalizedPathname =
    pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  // Get configuration for current page
  const currentConfig = PAGE_CONFIGS[normalizedPathname];
  const config = currentConfig || NOT_FOUND_CONFIG;

  // Handle dynamic Fluxline logo based on theme mode
  let configImage = imageConfig?.source || config.image;
  if (configImage === 'FLUXLINE_LOGO') {
    configImage = getFluxlineLogo(themeMode);
  }

  // Use the selected post's image if available and we're in detail view
  const imageToDisplay =
    id && selectedPost && selectedPost.imageUrl
      ? selectedPost.imageUrl
      : contentImage || configImage;

  // Use the selected post's title if available and we're in detail view
  const imageTextToDisplay =
    id && selectedPost && selectedPost.title
      ? selectedPost.title
      : imageConfig?.title || config.imageText || '';

  const imageAltText = imageConfig?.alt || imageTextToDisplay;

  // Legal Document Layout
  if (effectiveLayoutType === 'legal-document') {
    const currentYear = new Date().getFullYear();
    const backUrl = legalPageConfig?.backNavigationUrl || '/legal';
    const showBackNav = legalPageConfig?.showBackNavigation !== false;
    const showCopyright = legalPageConfig?.showCopyright !== false;

    return (
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          padding: spacing.xl,
          color: theme.semanticColors.bodyText,
        }}
      >
        {/* Back Navigation and Page Title */}
        {showBackNav && legalPageConfig?.title && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.m,
              marginBottom: legalPageConfig.subtitle ? spacing.s : spacing.l,
            }}
          >
            <Link
              href={backUrl}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: spacing.s1,
                borderRadius: '8px',
                color: theme.palette.themePrimary,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
              {...linkHoverEffects}
            >
              <svg
                width='24'
                height='24'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </Link>
            <Typography
              variant='h1'
              style={{
                ...typography.fonts.h2,
                color: theme.semanticColors.bodyText,
                fontSize: '2rem',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {legalPageConfig.title}
            </Typography>
          </div>
        )}

        {/* Subtitle (if provided) */}
        {legalPageConfig?.subtitle && (
          <Typography
            variant='h3'
            style={{
              ...typography.fonts.h3,
              color: theme.palette.neutralSecondary,
              marginBottom: spacing.l,
            }}
          >
            {legalPageConfig.subtitle}
          </Typography>
        )}

        {/* Main Content */}
        <div
          className='legal-content'
          style={{
            marginTop: spacing.xl,
            marginBottom: spacing.xxl,
          }}
        >
          {legalPageConfig?.content ? (
            <UnifiedMarkdownRenderer content={legalPageConfig.content} />
          ) : (
            children
          )}
          <style jsx>{`
            :global(.legal-content h1:first-child) {
              display: none;
            }
            :global(.legal-content h2) {
              font-size: 2rem !important;
              font-weight: 600 !important;
              margin-top: 2rem !important;
              margin-bottom: 1rem !important;
            }
          `}</style>
        </div>

        {/* Copyright Footer */}
        {showCopyright && (
          <footer
            style={{
              marginTop: spacing.xxxl,
              paddingTop: spacing.l,
              borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
            }}
          >
            <Typography
              variant='p'
              style={{
                ...typography.fonts.bodySmall,
                color: theme.palette.neutralTertiary,
                textAlign: 'center',
              }}
            >
              © {currentYear} Fluxline Resonance Group, LLC. All rights
              reserved.
            </Typography>
            <Typography
              variant='p'
              style={{
                ...typography.fonts.bodySmall,
                color: theme.palette.neutralTertiary,
                textAlign: 'center',
                marginTop: spacing.s,
              }}
            >
              Questions? Contact us at{' '}
              <ProtectedEmail
                username='support'
                domain='fluxline.pro'
                style={{
                  color: theme.semanticColors.link,
                  textDecoration: 'underline',
                }}
              >
                support [at] fluxline.pro
              </ProtectedEmail>
            </Typography>
          </footer>
        )}
      </div>
    );
  }

  // Responsive Grid Layout (from SimplePageWrapper) - DEFAULT
  // Use stacked layout for mobile and tablet-portrait
  const shouldUseStackedLayout = isMobile || isTabletPortrait;

  // Animation variants
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

  // Adjust container style for different layouts
  const adjustedContainerStyle = shouldUseStackedLayout
    ? {
        ...containerStyle,
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr', // Smaller image area, more content space
        alignItems: 'start',
        overflow: 'clip',
      }
    : {
        ...containerStyle,
        gridTemplateColumns: '1fr',
        paddingLeft:
          layoutPreference === 'left-handed'
            ? containerStyle.padding
            : `calc(25vw + ${theme.spacing.l})`,
        paddingRight:
          layoutPreference === 'left-handed'
            ? `calc(25vw + ${theme.spacing.l})`
            : containerStyle.padding,
        alignItems:
          !isMobile && isContentMounted && !isContentScrollable
            ? 'center'
            : 'start',
      };

  // Adjust content style based on scrollability and layout
  const adjustedContentStyle = {
    ...contentStyle,
    flex:
      !isMobile &&
      !shouldUseStackedLayout &&
      isContentMounted &&
      !isContentScrollable
        ? 'none'
        : contentStyle.flex,
    justifyContent:
      !isMobile &&
      !shouldUseStackedLayout &&
      isContentMounted &&
      !isContentScrollable
        ? 'center'
        : 'flex-start',
    maxWidth: '1200px',
    margin: !isMobile && !shouldUseStackedLayout ? '0 auto' : undefined,
  };

  // Adjust image style for stacked layout
  const adjustedImageStyle = shouldUseStackedLayout
    ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'auto',
        padding: theme.spacing.m,
        paddingTop: `calc(${headerHeight} + ${theme.spacing.m})`, // Dynamic header height + margin
      }
    : imageStyle;

  return (
    <>
      {shouldUseStackedLayout ? (
        // Stacked Layout: Image and content in same container (Mobile & Tablet Portrait)
        <div style={adjustedContainerStyle}>
          {/* Image Panel */}
          <div style={adjustedImageStyle}>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeInVariants}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '300px', // Smaller max width for mobile/tablet
                aspectRatio: '4/3', // More landscape ratio for smaller viewport usage
                borderRadius: theme.borderRadius.m,
                overflow: 'hidden',
                backgroundColor: theme.palette.neutralLighter,
                boxShadow: theme.shadows?.l || '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <Image
                src={imageToDisplay}
                alt={imageAltText}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px'
                style={{
                  objectFit: 'cover',
                }}
                priority
                placeholder='blur'
                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
              />
              {/* No title overlay on stacked layouts for cleaner mobile/tablet experience */}
            </motion.div>
          </div>

          {/* Content Panel */}
          <div ref={contentRef} style={adjustedContentStyle} id='main-content'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={pathname}
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={fadeInVariants}
                style={{
                  width: '100%',
                }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        // Fixed Layout: Image fixed to viewport (desktop/tablet landscape)
        <>
          {/* Image Panel - Fixed to viewport */}
          <div style={adjustedImageStyle}>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={fadeInVariants}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '400px',
                aspectRatio: '3/4',
                borderRadius: theme.borderRadius.m,
                overflow: 'hidden',
                backgroundColor: theme.palette.neutralLighter,
                boxShadow: theme.shadows?.l || '0 4px 12px rgba(0,0,0,0.15)',
                pointerEvents: 'auto',
              }}
            >
              <Image
                src={imageToDisplay}
                alt={imageAltText}
                fill
                sizes='(max-width: 768px) 100vw, 400px'
                style={{
                  objectFit: 'cover',
                }}
                priority
                placeholder='blur'
                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
              />
              {shouldShowTitle && imageTextToDisplay && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: theme.spacing.m,
                    background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent)`,
                    color: theme.palette.white,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: '1.75rem',
                      fontWeight: theme.fonts.xLarge.fontWeight as number,
                      fontFamily: `${theme.fonts.xLarge.fontFamily} !important`,
                    }}
                  >
                    {imageTextToDisplay}
                  </h2>
                </div>
              )}
            </motion.div>
          </div>

          {/* Content Container */}
          <div style={adjustedContainerStyle}>
            {/* Content Panel */}
            <div
              ref={contentRef}
              style={adjustedContentStyle}
              id='main-content'
            >
              <AnimatePresence mode='wait'>
                <motion.div
                  key={pathname}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  variants={fadeInVariants}
                  style={{
                    width: '100%',
                  }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UnifiedPageWrapper;
