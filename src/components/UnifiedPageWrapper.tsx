'use client';

import React from 'react';
import { usePathname, useParams } from 'next/navigation';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { UnifiedMarkdownRenderer } from '../utils/markdownRenderer';
import { ProtectedEmail } from './ProtectedEmail';

import { useContentFilterStore } from '../store/store';
import { useAppTheme } from '../theme/hooks/useAppTheme';
import { useSimpleLayout } from '@/theme/hooks/useSimpleLayout';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import {
  useIsMobile,
  useIsTabletPortrait,
  useIsMobileLandscape,
} from '@/theme/hooks/useMediaQuery';
import { useContentScrollable } from '@/theme/hooks/useContentScrollable';
import { useColorVisionFilter } from '@/theme/hooks/useColorVisionFilter';
import { useHoverEffects } from '../hooks/useHoverEffects';
import { useHeaderHeight } from '../theme/hooks/useHeaderHeight';
import { ThemeMode } from '../theme/theme';
import { FadeUp } from '@/animations/fade-animations';

// Import images directly
import FluxlineLogoDarkMode from '../assets/images/FluxlineLogoDarkMode.png';
import FluxlineLogoLightMode from '../assets/images/FluxlineLogoLightMode.png';
import FluxlineEthos from '../assets/images/FluxlineEthos.png';
// import FluxlineTestimonials from '../assets/images/FluxlineTestimonials.png';
import OurServicesImage from '../assets/images/OurServices1197x1600.jpg';
import PodcastsImage from '../assets/images/Podcasts.jpg';
import ConsultingImage from '../assets/images/ConsultingPortrait.jpg';
import GitHubImage from '../assets/images/GitHubPortrait.jpg';
import EducationImage from '../assets/images/EducationTrainingPortrait.jpg';
import PersonalTrainingImage from '../assets/images/PersonalTrainingPortrait.jpg';
import PressReleaseImage from '../assets/images/FluxlinePressReleases.png';
import ResonanceCoreImage from '../assets/images/LifeCoachingResonanceCore.jpg';
import DesignImage from '../assets/images/Portfolio1280x1815.jpg';
import BlogImage from '../assets/images/Blog1280x1815.png';
import ContactImage from '../assets/images/ContactMe2400x1600.jpg';
// import BooksImage from '../assets/images/EducationTrainingPortrait.jpg';
import ContentImage from '../assets/images/ContentHub.jpg';
import PortfolioImage from '../assets/images/Portfolio1280x1815.jpg';
import TheResonantIdentityLogo from '../assets/images/TheResonantIdentity_Logo.png';

// Dark mode themes: dark, high-contrast, grayscale-dark
const darkModeThemes: ThemeMode[] = ['dark', 'high-contrast', 'grayscale-dark'];

// Helper function to get the appropriate Fluxline logo based on theme mode
const getFluxlineLogo = (themeMode: ThemeMode): string => {
  if (darkModeThemes.includes(themeMode)) {
    return FluxlineLogoDarkMode.src;
  }
  return FluxlineLogoLightMode.src;
};

const getContentHubImage = (_themeMode: ThemeMode): string => {
  return ContentImage.src;
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
  '/services/scrolls': {
    image: 'FLUXLINE_LOGO',
    imageText: 'Strategic Insights',
  },
  '/content': {
    image: ContentImage.src,
    imageText: 'Content Hub',
  },
  '/legal': {
    image: 'FLUXLINE_LOGO',
    imageText: 'Legal & Reference',
  },
  '/legal/terms': {
    image: 'FLUXLINE_LOGO',
    imageText: 'Terms of Use',
  },
  '/legal/privacy-policy': {
    image: 'FLUXLINE_LOGO',
    imageText: 'Privacy Policy',
  },
  '/legal/glossary': {
    image: 'FLUXLINE_LOGO',
    imageText: 'Glossary of Terms',
  },
  '/legal/glossary/core-mythic-terms': {
    image: 'FLUXLINE_LOGO',
    imageText: 'Core Mythic Terms',
  },
  '/legal/glossary/technical-terms': {
    image: 'FLUXLINE_LOGO',
    imageText: 'Technical Terms',
  },
  '/legal/stewardship-contract': {
    image: 'FLUXLINE_LOGO',
    imageText: 'Stewardship Contract',
  },
  '/legal/articles-of-conversion': {
    image: 'FLUXLINE_LOGO',
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
  // Books page not yet implemented
  // '/books': {
  //   image: BooksImage.src,
  //   imageText: 'Books',
  // },
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
  '/podcasts': {
    image: PodcastsImage.src,
    imageText: 'Podcasts',
  },
  '/podcasts/theresonantid': {
    image: TheResonantIdentityLogo.src,
    imageText: '',
  },
  '/podcasts/theresonantid/about': {
    image: TheResonantIdentityLogo.src,
    imageText: '',
  },
  '/podcasts/theresonantid/library': {
    image: TheResonantIdentityLogo.src,
    imageText: '',
  },
  '/podcasts/theresonantid/challenges': {
    image: TheResonantIdentityLogo.src,
    imageText: '',
  },
  '/podcasts/theresonantid/articles': {
    image: TheResonantIdentityLogo.src,
    imageText: '',
  },
  // Testimonials page hidden until client testimonials are available
  // '/testimonials': {
  //   image: FluxlineTestimonials.src,
  //   imageText: 'Testimonials',
  // },
  '/cue-cards': {
    image: 'FLUXLINE_LOGO',
    imageText: 'The Archetypes',
  },
};

// Special configuration for 404 page - uses FLUXLINE_LOGO placeholder
// which will be replaced with theme-appropriate logo at runtime
const NOT_FOUND_CONFIG = {
  image: 'FLUXLINE_LOGO',
  imageText: '',
};

// Pages that should NOT use the wrapper (like home page)
// const EXCLUDED_PAGES = ['/'];

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
  // Gallery carousel support
  onClick?: () => void;
  enableHoverEffect?: boolean;
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

  // isUnsubscribe to vertically center content
  isUnsubscribe?: boolean;

  // Unified options
  imageConfig?: ImageConfig;

  // Force specific image configuration (for 404, error pages, etc.)
  forceImageConfig?: {
    image: 'NOT_FOUND' | string;
    imageText: string;
  };

  // Legal/Document-specific
  legalPageConfig?: LegalPageConfig;
}

// Shared base64 blur placeholder used by both image panel variants
const PAGE_IMAGE_BLUR_PLACEHOLDER =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';

/** DSM CSS spinner -- replaces the old Fluent UI LoadingSpinner */
const DsmSpinner: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <div
    style={{
      width: size,
      height: size,
      border: '3px solid var(--fx-border)',
      borderTopColor: 'var(--fx-accent)',
      borderRadius: '50%',
      animation: 'dsmSpin 0.8s linear infinite',
    }}
  />
);

interface ImagePanelProps {
  src: string;
  alt: string;
  imageWidth: number;
  imageSizes: string;
  objectFit: 'cover' | 'contain';
  /** CSS height value for the <Image> element, e.g. '100%' or 'auto' */
  imageHeight: string;
  containerMaxWidth: string;
  containerMaxHeight?: string;
  /** Scale multiplier applied on hover */
  hoverScale: number;
  /** Pixel size of the clickable-image arrow icon button */
  clickIconSize: number;
  /** CSS spacing value for icon bottom/right offset */
  clickIconSpacing: string;
  imageLoaded: boolean;
  onImageLoad: () => void;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
  filter: string;
  fadeInVariants: Variants;
  shouldReduceMotion: boolean;
  /** Set true to add loading='eager' to the Next.js Image */
  loadingEager?: boolean;
  /** When provided, renders a gradient title overlay at the image bottom */
  titleOverlay?: { text: string };
}

/**
 * ImagePanel
 *
 * Shared image pane rendered in both the stacked (mobile/tablet) and fixed
 * (desktop) layouts of UnifiedPageWrapper. Encapsulates the loading spinner,
 * Next.js Image, clickable-arrow icon, and optional title overlay so that
 * behaviour is guaranteed to be identical in both layout contexts.
 */
const ImagePanel: React.FC<ImagePanelProps> = ({
  src,
  alt,
  imageWidth,
  imageSizes,
  objectFit,
  imageHeight,
  containerMaxWidth,
  containerMaxHeight,
  hoverScale,
  clickIconSize,
  clickIconSpacing,
  imageLoaded,
  onImageLoad,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  filter,
  fadeInVariants,
  shouldReduceMotion,
  loadingEager,
  titleOverlay,
}) => {
  const svgSize = Math.round(clickIconSize * 0.5);
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={fadeInVariants}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: containerMaxWidth,
        ...(containerMaxHeight ? { maxHeight: containerMaxHeight } : {}),
        height: 'auto',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        backgroundColor: 'var(--fx-surface-card)',
        boxShadow: '4px 4px 12px rgba(0,0,0,0.18)',
        pointerEvents: 'auto',
        cursor: onClick ? 'pointer' : 'default',
        transform: isHovered ? `scale(${hoverScale})` : 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
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
          <DsmSpinner size={36} />
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={imageWidth}
        height={0}
        sizes={imageSizes}
        style={{
          width: '100%',
          height: imageHeight,
          objectFit,
          filter,
          opacity: imageLoaded ? 1 : 0,
          transition: shouldReduceMotion ? 'none' : 'opacity 0.3s ease-in-out',
        }}
        {...(loadingEager ? { loading: 'eager' as const } : {})}
        priority
        placeholder='blur'
        blurDataURL={PAGE_IMAGE_BLUR_PLACEHOLDER}
        onLoad={onImageLoad}
      />

      {/* Arrow icon indicator for clickable images */}
      {onClick && (
        <div
          style={{
            position: 'absolute',
            bottom: clickIconSpacing,
            right: clickIconSpacing,
            width: `${clickIconSize}px`,
            height: `${clickIconSize}px`,
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isHovered ? 1 : 0.8,
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: 'none',
          }}
        >
          <svg
            width={svgSize}
            height={svgSize}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M7 17L17 7M17 7H7M17 7V17'
              stroke='white'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      )}

      {/* Title overlay — desktop/fixed layout only */}
      {titleOverlay && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px',
            background: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6), transparent)`,
            color: '#FFFFFF',
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              fontFamily: 'var(--fx-font)',
              lineHeight: 1.2,
              color: '#FFFFFF', // hard-coded so text is always white regardless of themeMode
            }}
          >
            {titleOverlay.text}
          </h2>
        </div>
      )}
    </motion.div>
  );
};

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
  imageConfig,
  forceImageConfig,
  legalPageConfig,
  isUnsubscribe = false,
}) => {
  const pathname = usePathname();

  const { selectedPost } = useContentFilterStore();
  const params = useParams();
  const { themeMode, theme, layoutPreference } = useAppTheme();
  const { shouldReduceMotion } = useReducedMotion();
  const [isMounted, setIsMounted] = React.useState(false);
  const isMobileHook = useIsMobile();
  const isTabletPortraitHook = useIsTabletPortrait();
  const isMobileLandscapeHook = useIsMobileLandscape();
  const isMobile = isMounted ? isMobileHook : false;
  const isTabletPortrait = isMounted ? isTabletPortraitHook : false;
  const isMobileLandscape = isMounted ? isMobileLandscapeHook : false;
  const headerHeight = useHeaderHeight();
  const { containerStyle, contentStyle, imageStyle } = useSimpleLayout(
    theme,
    layoutPreference
  );
  const { filter } = useColorVisionFilter();

  // Extract id from params if it exists
  const id = params?.id as string | undefined;

  // Create ref for content to detect scrollability
  const contentRef = React.useRef<HTMLDivElement>(null);
  const isContentScrollable = useContentScrollable(contentRef);

  // Hover state for image gallery
  const [isImageHovered, setIsImageHovered] = React.useState(false);

  // Image loading state
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // Check if current path should use the wrapper
  // const shouldUseWrapper = !EXCLUDED_PAGES.includes(pathname);

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

  // Normalize pathname by removing trailing slash for consistent lookupconst
  const normalizedPathname =
    pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  // Determine effective layout type
  const effectiveLayoutType = React.useMemo(() => {
    // Use the explicitly provided layoutType
    // All legal pages now use responsive-grid layout
    return layoutType;
  }, [layoutType]);

  // Get configuration for current page
  const currentConfig = PAGE_CONFIGS[normalizedPathname];
  const config = currentConfig || NOT_FOUND_CONFIG;

  // Handle dynamic Fluxline logo based on theme mode
  let configImage = imageConfig?.source || config.image;

  // Apply forceImageConfig if provided (for 404, error pages)
  if (forceImageConfig) {
    if (forceImageConfig.image === 'NOT_FOUND') {
      configImage = NOT_FOUND_CONFIG.image;
    } else {
      configImage = forceImageConfig.image;
    }
  } else if (configImage === 'FLUXLINE_LOGO') {
    configImage = getFluxlineLogo(themeMode);
  } else if (normalizedPathname === '/content') {
    // Apply theme-aware Content Hub image
    configImage = getContentHubImage(themeMode);
  }

  // Use the selected post's image if available and we're in detail view
  const imageToDisplay =
    id && selectedPost && selectedPost.imageUrl
      ? selectedPost.imageUrl
      : contentImage || configImage;

  // Reset and preload image — resolves spinner even when browser cache skips onLoad
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!imageToDisplay) return;
    setImageLoaded(false);
    const img = new window.Image();
    img.src = imageToDisplay;
    img.onload = () => setImageLoaded(true);
    // If already cached, onload may not fire — complete flag catches it
    if (img.complete) setImageLoaded(true);
  }, [imageToDisplay]);

  // Use the selected post's title if available and we're in detail view
  const imageTextToDisplay =
    forceImageConfig?.imageText ||
    (id && selectedPost && selectedPost.title
      ? selectedPost.title
      : imageConfig?.title || config.imageText || '');

  const imageAltText = imageConfig?.alt || imageTextToDisplay;

  // Legal Document Layout
  if (effectiveLayoutType === 'legal-document') {
    const currentYear = new Date().getFullYear();
    const backUrl = legalPageConfig?.backNavigationUrl || '/legal';
    const showBackNav = legalPageConfig?.showBackNavigation !== false;
    const showCopyright = legalPageConfig?.showCopyright !== false;

    return (
      <FadeUp duration={0.5} delay={0}>
        <div
          style={{
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '32px',
            paddingTop: `calc(${headerHeight} + 32px)`,
            color: 'var(--fx-text-body)',
          }}
        >
          {/* Back Navigation and Page Title */}
          {showBackNav && legalPageConfig?.title && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: legalPageConfig.subtitle ? '12px' : '24px',
              }}
            >
              <Link
                href={backUrl}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px',
                  borderRadius: '8px',
                  color: 'var(--fx-accent)',
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
              <h1
                style={{
                  fontFamily: 'var(--fx-font)',
                  fontSize: 'var(--fx-h2-size)',
                  fontWeight: 600,
                  letterSpacing: 'var(--fx-heading-tracking)',
                  lineHeight: 1.3,
                  color: 'var(--fx-text-body)',
                  margin: 0,
                }}
              >
                {legalPageConfig.title}
              </h1>
            </div>
          )}

          {/* Subtitle (if provided) */}
          {legalPageConfig?.subtitle && (
            <h3
              style={{
                fontFamily: 'var(--fx-font)',
                fontSize: 'var(--fx-h3-size)',
                fontWeight: 700,
                letterSpacing: 'var(--fx-heading-tracking)',
                lineHeight: 1.3,
                color: 'var(--fx-text-muted)',
                marginBottom: '24px',
              }}
            >
              {legalPageConfig.subtitle}
            </h3>
          )}

          {/* Main Content */}
          <div
            className='legal-content'
            style={{
              marginTop: '32px',
              marginBottom: '40px',
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
                marginTop: '48px',
                paddingTop: '24px',
                borderTop: '1px solid var(--fx-border)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--fx-font)',
                  fontSize: 'var(--fx-body-sm-size)',
                  fontWeight: 500,
                  lineHeight: 'var(--fx-body-sm-leading)',
                  color: 'var(--fx-text-faint)',
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                &copy; {currentYear} Fluxline Resonance Group, LLC. All rights
                reserved.
              </p>
              <p
                style={{
                  fontFamily: 'var(--fx-font)',
                  fontSize: 'var(--fx-body-sm-size)',
                  fontWeight: 500,
                  lineHeight: 'var(--fx-body-sm-leading)',
                  color: 'var(--fx-text-faint)',
                  textAlign: 'center',
                  marginTop: '12px',
                }}
              >
                Questions? Contact us at{' '}
                <ProtectedEmail
                  username='support'
                  domain='fluxline.pro'
                  style={{
                    color: 'var(--fx-accent)',
                    textDecoration: 'underline',
                  }}
                >
                  support [at] fluxline.pro
                </ProtectedEmail>
              </p>
            </footer>
          )}
        </div>
      </FadeUp>
    );
  }

  // Responsive Grid Layout (from SimplePageWrapper) - DEFAULT
  // Use stacked layout for mobile portrait and tablet-portrait
  // Mobile landscape uses the 3fr/9fr grid like tablet landscape
  const shouldUseStackedLayout =
    (isMobile && !isMobileLandscape) || isTabletPortrait;
  const siteMaxWidth = 'var(--site-max-width, 2160px)';
  const fixedPanelWidth = 'min(25vw, 540px)';
  const centeredFrameInset = `max(calc((100vw - ${siteMaxWidth}) / 2), 0px)`;

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
        width: '100%',
        maxWidth: siteMaxWidth,
        margin: '0 auto',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr', // Smaller image area, more content space
        alignItems: 'start',
        overflow: 'clip',
      }
    : {
        ...containerStyle,
        width: '100%',
        maxWidth: siteMaxWidth,
        margin: '0 auto',
        gridTemplateColumns: '1fr',
        paddingLeft:
          layoutPreference === 'left-handed'
            ? containerStyle.padding
            : `calc(${fixedPanelWidth} + 24px)`,
        paddingRight:
          layoutPreference === 'left-handed'
            ? `calc(${fixedPanelWidth} + 24px)`
            : containerStyle.padding,
        alignItems:
          !isMobile && isContentScrollable
            ? isUnsubscribe
              ? 'center'
              : 'start'
            : 'center',
      };

  // Adjust content style based on scrollability and layout
  const adjustedContentStyle = {
    ...contentStyle,
    width: '100%',
    flex:
      !isMobile && !shouldUseStackedLayout && !isContentScrollable
        ? 'none'
        : contentStyle.flex,
    justifyContent:
      !isMobile && !shouldUseStackedLayout && !isContentScrollable
        ? 'center'
        : 'flex-start',
    maxWidth: '100%',
    margin: '0 auto',
    paddingLeft: isMobile ? '0' : contentStyle.paddingLeft,
    paddingRight: isMobile ? '0' : contentStyle.paddingRight,
  };

  // Adjust image style for stacked layout
  const adjustedImageStyle = shouldUseStackedLayout
    ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 'auto',
        padding: '16px',
        paddingTop: '16px', // Container already offsets by headerHeight; image only needs its own spacing
      }
    : {
        ...imageStyle,
        left: layoutPreference === 'left-handed' ? 'auto' : centeredFrameInset,
        right: layoutPreference === 'left-handed' ? centeredFrameInset : 'auto',
        width: fixedPanelWidth,
        maxWidth: fixedPanelWidth,
      };

  return (
    <>
      {/* Keyframes for DSM spinner */}
      <style jsx global>{`
        @keyframes dsmSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {shouldUseStackedLayout ? (
        // Stacked Layout: Image and content in same container (Mobile & Tablet Portrait)
        <div style={adjustedContainerStyle}>
          {/* Image Panel */}
          <div style={adjustedImageStyle}>
            <ImagePanel
              src={imageToDisplay}
              alt={imageAltText}
              imageWidth={300}
              imageSizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 300px'
              objectFit='cover'
              imageHeight='100%'
              containerMaxWidth='300px'
              containerMaxHeight={isMobile ? '275px' : undefined}
              hoverScale={1.25}
              clickIconSize={48}
              clickIconSpacing='16px'
              imageLoaded={imageLoaded}
              onImageLoad={() => setImageLoaded(true)}
              isHovered={isImageHovered}
              onMouseEnter={() =>
                imageConfig?.onClick && setIsImageHovered(true)
              }
              onMouseLeave={() =>
                imageConfig?.onClick && setIsImageHovered(false)
              }
              onClick={imageConfig?.onClick}
              filter={filter}
              fadeInVariants={fadeInVariants}
              shouldReduceMotion={shouldReduceMotion}
            />
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
            <ImagePanel
              src={imageToDisplay}
              alt={imageAltText}
              imageWidth={400}
              imageSizes='(max-width: 768px) 100vw, 400px'
              objectFit='contain'
              imageHeight='auto'
              containerMaxWidth='400px'
              hoverScale={1.15}
              clickIconSize={56}
              clickIconSpacing='24px'
              imageLoaded={imageLoaded}
              onImageLoad={() => setImageLoaded(true)}
              isHovered={isImageHovered}
              onMouseEnter={() =>
                imageConfig?.onClick && setIsImageHovered(true)
              }
              onMouseLeave={() =>
                imageConfig?.onClick && setIsImageHovered(false)
              }
              onClick={imageConfig?.onClick}
              filter={filter}
              fadeInVariants={fadeInVariants}
              shouldReduceMotion={shouldReduceMotion}
              loadingEager
              titleOverlay={
                shouldShowTitle && imageTextToDisplay
                  ? { text: imageTextToDisplay }
                  : undefined
              }
            />
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
