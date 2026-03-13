'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ViewportGrid } from '@/theme/components/layout/ViewportGrid';
import { BackgroundLayer } from '@/theme/components/layout/background-layer';
import { HomeFooter } from '@/theme/components/layout/home-footer';
import { HomeCtaBanner } from '@/theme/components/layout/home-cta-banner';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form/FormButton';
import { FadeUp } from '@/animations/fade-animations';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useThemeOverride } from '@/theme/contexts/ThemeOverrideContext';
import {
  useDeviceOrientation,
  useIsMobile,
  useIsDesktop,
} from '@/theme/hooks/useMediaQuery';
import { useHeaderHeight } from '@/theme/hooks/useHeaderHeight';
import { useFooterHeight } from '@/theme/hooks/useFooterHeight';
import type { ThemeMode } from '@/theme/theme';

const BOOKINGS_URL =
  'https://outlook.office.com/owa/calendar/Bookings@terencewaters.com/bookings/';
const MOBILE_BACKGROUND_IMAGE_PATH =
  '/images/home/HomePageMobileGeometricBackground.jpg';

/**
 * Home Page Content Component
 * Translucent card with animated text and dual CTA buttons.
 * Conforms to the 3×9 responsive grid: card on left, background on right.
 */
const HomeContent: React.FC<{
  isMobile: boolean;
  shouldStartAnimations: boolean;
}> = ({ isMobile, shouldStartAnimations }) => {
  const router = useRouter();
  const { theme, themeMode } = useAppTheme();
  const orientation = useDeviceOrientation();
  const [animateDivider, setAnimateDivider] = React.useState(false);
  const [animateHeader, setAnimateHeader] = React.useState(false);
  const [animateBlurb, setAnimateBlurb] = React.useState(false);
  const [animateButtons, setAnimateButtons] = React.useState(false);
  const isDesktop = useIsDesktop();
  const headerHeight = useHeaderHeight();

  React.useEffect(() => {
    if (!shouldStartAnimations) return;

    setTimeout(() => setAnimateHeader(true), 300);
    setTimeout(() => setAnimateDivider(true), 800);
    setTimeout(() => {
      setAnimateBlurb(true);
      setAnimateButtons(true);
    }, 1400);
  }, [shouldStartAnimations]);

  const isMobileLandscape = orientation === 'mobile-landscape';

  // ── Card wrapper ──────────────────────────────────────────────────────
  const cardStyle: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: `1px solid rgba(175, 202, 252, 0.18)`,
    borderRadius: isMobile ? '8px' : '12px',
    padding: isMobileLandscape
      ? '1rem 1.25rem'
      : isMobile
        ? '1.5rem'
        : '2.5rem 2.75rem',
    width: '100%',
    boxSizing: 'border-box' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: isMobileLandscape ? '0.25rem' : '0.5rem',
    maxWidth: '600px',
    marginBottom: isDesktop ? '80px' : undefined, // to push up the card to center it with the height of the fixed header
  };

  // ── Typography styles ─────────────────────────────────────────────────
  const accentColor =
    themeMode === 'grayscale'
      ? theme.palette.neutralTertiary
      : theme.palette.themePrimary;

  const welcomeStyle: React.CSSProperties = {
    color: accentColor,
    fontSize: isMobileLandscape
      ? 'clamp(0.85rem, 2.5vw, 1.1rem)'
      : 'clamp(1rem, 2.5vw, 1.4rem)',
    fontWeight: theme.typography.fontWeights.light,
    textTransform: 'capitalize' as const,
    letterSpacing: '0.08em',
    marginBottom: isMobileLandscape ? '-0.1rem' : '-0.25rem',
    opacity: 0,
    animation: animateHeader
      ? 'fl-slideInRight 0.4s ease-in-out forwards'
      : 'none',
  };

  const mainTitleStyle: React.CSSProperties = {
    color: theme.palette.white,
    fontSize: isMobileLandscape
      ? 'clamp(2rem, 7vw, 3rem)'
      : 'clamp(2.75rem, 8vw, 5rem)',
    fontWeight: theme.typography.fontWeights.bold,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    lineHeight: 1.1,
    marginBottom: isMobileLandscape ? '0.25rem' : theme.spacing.s,
    opacity: 0,
    animation: animateHeader
      ? 'fl-slideInRight 0.4s ease-in-out 0.2s forwards'
      : 'none',
  };

  const dividerStyle: React.CSSProperties = {
    width: '95%',
    height: isMobile ? '1px' : '2px',
    backgroundColor: accentColor,
    border: 'none',
    margin: isMobileLandscape ? '0.25rem 0' : `${theme.spacing.s} 0`,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    animation: animateDivider
      ? 'fl-drawLine 0.4s ease-in-out forwards'
      : 'none',
    boxShadow: `0 0 6px ${accentColor}40`,
  };

  const blurbStyle: React.CSSProperties = {
    color: theme.palette.white,
    fontSize: isMobileLandscape
      ? 'clamp(0.85rem, 2vw, 1.1rem)'
      : 'clamp(1rem, 2vw, 1.3rem)',
    lineHeight: theme.typography.lineHeights.relaxed,
    fontWeight: theme.typography.fontWeights.light,
    opacity: 0,
    animation: animateBlurb ? 'fl-fadeIn 0.8s ease-in-out forwards' : 'none',
    animationDelay: animateBlurb ? '0.2s' : '0s',
    marginTop: isMobileLandscape ? '0.25rem' : theme.spacing.s,
    marginBottom: isMobileLandscape ? '0.5rem' : theme.spacing.m,
  };

  const buttonRowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection:
      isMobile && !isMobileLandscape ? ('column' as const) : ('row' as const),
    gap: '0.75rem',
    flexWrap: 'wrap' as const,
    opacity: 0,
    animation: animateButtons
      ? 'fl-slideInUp 0.4s ease-in-out 0.6s forwards'
      : 'none',
  };

  const buttonBaseStyle: React.CSSProperties = {
    minWidth: isMobile ? '100%' : '180px',
    fontSize: isMobileLandscape
      ? 'clamp(0.85rem, 2vw, 1rem)'
      : 'clamp(0.95rem, 1.5vw, 1.1rem)',
    fontWeight: theme.typography.fontWeights.semiBold,
  };

  return (
    <div style={{ marginBottom: isDesktop ? `-${headerHeight}px` : undefined }}>
      <style>{`
        @keyframes fl-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fl-slideInRight {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fl-drawLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes fl-slideInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={cardStyle}>
        {/* Welcome line */}
        <Typography variant='h2' style={welcomeStyle}>
          welcome to
        </Typography>

        {/* Brand name */}
        <Typography variant='h1' style={mainTitleStyle}>
          fluxline
        </Typography>

        {/* Animated divider */}
        <hr style={dividerStyle} />

        {/* Tagline / blurb */}
        <Typography variant='p' style={blurbStyle}>
          We build <strong>congruence.</strong>
          <br />
          <strong>Strong</strong> bodies. <strong>Clear</strong> brands.{' '}
          <strong>Resilient</strong> systems.
          <br />
          Whether you need <strong>development</strong>, <strong>design</strong>
          , <strong>coaching</strong>, or <strong>strategy</strong>, we
          integrate technical precision with emotional intelligence so your
          inner and outer work finally match.
        </Typography>

        {/* CTA buttons */}
        <div style={buttonRowStyle}>
          <FormButton
            variant='secondary'
            size='medium'
            style={buttonBaseStyle}
            onClick={() => router.push('/about')}
          >
            About Us
          </FormButton>

          <FormButton
            variant='primary'
            size='medium'
            style={buttonBaseStyle}
            aria-label='Book a Consultation (opens in a new tab)'
            onClick={() =>
              window.open(BOOKINGS_URL, '_blank', 'noopener,noreferrer')
            }
            id='bookings-button'
          >
            Book a Consultation
          </FormButton>
        </div>
      </div>
    </div>
  );
};

/**
 * Home Page
 * Landing page with hero section card, animated text, and dual CTA buttons.
 * Background: gradient + geometric CSS animations (desktop/tablet) or portrait
 * photo (mobile). Content card is always on the LEFT using the 3×9 grid.
 */
export default function Home() {
  const { theme, themeMode, layoutPreference } = useAppTheme();
  const { setOverrideThemeMode } = useThemeOverride();
  const isMobile = useIsMobile();
  const orientation = useDeviceOrientation();
  const headerHeight = useHeaderHeight();
  const footerHeight = useFooterHeight();
  const shouldUseMobileLayout = isMobile || orientation === 'tablet-portrait';
  const [backgroundLoaded, setBackgroundLoaded] = React.useState(false);
  const [shouldStartAnimations, setShouldStartAnimations] =
    React.useState(false);

  // Force dark mode for home page unless user has accessibility preference
  React.useEffect(() => {
    const accessibilityModes: ThemeMode[] = [
      'high-contrast',
      'protanopia',
      'deuteranopia',
      'tritanopia',
    ];
    const shouldOverride = !accessibilityModes.includes(themeMode);
    if (shouldOverride) setOverrideThemeMode('dark');
    return () => {
      if (shouldOverride) setOverrideThemeMode(null);
    };
  }, [setOverrideThemeMode, themeMode]);

  // Add home-page class to body for transparent background
  React.useEffect(() => {
    document.body.classList.add('home-page');
    return () => document.body.classList.remove('home-page');
  }, []);

  // For mobile orientations, preload the portrait image before starting animations.
  // For desktop the CSS gradient is instant, so we mark loaded immediately.
  React.useEffect(() => {
    const isMobileOrientation =
      orientation === 'portrait' ||
      orientation === 'mobile-landscape' ||
      orientation === 'tablet-portrait';

    if (!isMobileOrientation) {
      // Gradient background – no image to wait for
      setBackgroundLoaded(true);
      setTimeout(() => setShouldStartAnimations(true), 100);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setBackgroundLoaded(true);
      setTimeout(() => setShouldStartAnimations(true), 200);
    };
    img.onerror = () => {
      setBackgroundLoaded(true);
      setShouldStartAnimations(true);
    };
    img.src = MOBILE_BACKGROUND_IMAGE_PATH;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [orientation]);

  const mobileContentStyle: React.CSSProperties | undefined =
    shouldUseMobileLayout
      ? {
          width: '100%',
          minHeight: `calc(100dvh - ${headerHeight})`,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          // pushes the card down to the bottom of the page on mobile
          paddingTop: isMobile
            ? 0
            : `calc(${headerHeight} + ${theme.spacing.s})`,
          paddingBottom: isMobile
            ? 0
            : `calc(${footerHeight} + ${theme.spacing.l})`,
          boxSizing: 'border-box',
        }
      : undefined;

  const contentNode = (
    <FadeUp
      key={`home-content-${backgroundLoaded}`}
      delay={backgroundLoaded ? 0.1 : 0}
      duration={0.5}
      style={mobileContentStyle}
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
        backgroundImage='one'
        orientation={orientation}
        themeMode={themeMode}
        theme={theme}
        layoutPreference={layoutPreference}
        backgroundLoaded={backgroundLoaded}
      />
      <div
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#010101',
        }}
      >
        <ViewportGrid
          leftChildren={contentNode}
          isHomePage={true}
          respectLayoutPreference={true}
          backgroundImage='one'
        />
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          <HomeCtaBanner />
          <HomeFooter />
        </div>
      </div>
    </>
  );
}
