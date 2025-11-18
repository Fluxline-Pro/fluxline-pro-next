'use client';

import React from 'react';
import { usePathname, useParams } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';

import { ViewportGrid } from '../theme/components/layout';
import { UnifiedCard } from '../theme/components/card';
import { useDeviceOrientation } from '../theme/hooks/useMediaQuery';
import { useContentFilterStore } from '../store/store';
import { useAppTheme } from '../theme/hooks/useAppTheme';
import { ThemeMode } from '../theme/theme';
import { FadeUp } from '../animations/fade-animations';

// Import images directly
import FluxlineLogoDarkMode from '../assets/images/FluxlineLogoDarkMode.png';
import FluxlineLogoLightMode from '../assets/images/FluxlineLogoLightMode.png';
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

  // Light mode themes: light, protanopia, deuteranopia, tritanopia, grayscale
  return FluxlineLogoLightMode.src;
};

// Define page configurations
const PAGE_CONFIGS: Record<
  string,
  { image: string | 'FLUXLINE_LOGO'; imageText: string }
> = {
  '/about': {
    image: 'FLUXLINE_LOGO',
    imageText: '',
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
  '/legal/terms-of-use': {
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
    imageText: '',
  },
  '/services/education-training': {
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
};

// Special configuration for 404 page
const NOT_FOUND_CONFIG = {
  image: ConsultingImage.src,
  imageText: '404 - Not Found',
};

// Pages that should NOT use the wrapper (like home page)
const EXCLUDED_PAGES = ['/'];

interface PageWrapperProps {
  children: React.ReactNode;
  showImageTitle?: boolean; // Optional prop to override image title visibility
  contentImage?: string; // Optional prop to override the image used in the left panel
}

/**
 * PageWrapper - Main layout wrapper for all pages (except home)
 * Provides:
 * - Consistent 3fr/9fr layout with image on left, content on right
 * - Dynamic page-specific images based on route
 * - Theme-aware logo display
 * - Animated page transitions with AnimatePresence
 * - Support for detail views with custom images
 */
export const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  showImageTitle,
  contentImage,
}) => {
  const pathname = usePathname();
  const orientation = useDeviceOrientation();
  const { selectedPost } = useContentFilterStore();
  const params = useParams();
  const { themeMode } = useAppTheme();

  // Extract id from params if it exists
  const id = params?.id as string | undefined;

  // Hide title for services views except about view to prevent duplicate titles
  const shouldShowTitle = React.useMemo(() => {
    // If explicitly provided, use that value
    if (showImageTitle !== undefined) {
      return showImageTitle;
    }

    // If it's a services route but not the about route, hide the title
    if (pathname.startsWith('/services') && pathname !== '/about') {
      return false;
    }

    // For all other routes, show the title (default behavior)
    return true;
  }, [pathname, showImageTitle]);

  // Check if current path should use the wrapper
  const shouldUseWrapper = !EXCLUDED_PAGES.includes(pathname);

  // Get configuration for current page
  const currentConfig = PAGE_CONFIGS[pathname];

  // If this page doesn't use the wrapper, render children directly
  if (!shouldUseWrapper) {
    return <>{children}</>;
  }

  // Default fallback config for pages not explicitly defined
  // Use NOT_FOUND_CONFIG for unmatched routes as a special case
  const config = currentConfig || NOT_FOUND_CONFIG;

  // Handle dynamic Fluxline logo based on theme mode
  let configImage = config.image;
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
      : config.imageText || '';

  // Check if we're using the dark mode logo to skip dark mode filter
  const isUsingDarkLogo =
    config.image === 'FLUXLINE_LOGO' &&
    ['dark', 'high-contrast', 'grayscale-dark'].includes(themeMode);

  return (
    <ViewportGrid
      leftChildren={
        <UnifiedCard
          key={pathname + (id || '')} // Add key to reset animations on route change
          id='imageCard' // Use consistent id for hooks compatibility
          title={imageTextToDisplay}
          viewType='image'
          imageUrl={imageToDisplay}
          elevation='medium'
          showTitleOnImage={shouldShowTitle}
          imageText={imageTextToDisplay}
          delay={0.1}
          useSpinner={true}
          isViewportLeftPanel={true} // Mark this card as being in the ViewportGrid's left panel
          skipDarkModeFilter={isUsingDarkLogo} // Skip dark mode filter for Fluxline dark logo
        />
      }
      rightChildren={
        <div
          style={{
            width: '100%',
            maxWidth:
              orientation === 'portrait'
                ? '100%'
                : orientation === 'ultrawide'
                  ? '40dvw'
                  : '62dvw',
            paddingRight: '0',
            // Add overflow handling to prevent text from overlapping
            overflowX: 'hidden',
            wordWrap: 'break-word',
            minWidth: 0, // Allow shrinking
          }}
        >
          <AnimatePresence mode='wait'>
            <FadeUp key={pathname + (id || '')} delay={0.1} duration={0.5}>
              {children}
            </FadeUp>
          </AnimatePresence>
        </div>
      }
      respectLayoutPreference={true}
    />
  );
};

export default PageWrapper;
