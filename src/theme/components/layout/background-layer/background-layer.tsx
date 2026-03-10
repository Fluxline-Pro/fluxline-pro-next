'use client';

import React from 'react';

import { useColorVisionFilter } from '../../../hooks/useColorVisionFilter';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import type { IExtendedTheme, ThemeMode } from '../../../theme';

interface BackgroundLayerProps {
  isHomePage: boolean;
  backgroundImage: 'one' | 'two';
  orientation:
    | 'portrait'
    | 'landscape'
    | 'square'
    | 'mobile-landscape'
    | 'tablet-portrait'
    | 'ultrawide'
    | 'large-portrait';
  themeMode: ThemeMode;
  theme: IExtendedTheme;
  layoutPreference: 'left-handed' | 'right-handed';
  backgroundLoaded?: boolean;
}

/**
 * BackgroundLayer Component
 *
 * Desktop/tablet (≥800px landscape): Renders a black-to-blue CSS gradient with
 * subtle geometric CSS animations that evoke technical line art.
 * Mobile (<800px / portrait / mobile-landscape / tablet-portrait): Renders the
 * portrait photo background (no animations to prevent fatigue).
 */
export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  isHomePage,
  orientation,
  themeMode,
  backgroundLoaded = true,
}) => {
  const { filter } = useColorVisionFilter(true);
  const { shouldReduceMotion } = useReducedMotion();

  if (!isHomePage) {
    return null;
  }

  // Mobile breakpoint: portrait, mobile-landscape, tablet-portrait all ≤ ~800px
  const isMobileOrientation =
    orientation === 'portrait' ||
    orientation === 'mobile-landscape' ||
    orientation === 'tablet-portrait';

  // ── Mobile background: portrait photo ───────────────────────────────────
  if (isMobileOrientation) {
    const mobileImagePath = '/images/home/HomePageCoverPortrait2.jpg';

    const mobileOverlay =
      themeMode === 'high-contrast'
        ? 'rgba(0,0,0,0.6)'
        : 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(1,1,5,0.6) 100%)';

    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100dvw',
          height: '100dvh',
          zIndex: 1,
          overflow: 'hidden',
          opacity: backgroundLoaded ? 1 : 0,
          transition: shouldReduceMotion ? 'none' : 'opacity 0.5s ease-in-out',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${mobileImagePath})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: filter,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: mobileOverlay,
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  }

  // ── Desktop / large-tablet background: gradient + geometric animations ──
  // Gradient colours derived from dark-mode theme palette
  const gradientBg =
    themeMode === 'high-contrast'
      ? '#000000'
      : themeMode === 'grayscale' || themeMode === 'grayscale-dark'
        ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)'
        : 'linear-gradient(135deg, #010101 0%, #08111f 30%, #0d1a30 55%, #182d50 75%, #010101 100%)';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100dvw',
        height: '100dvh',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Gradient base */}
      <div style={{ position: 'absolute', inset: 0, background: gradientBg }} />

      {/* Geometric line-art animations – CSS only, low opacity */}
      {!shouldReduceMotion && (
        <>
          <style>{`
            @keyframes fl-geo-drift1 {
              0%   { transform: translate(0, 0) rotate(0deg); opacity: 0.08; }
              50%  { transform: translate(40px, -60px) rotate(180deg); opacity: 0.14; }
              100% { transform: translate(0, 0) rotate(360deg); opacity: 0.08; }
            }
            @keyframes fl-geo-drift2 {
              0%   { transform: translate(0, 0) rotate(45deg); opacity: 0.06; }
              50%  { transform: translate(-50px, 70px) rotate(225deg); opacity: 0.12; }
              100% { transform: translate(0, 0) rotate(405deg); opacity: 0.06; }
            }
            @keyframes fl-geo-drift3 {
              0%   { transform: translate(0, 0) rotate(20deg); opacity: 0.07; }
              33%  { transform: translate(60px, 30px) rotate(140deg); opacity: 0.13; }
              66%  { transform: translate(-30px, 80px) rotate(260deg); opacity: 0.07; }
              100% { transform: translate(0, 0) rotate(380deg); opacity: 0.07; }
            }
            @keyframes fl-geo-drift4 {
              0%   { transform: translate(0, 0) rotate(0deg); opacity: 0.05; }
              50%  { transform: translate(-70px, -40px) rotate(180deg); opacity: 0.10; }
              100% { transform: translate(0, 0) rotate(360deg); opacity: 0.05; }
            }
            @keyframes fl-geo-drift5 {
              0%   { transform: translate(0, 0) rotate(60deg); opacity: 0.09; }
              40%  { transform: translate(80px, 50px) rotate(200deg); opacity: 0.14; }
              80%  { transform: translate(-20px, -60px) rotate(320deg); opacity: 0.06; }
              100% { transform: translate(0, 0) rotate(420deg); opacity: 0.09; }
            }
            @keyframes fl-geo-drift6 {
              0%   { transform: translate(0, 0) rotate(15deg); opacity: 0.06; }
              50%  { transform: translate(55px, -80px) rotate(195deg); opacity: 0.11; }
              100% { transform: translate(0, 0) rotate(375deg); opacity: 0.06; }
            }
            @keyframes fl-geo-line-h {
              0%   { transform: scaleX(0.6) translateY(0); opacity: 0.06; }
              50%  { transform: scaleX(1.2) translateY(-20px); opacity: 0.12; }
              100% { transform: scaleX(0.6) translateY(0); opacity: 0.06; }
            }
            @keyframes fl-geo-line-v {
              0%   { transform: scaleY(0.6) translateX(0); opacity: 0.05; }
              50%  { transform: scaleY(1.3) translateX(15px); opacity: 0.11; }
              100% { transform: scaleY(0.6) translateX(0); opacity: 0.05; }
            }
          `}</style>

          {/* Shape 1 – hollow square, upper-left area */}
          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: '12%',
              left: '8%',
              width: 80,
              height: 80,
              border: '1.5px solid #AFCAFC',
              borderRadius: 2,
              animation: 'fl-geo-drift1 18s ease-in-out infinite',
            }}
          />

          {/* Shape 2 – rotated hollow square (diamond), upper-right */}
          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: '8%',
              right: '15%',
              width: 60,
              height: 60,
              border: '1px solid #5FC4BE',
              borderRadius: 2,
              animation: 'fl-geo-drift2 22s ease-in-out infinite',
            }}
          />

          {/* Shape 3 – large hollow rectangle, center-right */}
          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: '35%',
              right: '10%',
              width: 120,
              height: 70,
              border: '1px solid #AFCAFC',
              borderRadius: 2,
              animation: 'fl-geo-drift3 25s ease-in-out infinite',
            }}
          />

          {/* Shape 4 – small square, lower-left */}
          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '12%',
              width: 45,
              height: 45,
              border: '1px solid #5FC4BE',
              borderRadius: 2,
              animation: 'fl-geo-drift4 20s ease-in-out infinite',
            }}
          />

          {/* Shape 5 – medium square, lower-right */}
          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '20%',
              width: 90,
              height: 90,
              border: '1.5px solid #AFCAFC',
              borderRadius: 2,
              animation: 'fl-geo-drift5 28s ease-in-out infinite',
            }}
          />

          {/* Shape 6 – wide hollow rectangle, middle-left */}
          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: '55%',
              left: '5%',
              width: 140,
              height: 50,
              border: '1px solid #5FC4BE',
              borderRadius: 2,
              animation: 'fl-geo-drift6 23s ease-in-out infinite',
            }}
          />

          {/* Shape 7 – horizontal accent line, upper area */}
          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: '22%',
              left: '30%',
              width: 160,
              height: 0,
              borderTop: '1px solid #AFCAFC',
              animation: 'fl-geo-line-h 16s ease-in-out infinite',
            }}
          />

          {/* Shape 8 – vertical accent line, right side */}
          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: '30%',
              right: '25%',
              width: 0,
              height: 130,
              borderLeft: '1px solid #5FC4BE',
              animation: 'fl-geo-line-v 19s ease-in-out infinite',
            }}
          />

          {/* Shape 9 – tiny square dot cluster, scattered */}
          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: '68%',
              left: '55%',
              width: 30,
              height: 30,
              border: '1px solid #AFCAFC',
              borderRadius: 1,
              animation: 'fl-geo-drift1 14s ease-in-out infinite 2s',
            }}
          />

          <div
            aria-hidden='true'
            style={{
              position: 'absolute',
              top: '42%',
              left: '70%',
              width: 50,
              height: 50,
              border: '1px solid #5FC4BE',
              borderRadius: 1,
              animation: 'fl-geo-drift3 17s ease-in-out infinite 4s',
            }}
          />
        </>
      )}
    </div>
  );
};

export default BackgroundLayer;
