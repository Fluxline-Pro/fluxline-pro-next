'use client';

import React from 'react';
import { ViewportGrid } from '@/theme/components/layout/ViewportGrid';
import { BackgroundLayer } from '@/theme/components/layout/background-layer';
import { Typography } from '@/theme/components/typography';
import { BookingsButton } from '@/theme/components/button/bookings-button';
import { FadeUp } from '@/animations/fade-animations';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useThemeOverride } from '@/theme/contexts/ThemeOverrideContext';
import { useBackgroundImage } from '@/theme/hooks/useBackgroundImage';
import { useDeviceOrientation, useIsMobile } from '@/theme/hooks/useMediaQuery';
import type { IExtendedTheme } from '@/theme/theme';

/**
 * HighlightText Component - displays highlighted text in white
 */
const HighlightText: React.FC<{ text: string; theme: IExtendedTheme }> = ({
  text,
  theme,
}) => (
  <span
    style={{
      color: theme.palette.white,
      fontWeight: theme.typography.fontWeights.extraLight,
    }}
  >
    {text}
  </span>
);

/**
 * Home Page Content Component
 * Displays the main hero section with animated text and CTA
 */
const HomeContent: React.FC<{
  isMobile: boolean;
  shouldStartAnimations: boolean;
}> = ({ isMobile, shouldStartAnimations }) => {
  const { theme, themeMode } = useAppTheme();
  const orientation = useDeviceOrientation();
  const [animateDivider, setAnimateDivider] = React.useState(false);
  const [animateHeader, setAnimateHeader] = React.useState(false);
  const [animateSubHeader, setAnimateSubHeader] = React.useState(false);
  const [animateSubHeaderLines, setAnimateSubHeaderLines] = React.useState([
    false,
    false,
    false,
    false,
  ]);

  React.useEffect(() => {
    // Only start animations when background is ready
    if (!shouldStartAnimations) return;

    // First line animation
    setTimeout(() => {
      setAnimateHeader(true);
    }, 300);

    // Name and HR animation
    setTimeout(() => {
      setAnimateDivider(true);
    }, 800);

    // Subheader lines animations
    setTimeout(() => {
      setAnimateSubHeader(true);
      setAnimateSubHeaderLines([true, false, false, false]);
    }, 1400);

    setTimeout(() => {
      setAnimateSubHeaderLines([true, true, false, false]);
    }, 1800);

    setTimeout(() => {
      setAnimateSubHeaderLines([true, true, true, false]);
    }, 2400);

    setTimeout(() => {
      setAnimateSubHeaderLines([true, true, true, true]);
    }, 2800);
  }, [shouldStartAnimations]);

  const isMobileLandscape = orientation === 'mobile-landscape';

  // Consolidated animation styles
  const animationStyles = {
    fadeIn: {
      animation: 'fadeIn 0.4s ease-in-out forwards',
    },
    slideInRight: {
      opacity: 0,
      transform: 'translateX(-20px)',
      animation: animateHeader
        ? 'slideInRight 0.4s ease-in-out forwards'
        : 'none',
    },
    slideInRightDelayed: {
      opacity: 0,
      transform: 'translateX(-20px)',
      animation: animateHeader
        ? 'slideInRight 0.4s ease-in-out forwards'
        : 'none',
      animationDelay: '0.5s',
    },
    slideInDown: {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    drawLine: {
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      animation: animateDivider ? 'drawLine 0.4s ease-in-out forwards' : 'none',
    },
  };

  // Base typography styles
  const textStyles = {
    welcomeText: {
      color:
        themeMode === 'grayscale'
          ? theme.palette.neutralTertiary
          : theme.palette.themePrimary,
      marginBottom: isMobileLandscape ? '-0.25rem' : '-0.5rem',
      textTransform: 'capitalize' as const,
      fontSize: isMobileLandscape
        ? 'clamp(1rem, 3vw, 1.5rem)'
        : 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: theme.typography.fontWeights.light,
      ...animationStyles.slideInRight,
    },
    mainTitle: {
      color: theme.palette.white,
      marginBottom: isMobileLandscape ? '0.25rem' : theme.spacing.s,
      fontSize: isMobileLandscape
        ? 'clamp(1.8rem, 6vw, 3rem)'
        : 'clamp(2.5rem, 8vw, 5rem)',
      fontWeight: theme.typography.fontWeights.bold,
      textTransform: 'uppercase' as const,
      ...animationStyles.slideInRightDelayed,
    },
    subHeaderLine: {
      color:
        themeMode === 'grayscale'
          ? theme.palette.neutralTertiary
          : theme.palette.themeSecondary,
      lineHeight: theme.typography.lineHeights.tight,
      fontWeight: theme.typography.fontWeights.extraLight,
      fontSize: isMobileLandscape
        ? 'clamp(0.9rem, 2.5vw, 1.4rem)'
        : 'clamp(1.2rem, 3vw, 2rem)',
      textTransform: 'capitalize' as const,
    },
  };

  // Container styles
  const containerStyles = {
    main: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-end' : 'center',
      gap: isMobile ? (isMobileLandscape ? '0.05rem' : '0.125rem') : '0.5rem',
      padding: isMobileLandscape ? '1rem' : '2rem',
      textAlign: 'center' as const,
      width: '100%',
      maxWidth: '800px',
      margin: isMobile
        ? isMobileLandscape
          ? '2rem 0 0'
          : '6rem 0 0'
        : orientation === 'tablet-portrait'
          ? '3rem 0 0 3rem'
          : '0 auto',
      minHeight: isMobileLandscape ? '60vh' : '80vh',
    },
    divider: {
      width: '95%',
      height:
        orientation === 'portrait' || orientation === 'mobile-landscape'
          ? '1px'
          : '2px',
      color: theme.palette.themePrimary,
      backgroundColor: theme.palette.themePrimary,
      margin: 0,
      opacity: 1,
      boxShadow: `0 0 1px ${theme.palette.neutralPrimary}`,
      ...animationStyles.drawLine,
    },
    subHeaderContainer: {
      marginTop: isMobileLandscape ? '0.5rem' : theme.spacing.l,
      marginBottom: isMobileLandscape ? '0.5rem' : theme.spacing.xl,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: isMobileLandscape ? '0.5rem' : '1rem',
      width: '100%',
      maxWidth: '500px',
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes drawLine {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}
      </style>
      <div style={containerStyles.main}>
        <Typography variant='h2' style={textStyles.welcomeText}>
          welcome to
        </Typography>
        <Typography variant='h1' style={textStyles.mainTitle}>
          fluxline
        </Typography>

        <hr style={containerStyles.divider} />

        <div style={containerStyles.subHeaderContainer}>
          <Typography variant='h3' style={textStyles.subHeaderLine}>
            {[
              { highlight: 'strategic', text: 'consulting' },
              { highlight: 'brand', text: 'establishment' },
              { highlight: 'personal training', text: '& wellness' },
              { highlight: 'mentoring', text: '& coaching' },
            ].map((line, index) => (
              <div
                key={index}
                style={{
                  ...textStyles.subHeaderLine,
                  opacity: 0,
                  transform: 'translateY(-10px)',
                  animation: animateSubHeaderLines[index]
                    ? 'slideInDown 0.4s ease-in-out forwards'
                    : 'none',
                }}
              >
                <HighlightText text={line.highlight} theme={theme} />{' '}
                {line.text}
              </div>
            ))}
          </Typography>
        </div>
        <div style={containerStyles.buttonContainer}>
          <BookingsButton
            animateSubHeader={animateSubHeader}
            willAnimate={true}
          />
        </div>
      </div>
    </>
  );
};

/**
 * Home Page
 * Landing page with hero section, animated text, and call-to-action button
 * Uses ViewportGrid with background image positioning logic
 * Forces dark mode for this page only without affecting user's saved preference
 */
export default function Home() {
  const { backgroundImage } = useBackgroundImage();
  const { theme, themeMode, layoutPreference } = useAppTheme();
  const { setOverrideThemeMode } = useThemeOverride();
  const isMobile = useIsMobile();
  const orientation = useDeviceOrientation();
  // For home page layout, treat tablet portrait like mobile (content at bottom)
  const shouldUseMobileLayout = isMobile || orientation === 'tablet-portrait';
  const [backgroundLoaded, setBackgroundLoaded] = React.useState(false);
  const [shouldStartAnimations, setShouldStartAnimations] =
    React.useState(false);

  // Force dark mode for home page only - doesn't affect user's saved preference
  React.useEffect(() => {
    setOverrideThemeMode('dark');

    return () => {
      // Clear override when leaving the page
      setOverrideThemeMode(null);
    };
  }, [setOverrideThemeMode]);

  // Add home-page class to body for transparent background
  React.useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  // Preload the background image based on orientation and background type
  React.useEffect(() => {
    const getBackgroundImageSrc = () => {
      // Use background images from public/images/home/
      const backgroundImageOneLandscape =
        '/images/home/HomePageCover4kLandscape.jpg';
      const backgroundImageOnePortrait =
        '/images/home/HomePageCover4kPortrait.jpeg';

      // For now, we only use background 'one' as per useBackgroundImage
      return orientation === 'landscape' || orientation === 'ultrawide'
        ? backgroundImageOneLandscape
        : orientation === 'portrait'
          ? backgroundImageOnePortrait
          : backgroundImageOneLandscape;
    };

    const imageUrl = getBackgroundImageSrc();
    const img = new Image();

    img.onload = () => {
      setBackgroundLoaded(true);
      // Start animations after background loads + small delay for smooth transition
      setTimeout(() => {
        setShouldStartAnimations(true);
      }, 200);
    };

    img.onerror = () => {
      // If image fails to load, still proceed with animations
      setBackgroundLoaded(true);
      setShouldStartAnimations(true);
    };

    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [backgroundImage, orientation]);

  // Determine which side should show content based on orientation and background image
  // Portrait: Show content on bottom (rightChildren in portrait stacked layout)
  // Landscape with backgroundImage 'one': Show content on left (leftChildren) so face shows on right
  // Landscape with backgroundImage 'two': Show content on right (rightChildren) so face shows on left
  // Left-handed mode: Flip the above
  const shouldShowContentOnLeft = React.useMemo(() => {
    if (orientation === 'portrait') {
      // In portrait mode, content always goes to rightChildren (which becomes bottom)
      return false;
    }

    // For landscape/ultrawide/square:
    // backgroundImage 'one' = face on right, text on left
    // backgroundImage 'two' = face on left, text on right
    // Left-handed mode flips this
    const baseLeft = backgroundImage === 'one';
    return layoutPreference === 'left-handed' ? !baseLeft : baseLeft;
  }, [orientation, backgroundImage, layoutPreference]);

  const contentNode = (
    <FadeUp
      key={`home-content-${backgroundImage}-${backgroundLoaded}`}
      delay={backgroundLoaded ? 0.1 : 0}
      duration={0.5}
      style={shouldUseMobileLayout ? { width: '100%' } : undefined}
    >
      <HomeContent
        isMobile={shouldUseMobileLayout}
        shouldStartAnimations={shouldStartAnimations}
      />
    </FadeUp>
  );

  return (
    <>
      <BackgroundLayer
        isHomePage={true}
        backgroundImage={backgroundImage as 'one' | 'two'}
        orientation={orientation}
        themeMode={themeMode}
        theme={theme}
        layoutPreference={layoutPreference}
        backgroundLoaded={backgroundLoaded}
      />
      <ViewportGrid
        leftChildren={shouldShowContentOnLeft ? contentNode : undefined}
        rightChildren={!shouldShowContentOnLeft ? contentNode : undefined}
        isHomePage={true}
        respectLayoutPreference={true}
        backgroundImage={backgroundImage as 'one' | 'two'}
      />
    </>
  );
}
