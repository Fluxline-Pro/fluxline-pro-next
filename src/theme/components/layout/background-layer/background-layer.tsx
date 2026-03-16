'use client';

import React from 'react';

import { useColorVisionFilter } from '../../../hooks/useColorVisionFilter';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import type { IExtendedTheme, ThemeMode } from '../../../theme';

const MOBILE_BACKGROUND_IMAGE_PATH =
  '/images/home/HomePageMobileGeometricBackground.jpg';
const MOBILE_BACKGROUND_FALLBACK_PATH = MOBILE_BACKGROUND_IMAGE_PATH;

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
  theme,
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
    const mobileImagePath = MOBILE_BACKGROUND_IMAGE_PATH;

    const mobileOverlay =
      themeMode === 'high-contrast'
        ? 'rgba(0,0,0,0.6)'
        : 'linear-gradient(to bottom, rgba(0,0,8,0.12) 0%, rgba(0,0,0,0.28) 38%, rgba(1,1,5,0.72) 100%)';

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
            backgroundImage: `url(${mobileImagePath}), url(${MOBILE_BACKGROUND_FALLBACK_PATH})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center, center',
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

  // ── Desktop / large-tablet background: left-right geometric SVG mesh ──
  const isMonochromeMode =
    themeMode === 'grayscale' || themeMode === 'grayscale-dark';
  const primaryColor = isMonochromeMode
    ? '#b8b8b8'
    : (theme.palette.themePrimary ?? '#00f0ff');
  const secondaryColor = isMonochromeMode
    ? '#8a8a8a'
    : (theme.palette.themeTertiary ?? '#5a7ca0');
  const accentGlow = isMonochromeMode
    ? '#e6e6e6'
    : (theme.palette.themePrimary ?? '#afcafc');
  const tertiaryLineColor = isMonochromeMode
    ? '#d2d2d2'
    : (theme.palette.themePrimary ?? '#7dc9ff');
  const subtleFillColor = isMonochromeMode
    ? '#6f6f6f'
    : (theme.palette.themeLighterAlt ?? '#1f2d42');
  const deepAccentColor = isMonochromeMode
    ? '#a0a0a0'
    : (theme.palette.themeDark ?? '#1f1f1f');

  const bgColorStart =
    themeMode === 'high-contrast'
      ? '#000000'
      : isMonochromeMode
        ? '#111111'
        : (theme.palette.themeDarker ?? '#021626');
  const bgColorEnd =
    themeMode === 'high-contrast'
      ? '#000000'
      : isMonochromeMode
        ? '#050505'
        : (theme.palette.neutralDark ?? '#010a12');

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
        filter,
        ['--background-accent-glow' as string]: accentGlow,
      }}
    >
      {/* Gradient base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(135deg, ${bgColorStart} 0%, ${bgColorEnd} 100%)`,
        }}
      />

      {/* Left/right geometric background mesh */}
      {!shouldReduceMotion && (
        <>
          <style>{`
            @keyframes drawLine {
              0% { stroke-dashoffset: 3000; opacity: 0; }
              5% { opacity: 1; }
              100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes fadeIn {
              0% { opacity: 0; }
              100% { opacity: 0.25; }
            }
            @keyframes pulseGlow {
              0%, 100% { opacity: 0.5; r: 2.5; }
              50% { opacity: 1; r: 4.5; }
            }
            @keyframes pulseIntense {
              0%, 100% { opacity: 0.7; r: 4; }
              50% { opacity: 1; r: 7; }
            }
            @keyframes slowTurnRight {
              0% { transform: rotate(0deg) translate(0px, 0px) scale(1); }
              100% { transform: rotate(-3deg) translate(-30px, 20px) scale(1.03); }
            }
            @keyframes driftLeft {
              0% { transform: translate(0px, 0px) rotate(0deg); }
              100% { transform: translate(15px, -15px) rotate(1deg); }
            }
            @keyframes panBridge {
              0% { opacity: 0.1; }
              50% { opacity: 0.4; }
              100% { opacity: 0.1; }
            }
            @keyframes scaffoldPulse {
              0%, 100% { opacity: 0.12; }
              50% { opacity: 0.32; }
            }
            @keyframes polygonBreathe {
              0%, 100% { opacity: 0.025; }
              50% { opacity: 0.08; }
            }

            .animated-path {
              stroke-dasharray: 3000;
              stroke-dashoffset: 3000;
              animation: drawLine 5s ease-out forwards;
            }

            .delay-1 { animation-delay: 0.5s; }
            .delay-2 { animation-delay: 1.5s; }
            .delay-3 { animation-delay: 2.5s; }
            .delay-4 { animation-delay: 3.5s; }

            .right-cluster {
              transform-origin: 1600px 540px;
              animation: slowTurnRight 18s infinite alternate ease-in-out;
            }

            .left-cluster {
              transform-origin: 300px 300px;
              animation: driftLeft 20s infinite alternate ease-in-out;
            }

            .node-pulse { animation: pulseGlow 4s infinite ease-in-out; }
            .node-intense { animation: pulseIntense 3s infinite ease-in-out; fill: var(--background-accent-glow); }

            .faint-poly {
              opacity: 0;
              animation: fadeIn 6s ease-in forwards;
              animation-delay: 2s;
            }

            .bridge-line {
              animation: panBridge 8s infinite alternate ease-in-out;
            }

            .scaffold-line {
              animation: scaffoldPulse 9s infinite alternate ease-in-out;
            }

            .scaffold-poly {
              animation: polygonBreathe 11s infinite alternate ease-in-out;
            }
          `}</style>

          <svg
            aria-hidden='true'
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
            viewBox='0 0 1920 1080'
            preserveAspectRatio='xMidYMid slice'
            xmlns='http://www.w3.org/2000/svg'
          >
            <defs>
              <filter id='glow' x='-20%' y='-20%' width='140%' height='140%'>
                <feGaussianBlur stdDeviation='6' result='blur' />
                <feComposite in='SourceGraphic' in2='blur' operator='over' />
              </filter>

              <filter
                id='intense-glow'
                x='-50%'
                y='-50%'
                width='200%'
                height='200%'
              >
                <feGaussianBlur stdDeviation='12' result='blur1' />
                <feGaussianBlur stdDeviation='4' result='blur2' />
                <feMerge>
                  <feMergeNode in='blur1' />
                  <feMergeNode in='blur2' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
            </defs>

            <g className='left-cluster'>
              <polygon
                points='100,50 400,150 250,350'
                fill={secondaryColor}
                className='faint-poly'
                style={{ opacity: 0.03 }}
              />
              <polygon
                points='250,350 400,150 600,450'
                fill={primaryColor}
                className='faint-poly'
                style={{ opacity: 0.02 }}
              />
              <polygon
                points='-40,260 120,140 220,420 30,520'
                fill={subtleFillColor}
                className='scaffold-poly'
                style={{ animationDelay: '1.1s' }}
              />
              <polygon
                points='220,420 430,300 560,520 300,640'
                fill={deepAccentColor}
                className='scaffold-poly'
                style={{ animationDelay: '2.3s' }}
              />

              <g
                stroke={primaryColor}
                strokeWidth='1'
                fill='none'
                style={{ opacity: 0.6 }}
              >
                <path
                  className='animated-path delay-1'
                  d='M -50 150 L 100 50 L 400 150 L 600 450'
                />
                <path
                  className='animated-path delay-2'
                  d='M 100 50 L 250 350 L 400 150'
                />
                <path
                  className='animated-path delay-3'
                  d='M -100 400 L 250 350 L 300 600'
                />
                <path
                  className='animated-path delay-4'
                  d='M 250 350 L 600 450'
                />
                <path
                  className='animated-path delay-2'
                  d='M -60 250 L 220 420 L 430 300 L 560 520'
                  stroke={tertiaryLineColor}
                  style={{ opacity: 0.55 }}
                />
                <path
                  className='animated-path delay-4'
                  d='M 120 140 L 30 520 L 300 640 L 560 520'
                  stroke={secondaryColor}
                  style={{ opacity: 0.45 }}
                />
              </g>

              <g
                stroke={tertiaryLineColor}
                strokeWidth='0.75'
                fill='none'
                strokeDasharray='5 10'
                style={{ opacity: 0.35 }}
              >
                <path
                  className='scaffold-line'
                  d='M -40 260 L 220 420 L 300 640'
                />
                <path
                  className='scaffold-line'
                  d='M 120 140 L 430 300 L 560 520'
                  style={{ animationDelay: '1.8s' }}
                />
              </g>

              <g fill={primaryColor} filter='url(#glow)'>
                <circle
                  cx='100'
                  cy='50'
                  className='node-pulse'
                  style={{ animationDelay: '0.2s' }}
                />
                <circle
                  cx='400'
                  cy='150'
                  className='node-pulse'
                  style={{ animationDelay: '1.1s' }}
                />
                <circle
                  cx='250'
                  cy='350'
                  className='node-pulse'
                  style={{ animationDelay: '0.7s' }}
                />
                <circle
                  cx='600'
                  cy='450'
                  className='node-intense'
                  filter='url(#intense-glow)'
                  style={{ animationDelay: '1.5s' }}
                />
                <circle
                  cx='300'
                  cy='600'
                  className='node-pulse'
                  style={{ animationDelay: '2.0s' }}
                />
              </g>
            </g>

            <g
              stroke={secondaryColor}
              strokeWidth='0.75'
              fill='none'
              className='bridge-line'
              strokeDasharray='10 15'
            >
              <path
                className='animated-path delay-3'
                d='M 600 450 Q 1000 300 1300 150'
              />
              <path
                className='animated-path delay-4'
                d='M 400 150 Q 900 600 1100 650'
              />
              <path
                className='animated-path delay-4'
                d='M 300 600 Q 800 900 1400 1050'
              />
              <path
                className='animated-path delay-2'
                d='M 560 520 Q 1040 480 1700 360'
                stroke={tertiaryLineColor}
              />
              <path
                className='animated-path delay-3'
                d='M 430 300 Q 980 130 1500 140'
                stroke={tertiaryLineColor}
              />
            </g>

            <g
              stroke={tertiaryLineColor}
              strokeWidth='0.6'
              fill='none'
              strokeDasharray='4 12'
              style={{ opacity: 0.28 }}
            >
              <path
                className='scaffold-line'
                d='M 300 640 Q 900 760 1550 750'
              />
              <path
                className='scaffold-line'
                d='M 100 50 Q 740 10 1300 150'
                style={{ animationDelay: '2.1s' }}
              />
            </g>

            <g className='right-cluster'>
              <polygon
                points='1300,150 1700,50 1650,450'
                fill={secondaryColor}
                className='faint-poly'
                style={{ opacity: 0.05 }}
              />
              <polygon
                points='1650,450 1850,350 1550,750 1100,650'
                fill={primaryColor}
                className='faint-poly'
                style={{ opacity: 0.04 }}
              />
              <polygon
                points='1100,650 1550,750 1400,1050 850,950'
                fill={secondaryColor}
                className='faint-poly'
                style={{ opacity: 0.03 }}
              />
              <polygon
                points='1850,350 2050,600 1750,900 1550,750'
                fill={primaryColor}
                className='faint-poly'
                style={{ opacity: 0.02 }}
              />
              <polygon
                points='1400,1050 1750,900 1500,1200'
                fill={secondaryColor}
                className='faint-poly'
                style={{ opacity: 0.03 }}
              />
              <polygon
                points='1180,220 1480,90 1780,260 1450,420'
                fill={subtleFillColor}
                className='scaffold-poly'
                style={{ animationDelay: '0.9s' }}
              />
              <polygon
                points='1220,600 1500,520 1780,700 1580,920 1320,860'
                fill={deepAccentColor}
                className='scaffold-poly'
                style={{ animationDelay: '1.9s' }}
              />

              <path
                d='M 1300 150 L 1650 450 M 1100 650 L 1400 1050 M 1650 450 L 1100 650 M 1550 750 L 1750 900'
                stroke={secondaryColor}
                strokeWidth='1.5'
                strokeDasharray='2 6'
                fill='none'
                style={{ opacity: 0.5 }}
              />

              <g stroke={primaryColor} strokeWidth='1.5' fill='none'>
                <path
                  className='animated-path'
                  d='M 1950 -50 L 1300 150 L 1700 50 L 1850 350 Z'
                />
                <path
                  className='animated-path delay-1'
                  d='M 1300 150 L 1650 450 L 1850 350'
                />
                <path
                  className='animated-path delay-1'
                  d='M 1650 450 L 1550 750 L 1850 350'
                />
                <path
                  className='animated-path delay-2'
                  d='M 1100 650 L 1650 450'
                />
                <path
                  className='animated-path delay-2'
                  d='M 1100 650 L 1550 750 L 1400 1050'
                />
                <path
                  className='animated-path delay-3'
                  d='M 1100 650 L 850 950 L 1400 1050 Z'
                />
                <path
                  className='animated-path delay-3'
                  d='M 850 950 L 700 1150 L 1400 1050'
                />
                <path
                  className='animated-path delay-2'
                  d='M 1850 350 L 2050 600 L 1750 900 L 1550 750'
                />
                <path
                  className='animated-path delay-4'
                  d='M 1550 750 L 1750 900 L 1400 1050'
                />
                <path
                  className='animated-path delay-4'
                  d='M 1400 1050 L 1500 1200 L 1750 900'
                />
                <path
                  className='animated-path delay-1'
                  d='M 1180 220 L 1480 90 L 1780 260 L 1650 450'
                  stroke={tertiaryLineColor}
                  strokeWidth='1.2'
                  style={{ opacity: 0.7 }}
                />
                <path
                  className='animated-path delay-3'
                  d='M 1220 600 L 1500 520 L 1780 700 L 1580 920 L 1320 860 Z'
                  stroke={secondaryColor}
                  strokeWidth='1.1'
                  style={{ opacity: 0.55 }}
                />
                <path
                  className='animated-path delay-2'
                  d='M 1450 420 L 1500 520 L 1650 450 L 1780 700'
                  stroke={deepAccentColor}
                  strokeWidth='1'
                  style={{ opacity: 0.55 }}
                />
              </g>

              <g
                stroke={tertiaryLineColor}
                strokeWidth='0.9'
                fill='none'
                strokeDasharray='3 8'
                style={{ opacity: 0.42 }}
              >
                <path
                  className='scaffold-line'
                  d='M 1180 220 L 1450 420 L 1220 600 L 1320 860'
                />
                <path
                  className='scaffold-line'
                  d='M 1480 90 L 1700 50 L 1850 350 L 1780 700 L 1750 900'
                  style={{ animationDelay: '1.6s' }}
                />
                <path
                  className='scaffold-line'
                  d='M 1400 1050 L 1580 920 L 1500 520'
                  style={{ animationDelay: '2.2s' }}
                />
              </g>

              <g fill={primaryColor} filter='url(#glow)'>
                <circle
                  cx='1300'
                  cy='150'
                  className='node-intense'
                  filter='url(#intense-glow)'
                  style={{ animationDelay: '0s' }}
                />
                <circle
                  cx='1700'
                  cy='50'
                  className='node-pulse'
                  style={{ animationDelay: '1s' }}
                />
                <circle
                  cx='1650'
                  cy='450'
                  className='node-pulse'
                  style={{ animationDelay: '0.5s' }}
                />
                <circle
                  cx='1850'
                  cy='350'
                  className='node-pulse'
                  style={{ animationDelay: '1.5s' }}
                />
                <circle
                  cx='1100'
                  cy='650'
                  className='node-intense'
                  filter='url(#intense-glow)'
                  style={{ animationDelay: '2s' }}
                />
                <circle
                  cx='1550'
                  cy='750'
                  className='node-pulse'
                  style={{ animationDelay: '0.3s' }}
                />
                <circle
                  cx='850'
                  cy='950'
                  className='node-pulse'
                  style={{ animationDelay: '1.2s' }}
                />
                <circle
                  cx='1400'
                  cy='1050'
                  className='node-pulse'
                  style={{ animationDelay: '0.8s' }}
                />
                <circle
                  cx='2050'
                  cy='600'
                  className='node-pulse'
                  style={{ animationDelay: '0.9s' }}
                />
                <circle
                  cx='1480'
                  cy='90'
                  className='node-pulse'
                  style={{ animationDelay: '1.4s' }}
                  fill={tertiaryLineColor}
                />
                <circle
                  cx='1450'
                  cy='420'
                  className='node-pulse'
                  style={{ animationDelay: '2.1s' }}
                  fill={tertiaryLineColor}
                />
                <circle
                  cx='1500'
                  cy='520'
                  className='node-pulse'
                  style={{ animationDelay: '0.6s' }}
                  fill={secondaryColor}
                />
                <circle
                  cx='1780'
                  cy='700'
                  className='node-pulse'
                  style={{ animationDelay: '1.7s' }}
                  fill={deepAccentColor}
                />
                <circle
                  cx='1580'
                  cy='920'
                  className='node-pulse'
                  style={{ animationDelay: '2.7s' }}
                  fill={tertiaryLineColor}
                />
                <circle
                  cx='1320'
                  cy='860'
                  className='node-pulse'
                  style={{ animationDelay: '1.3s' }}
                  fill={secondaryColor}
                />
                <circle
                  cx='1750'
                  cy='900'
                  className='node-intense'
                  filter='url(#intense-glow)'
                  style={{ animationDelay: '2.5s' }}
                />
                <circle
                  cx='1500'
                  cy='1200'
                  className='node-pulse'
                  style={{ animationDelay: '1.8s' }}
                />
              </g>
            </g>
          </svg>
        </>
      )}
    </div>
  );
};

export default BackgroundLayer;
