'use client';

/**
 * RedAppleFilterDemo Component
 *
 * Interactive demo that applies visual perception filters to a red apple image,
 * illustrating how different visual conditions (protanopia, deuteranopia, tritanopia,
 * grayscale, low light) alter what we think we see.
 *
 * Part of The Resonant Identity (TRI) — Perception & Interpretive Hygiene module.
 */

import React, { useState } from 'react';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import {
  getImageFilterCss,
  type ImageFilterMode,
} from '@/theme/hooks/useColorVisionFilter';

// ─── Filter configuration ─────────────────────────────────────────────────────

interface FilterOption {
  mode: ImageFilterMode;
  label: string;
  description: string;
  icon: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  {
    mode: 'normal',
    label: 'Normal',
    description: 'The apple as most people see it — vivid red.',
    icon: '👁️',
  },
  {
    mode: 'protanopia',
    label: 'Protanopia',
    description:
      'Red colorblindness. Reds shift to a dark brown. The apple and the leaf lose their signature hues.',
    icon: '🔴',
  },
  {
    mode: 'deuteranopia',
    label: 'Deuteranopia',
    description:
      'Green colorblindness — the most common form. Reds and greens both collapse toward dull olive-yellow. The apple and the leaf lose their contrast with each other; both look like the same faded hue.',
    icon: '🟡',
  },
  {
    mode: 'tritanopia',
    label: 'Tritanopia',
    description:
      'Blue-yellow colorblindness. Reds shift toward orange, blues appear greenish, and yellows look pinkish. The red and green colors are mostly preserved, but they look faded.',
    icon: '🔵',
  },
  {
    mode: 'grayscale',
    label: 'Grayscale',
    description:
      'All color has been removed. Shape and brightness remain. The apple is still identifiable, but reduced to just black and white.',
    icon: '⬜',
  },
  {
    mode: 'lowlight',
    label: 'Low Light',
    description:
      'Dim lighting simulation. Detail collapses. Perception becomes interpretation.',
    icon: '🌑',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const APPLE_IMAGE_PATH =
  '/blog/posts/tri-red-apple-perception-demo/images/red-apple.svg';

/**
 * RedAppleFilterDemo
 *
 * Displays a red apple image and lets the user switch between five perceptual
 * filter modes. Uses `getImageFilterCss()` from `useColorVisionFilter` to apply
 * CSS filter chains that simulate different vision conditions.
 */
export function RedAppleFilterDemo({ isModal = false }: { isModal?: boolean }) {
  const [activeMode, setActiveMode] = useState<ImageFilterMode>('normal');
  const isMobileHook = useIsMobile();
  const isMobile = isMobileHook;

  const activeFilter = FILTER_OPTIONS.find((f) => f.mode === activeMode)!;
  const cssFilter = getImageFilterCss(activeMode);

  // ── Derived styles ──────────────────────────────────────────────────────────

  const containerStyle: React.CSSProperties = {
    borderRadius: 'var(--fx-radius-card-lg)',
    border: '1px solid var(--fx-border)',
    overflow: 'hidden',
    backgroundColor: 'var(--fx-surface-card)',
    boxShadow: 'var(--fx-toast-shadow)',
  };

  const imageWrapStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: '1 / 1',
    maxHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--fx-bg-deep)',
    overflow: 'hidden',
  };

  const imgStyle: React.CSSProperties = {
    filter: cssFilter,
    transition: 'filter 0.4s ease',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    display: 'block',
  };

  const filterBandStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    padding: '8px 16px',
    borderTop: '1px solid var(--fx-border)',
    backgroundColor: 'var(--fx-surface-card)',
    justifyContent: 'center',
  };

  const descriptionAreaStyle: React.CSSProperties = {
    padding: '8px 16px 16px',
    borderTop: '1px solid var(--fx-border)',
    minHeight: '4.5rem',
  };

  return (
    <div
      className={`w-full max-w-xl ${isMobile ? 'mx-auto' : ''}`}
      style={containerStyle}
      role='region'
      aria-label='Red Apple Perception Filter Demo'
    >
      {isModal && (
        <h3
          style={{
            padding: '16px',
            color: 'var(--fx-accent)',
            marginTop: '16px',
            marginBottom: '16px',
            marginLeft: '8px',
            fontSize: 'var(--fx-h3-size)',
            fontWeight: 'var(--fx-h3-weight)' as unknown as number,
            fontFamily: 'var(--fx-font)',
            letterSpacing: 'var(--fx-heading-tracking)',
          }}
        >
          Red Apple Perception Demo
        </h3>
      )}
      {/* ── Image panel ──────────────────────────────────────────────────────── */}
      <div style={imageWrapStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={APPLE_IMAGE_PATH}
          alt='A red apple used to demonstrate perceptual colour filters'
          style={imgStyle}
          width={380}
          height={420}
        />

        {/* Active filter label badge */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'var(--fx-accent)',
            color: 'var(--fx-accent-ink)',
            padding: '2px 8px',
            borderRadius: 'var(--fx-radius-control)',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
          }}
          aria-hidden='true'
        >
          {activeFilter.label}
        </div>
      </div>

      {/* ── Filter buttons ───────────────────────────────────────────────────── */}
      <div style={filterBandStyle} role='group' aria-label='Select a filter'>
        {FILTER_OPTIONS.map((opt) => {
          const isActive = opt.mode === activeMode;
          return (
            <button
              key={opt.mode}
              type='button'
              aria-label={
                isActive
                  ? `${opt.label} filter selected`
                  : `Apply ${opt.label} filter`
              }
              aria-pressed={isActive}
              onClick={() => setActiveMode(opt.mode)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '4px 8px',
                borderRadius: 'var(--fx-radius-control)',
                border: isActive
                  ? '2px solid var(--fx-accent)'
                  : '1px solid var(--fx-border)',
                backgroundColor: isActive
                  ? 'var(--fx-hover-fill)'
                  : 'transparent',
                color: isActive
                  ? 'var(--fx-accent)'
                  : 'var(--fx-text-muted)',
                fontWeight: isActive ? 600 : 400,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span aria-hidden='true' style={{ fontSize: '1rem' }}>
                {opt.icon}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* ── Description ──────────────────────────────────────────────────────── */}
      <div style={descriptionAreaStyle}>
        <p
          style={{
            color: 'var(--fx-text-muted)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            fontFamily: 'var(--fx-font)',
          }}
        >
          <strong style={{ color: 'var(--fx-accent)' }}>
            {activeFilter.icon} {activeFilter.label}:
          </strong>{' '}
          {activeFilter.description}
        </p>
      </div>
    </div>
  );
}

export default RedAppleFilterDemo;
