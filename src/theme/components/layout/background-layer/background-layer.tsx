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
  // Horizontal gradient – dark left, blue-navy right
  const gradientBg =
    themeMode === 'high-contrast'
      ? '#000000'
      : themeMode === 'grayscale' || themeMode === 'grayscale-dark'
        ? 'linear-gradient(to right, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)'
        : 'linear-gradient(to right, #010105 0%, #040c1a 20%, #0a1628 40%, #0f2240 60%, #153058 80%, #0d1f3d 100%)';

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

      {/* Constellation wireframe – interconnected nodes & edges, right-biased */}
      {!shouldReduceMotion && (
        <>
          <style>{`
            /* ── Node glow pulse ─────────────────────────────────── */
            @keyframes fl-node-pulse {
              0%, 100% { box-shadow: 0 0 4px 1px rgba(95,196,190,0.6), 0 0 12px 3px rgba(95,196,190,0.2); transform: scale(1); }
              50%      { box-shadow: 0 0 8px 3px rgba(95,196,190,0.9), 0 0 24px 6px rgba(95,196,190,0.35); transform: scale(1.3); }
            }
            @keyframes fl-node-pulse-blue {
              0%, 100% { box-shadow: 0 0 4px 1px rgba(175,202,252,0.6), 0 0 12px 3px rgba(175,202,252,0.2); transform: scale(1); }
              50%      { box-shadow: 0 0 8px 3px rgba(175,202,252,0.9), 0 0 24px 6px rgba(175,202,252,0.35); transform: scale(1.3); }
            }
            /* Softer secondary pulse for smaller / dimmer nodes */
            @keyframes fl-node-dim {
              0%, 100% { box-shadow: 0 0 3px 1px rgba(95,196,190,0.3); opacity: 0.4; }
              50%      { box-shadow: 0 0 6px 2px rgba(95,196,190,0.5); opacity: 0.7; }
            }

            /* ── Mesh drift – slow positional sway ───────────────── */
            @keyframes fl-mesh-drift {
              0%   { transform: translate(0, 0); }
              25%  { transform: translate(6px, -10px); }
              50%  { transform: translate(-4px, -6px); }
              75%  { transform: translate(8px, 4px); }
              100% { transform: translate(0, 0); }
            }
            @keyframes fl-mesh-drift-alt {
              0%   { transform: translate(0, 0); }
              30%  { transform: translate(-8px, 6px); }
              60%  { transform: translate(5px, 12px); }
              100% { transform: translate(0, 0); }
            }

            /* ── Edge glow – line brightness breathe ─────────────── */
            @keyframes fl-edge-glow {
              0%, 100% { opacity: 0.12; }
              50%      { opacity: 0.3; }
            }
            @keyframes fl-edge-glow-alt {
              0%, 100% { opacity: 0.08; }
              40%      { opacity: 0.22; }
              80%      { opacity: 0.14; }
            }
            @keyframes fl-edge-glow-bright {
              0%, 100% { opacity: 0.18; }
              50%      { opacity: 0.45; }
            }

            /* ── Draw-in for lines (one-time feel, loops slowly) ── */
            @keyframes fl-line-draw {
              0%   { stroke-dashoffset: 1000; opacity: 0; }
              15%  { opacity: 0.25; }
              100% { stroke-dashoffset: 0; opacity: 0.25; }
            }
          `}</style>

          {/* ═══════════════════════════════════════════════════════════
              SVG wireframe mesh – right side constellation
              Nodes are circles with glow; edges are lines between them.
              The viewBox covers the full viewport; shapes are positioned
              in the right ~60% of the screen.
              ═══════════════════════════════════════════════════════════ */}
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
              {/* Glow filter for edges */}
              <filter
                id='fl-edge-blur'
                x='-20%'
                y='-20%'
                width='140%'
                height='140%'
              >
                <feGaussianBlur stdDeviation='1.5' />
              </filter>
              {/* Stronger glow for primary nodes */}
              <filter
                id='fl-node-glow'
                x='-50%'
                y='-50%'
                width='200%'
                height='200%'
              >
                <feGaussianBlur stdDeviation='3' result='blur' />
                <feMerge>
                  <feMergeNode in='blur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
              <filter
                id='fl-node-glow-lg'
                x='-80%'
                y='-80%'
                width='260%'
                height='260%'
              >
                <feGaussianBlur stdDeviation='5' result='blur' />
                <feMerge>
                  <feMergeNode in='blur' />
                  <feMergeNode in='blur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
            </defs>

            {/* ── GROUP 1: Upper-right cluster (primary) ──────────── */}
            <g style={{ animation: 'fl-mesh-drift 30s ease-in-out infinite' }}>
              {/* Edges */}
              <line
                x1='1180'
                y1='120'
                x2='1340'
                y2='200'
                stroke='#5FC4BE'
                strokeWidth='1'
                style={{ animation: 'fl-edge-glow 8s ease-in-out infinite' }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1340'
                y1='200'
                x2='1500'
                y2='140'
                stroke='#AFCAFC'
                strokeWidth='1'
                style={{
                  animation: 'fl-edge-glow 10s ease-in-out infinite 1s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1500'
                y1='140'
                x2='1620'
                y2='260'
                stroke='#5FC4BE'
                strokeWidth='1.2'
                style={{
                  animation: 'fl-edge-glow-bright 9s ease-in-out infinite 0.5s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1340'
                y1='200'
                x2='1620'
                y2='260'
                stroke='#AFCAFC'
                strokeWidth='0.8'
                style={{
                  animation: 'fl-edge-glow-alt 12s ease-in-out infinite 2s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1180'
                y1='120'
                x2='1500'
                y2='140'
                stroke='#5FC4BE'
                strokeWidth='0.6'
                style={{
                  animation: 'fl-edge-glow-alt 14s ease-in-out infinite',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1340'
                y1='200'
                x2='1280'
                y2='340'
                stroke='#AFCAFC'
                strokeWidth='0.8'
                style={{
                  animation: 'fl-edge-glow 11s ease-in-out infinite 3s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1500'
                y1='140'
                x2='1700'
                y2='180'
                stroke='#5FC4BE'
                strokeWidth='0.7'
                style={{
                  animation: 'fl-edge-glow-alt 13s ease-in-out infinite 1s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1700'
                y1='180'
                x2='1620'
                y2='260'
                stroke='#AFCAFC'
                strokeWidth='1'
                style={{ animation: 'fl-edge-glow 9s ease-in-out infinite 2s' }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1180'
                y1='120'
                x2='1080'
                y2='220'
                stroke='#5FC4BE'
                strokeWidth='0.6'
                style={{
                  animation: 'fl-edge-glow-alt 15s ease-in-out infinite',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1080'
                y1='220'
                x2='1280'
                y2='340'
                stroke='#AFCAFC'
                strokeWidth='0.7'
                style={{
                  animation: 'fl-edge-glow 12s ease-in-out infinite 4s',
                }}
                filter='url(#fl-edge-blur)'
              />

              {/* Nodes – upper right */}
              <circle
                cx='1180'
                cy='120'
                r='3'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{
                  animation: 'fl-node-pulse 6s ease-in-out infinite 1s',
                }}
              />
              <circle
                cx='1340'
                cy='200'
                r='4'
                fill='#AFCAFC'
                filter='url(#fl-node-glow-lg)'
                style={{
                  animation: 'fl-node-pulse-blue 5s ease-in-out infinite',
                }}
              />
              <circle
                cx='1500'
                cy='140'
                r='3.5'
                fill='#5FC4BE'
                filter='url(#fl-node-glow-lg)'
                style={{
                  animation: 'fl-node-pulse 7s ease-in-out infinite 2s',
                }}
              />
              <circle
                cx='1620'
                cy='260'
                r='3'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{
                  animation: 'fl-node-pulse-blue 8s ease-in-out infinite 1s',
                }}
              />
              <circle
                cx='1700'
                cy='180'
                r='2.5'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{
                  animation: 'fl-node-pulse 9s ease-in-out infinite 3s',
                }}
              />
              <circle
                cx='1080'
                cy='220'
                r='2'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 10s ease-in-out infinite' }}
              />
              <circle
                cx='1280'
                cy='340'
                r='2.5'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 8s ease-in-out infinite 2s' }}
              />
            </g>

            {/* ── GROUP 2: Center-right / mid-screen cluster ─────── */}
            <g
              style={{
                animation: 'fl-mesh-drift-alt 35s ease-in-out infinite',
              }}
            >
              {/* Edges */}
              <line
                x1='1280'
                y1='340'
                x2='1460'
                y2='420'
                stroke='#5FC4BE'
                strokeWidth='1'
                style={{
                  animation: 'fl-edge-glow 10s ease-in-out infinite 2s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1460'
                y1='420'
                x2='1600'
                y2='380'
                stroke='#AFCAFC'
                strokeWidth='1.2'
                style={{
                  animation: 'fl-edge-glow-bright 8s ease-in-out infinite 1s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1600'
                y1='380'
                x2='1620'
                y2='260'
                stroke='#5FC4BE'
                strokeWidth='0.8'
                style={{
                  animation: 'fl-edge-glow-alt 11s ease-in-out infinite',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1460'
                y1='420'
                x2='1560'
                y2='540'
                stroke='#AFCAFC'
                strokeWidth='1'
                style={{ animation: 'fl-edge-glow 9s ease-in-out infinite 3s' }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1600'
                y1='380'
                x2='1740'
                y2='440'
                stroke='#5FC4BE'
                strokeWidth='0.7'
                style={{
                  animation: 'fl-edge-glow-alt 13s ease-in-out infinite 2s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1740'
                y1='440'
                x2='1560'
                y2='540'
                stroke='#AFCAFC'
                strokeWidth='0.8'
                style={{
                  animation: 'fl-edge-glow 11s ease-in-out infinite 1s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1280'
                y1='340'
                x2='1200'
                y2='480'
                stroke='#5FC4BE'
                strokeWidth='0.6'
                style={{
                  animation: 'fl-edge-glow-alt 14s ease-in-out infinite 4s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1200'
                y1='480'
                x2='1460'
                y2='420'
                stroke='#AFCAFC'
                strokeWidth='0.6'
                style={{ animation: 'fl-edge-glow 12s ease-in-out infinite' }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1740'
                y1='440'
                x2='1820'
                y2='350'
                stroke='#5FC4BE'
                strokeWidth='0.5'
                style={{
                  animation: 'fl-edge-glow-alt 16s ease-in-out infinite',
                }}
                filter='url(#fl-edge-blur)'
              />

              {/* Nodes – center right */}
              <circle
                cx='1460'
                cy='420'
                r='4'
                fill='#5FC4BE'
                filter='url(#fl-node-glow-lg)'
                style={{
                  animation: 'fl-node-pulse 6s ease-in-out infinite 3s',
                }}
              />
              <circle
                cx='1600'
                cy='380'
                r='3'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{
                  animation: 'fl-node-pulse-blue 7s ease-in-out infinite 1s',
                }}
              />
              <circle
                cx='1740'
                cy='440'
                r='2.5'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-pulse 8s ease-in-out infinite' }}
              />
              <circle
                cx='1560'
                cy='540'
                r='3'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{
                  animation: 'fl-node-pulse-blue 6s ease-in-out infinite 2s',
                }}
              />
              <circle
                cx='1200'
                cy='480'
                r='2'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 9s ease-in-out infinite 1s' }}
              />
              <circle
                cx='1820'
                cy='350'
                r='1.5'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 12s ease-in-out infinite' }}
              />
            </g>

            {/* ── GROUP 3: Lower-right dense cluster ─────────────── */}
            <g
              style={{ animation: 'fl-mesh-drift 28s ease-in-out infinite 5s' }}
            >
              {/* Edges – dense triangular mesh, bottom-right */}
              <line
                x1='1560'
                y1='540'
                x2='1380'
                y2='660'
                stroke='#5FC4BE'
                strokeWidth='1'
                style={{ animation: 'fl-edge-glow 9s ease-in-out infinite' }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1380'
                y1='660'
                x2='1540'
                y2='740'
                stroke='#AFCAFC'
                strokeWidth='1.2'
                style={{
                  animation: 'fl-edge-glow-bright 7s ease-in-out infinite 2s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1540'
                y1='740'
                x2='1700'
                y2='660'
                stroke='#5FC4BE'
                strokeWidth='1'
                style={{
                  animation: 'fl-edge-glow 10s ease-in-out infinite 1s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1700'
                y1='660'
                x2='1560'
                y2='540'
                stroke='#AFCAFC'
                strokeWidth='0.8'
                style={{
                  animation: 'fl-edge-glow-alt 12s ease-in-out infinite 3s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1380'
                y1='660'
                x2='1700'
                y2='660'
                stroke='#5FC4BE'
                strokeWidth='0.7'
                style={{
                  animation: 'fl-edge-glow 11s ease-in-out infinite 2s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1540'
                y1='740'
                x2='1560'
                y2='540'
                stroke='#AFCAFC'
                strokeWidth='0.6'
                style={{
                  animation: 'fl-edge-glow-alt 13s ease-in-out infinite',
                }}
                filter='url(#fl-edge-blur)'
              />
              {/* Extensions into bottom-right corner */}
              <line
                x1='1700'
                y1='660'
                x2='1820'
                y2='720'
                stroke='#5FC4BE'
                strokeWidth='1'
                style={{
                  animation: 'fl-edge-glow-bright 8s ease-in-out infinite 1s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1820'
                y1='720'
                x2='1760'
                y2='850'
                stroke='#AFCAFC'
                strokeWidth='0.8'
                style={{
                  animation: 'fl-edge-glow 10s ease-in-out infinite 3s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1540'
                y1='740'
                x2='1480'
                y2='880'
                stroke='#5FC4BE'
                strokeWidth='0.7'
                style={{
                  animation: 'fl-edge-glow-alt 11s ease-in-out infinite 2s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1480'
                y1='880'
                x2='1760'
                y2='850'
                stroke='#AFCAFC'
                strokeWidth='1'
                style={{ animation: 'fl-edge-glow 9s ease-in-out infinite' }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1760'
                y1='850'
                x2='1880'
                y2='920'
                stroke='#5FC4BE'
                strokeWidth='0.8'
                style={{
                  animation: 'fl-edge-glow-bright 7s ease-in-out infinite 4s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1480'
                y1='880'
                x2='1360'
                y2='940'
                stroke='#AFCAFC'
                strokeWidth='0.6'
                style={{
                  animation: 'fl-edge-glow-alt 14s ease-in-out infinite',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1820'
                y1='720'
                x2='1700'
                y2='660'
                stroke='#5FC4BE'
                strokeWidth='0.5'
                style={{
                  animation: 'fl-edge-glow 13s ease-in-out infinite 1s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1380'
                y1='660'
                x2='1260'
                y2='760'
                stroke='#AFCAFC'
                strokeWidth='0.6'
                style={{
                  animation: 'fl-edge-glow-alt 12s ease-in-out infinite 3s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1260'
                y1='760'
                x2='1480'
                y2='880'
                stroke='#5FC4BE'
                strokeWidth='0.5'
                style={{ animation: 'fl-edge-glow 15s ease-in-out infinite' }}
                filter='url(#fl-edge-blur)'
              />

              {/* Nodes – lower right */}
              <circle
                cx='1380'
                cy='660'
                r='3.5'
                fill='#5FC4BE'
                filter='url(#fl-node-glow-lg)'
                style={{
                  animation: 'fl-node-pulse 5s ease-in-out infinite 2s',
                }}
              />
              <circle
                cx='1540'
                cy='740'
                r='3'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{
                  animation: 'fl-node-pulse-blue 6s ease-in-out infinite',
                }}
              />
              <circle
                cx='1700'
                cy='660'
                r='4'
                fill='#5FC4BE'
                filter='url(#fl-node-glow-lg)'
                style={{
                  animation: 'fl-node-pulse 7s ease-in-out infinite 1s',
                }}
              />
              <circle
                cx='1820'
                cy='720'
                r='3.5'
                fill='#AFCAFC'
                filter='url(#fl-node-glow-lg)'
                style={{
                  animation: 'fl-node-pulse-blue 5s ease-in-out infinite 3s',
                }}
              />
              <circle
                cx='1760'
                cy='850'
                r='3'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{
                  animation: 'fl-node-pulse 8s ease-in-out infinite 2s',
                }}
              />
              <circle
                cx='1480'
                cy='880'
                r='2.5'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{
                  animation: 'fl-node-pulse-blue 6s ease-in-out infinite 4s',
                }}
              />
              <circle
                cx='1880'
                cy='920'
                r='2'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 7s ease-in-out infinite 1s' }}
              />
              <circle
                cx='1360'
                cy='940'
                r='2'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 9s ease-in-out infinite' }}
              />
              <circle
                cx='1260'
                cy='760'
                r='2'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 11s ease-in-out infinite 2s' }}
              />
            </g>

            {/* ── GROUP 4: Far-scattered peripheral nodes ─────────── */}
            <g>
              {/* Faint connecting threads from main mesh to edges */}
              <line
                x1='1080'
                y1='220'
                x2='920'
                y2='320'
                stroke='#5FC4BE'
                strokeWidth='0.4'
                style={{
                  animation: 'fl-edge-glow-alt 18s ease-in-out infinite',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='920'
                y1='320'
                x2='1000'
                y2='500'
                stroke='#AFCAFC'
                strokeWidth='0.4'
                style={{
                  animation: 'fl-edge-glow-alt 20s ease-in-out infinite 2s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1000'
                y1='500'
                x2='1200'
                y2='480'
                stroke='#5FC4BE'
                strokeWidth='0.4'
                style={{
                  animation: 'fl-edge-glow-alt 16s ease-in-out infinite 4s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1260'
                y1='760'
                x2='1140'
                y2='860'
                stroke='#AFCAFC'
                strokeWidth='0.3'
                style={{
                  animation: 'fl-edge-glow-alt 22s ease-in-out infinite',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1360'
                y1='940'
                x2='1200'
                y2='1000'
                stroke='#5FC4BE'
                strokeWidth='0.3'
                style={{
                  animation: 'fl-edge-glow-alt 19s ease-in-out infinite 3s',
                }}
                filter='url(#fl-edge-blur)'
              />
              <line
                x1='1880'
                y1='920'
                x2='1900'
                y2='1060'
                stroke='#AFCAFC'
                strokeWidth='0.3'
                style={{
                  animation: 'fl-edge-glow-alt 17s ease-in-out infinite 1s',
                }}
                filter='url(#fl-edge-blur)'
              />

              {/* Distant dim nodes */}
              <circle
                cx='920'
                cy='320'
                r='1.5'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 14s ease-in-out infinite' }}
              />
              <circle
                cx='1000'
                cy='500'
                r='1.5'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 12s ease-in-out infinite 3s' }}
              />
              <circle
                cx='1140'
                cy='860'
                r='1.5'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 16s ease-in-out infinite 1s' }}
              />
              <circle
                cx='1200'
                cy='1000'
                r='1'
                fill='#5FC4BE'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 18s ease-in-out infinite' }}
              />
              <circle
                cx='1900'
                cy='1060'
                r='1'
                fill='#AFCAFC'
                filter='url(#fl-node-glow)'
                style={{ animation: 'fl-node-dim 15s ease-in-out infinite 5s' }}
              />
            </g>

            {/* ── Faint dashed triangles (background depth) ──────── */}
            <g opacity='0.06'>
              <polygon
                points='1100,100 1300,50 1200,250'
                fill='none'
                stroke='#AFCAFC'
                strokeWidth='0.5'
                strokeDasharray='4 6'
              />
              <polygon
                points='1500,350 1750,300 1650,550'
                fill='none'
                stroke='#5FC4BE'
                strokeWidth='0.5'
                strokeDasharray='4 6'
              />
              <polygon
                points='1300,700 1500,600 1450,850'
                fill='none'
                stroke='#AFCAFC'
                strokeWidth='0.5'
                strokeDasharray='4 6'
              />
            </g>
          </svg>
        </>
      )}
    </div>
  );
};

export default BackgroundLayer;
