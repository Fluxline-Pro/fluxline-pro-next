'use client';

import React from 'react';
import Link from 'next/link';
import { FadeUp } from '@/animations/fade-animations';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxButton from '@/theme/components/dsm/FxButton';
import type { PodcastEpisode } from '@/app/podcasts/types';

export interface HeroSimpleProps {
  title: string;
  subtitle?: string;
  description?: string;
  backArrow?: boolean;
  backArrowPath?: string;
  animationDelay?: number;
  isMobile?: boolean; // Optional prop to adjust styling for mobile devices
  /** Latest podcast episode for the featured callout */
  latestEpisode?: PodcastEpisode | null;
  /** Handler for when user clicks "Listen Now" */
  onPlayLatestEpisode?: () => void;
  /** Loading state for episodes */
  episodesLoading?: boolean;
}

/**
 * HeroSimple - Hero component wrapper for TRI pages
 * Provides consistent hero styling with optional back arrow navigation
 * and featured latest episode callout
 */
export function HeroSimple({
  title,
  subtitle,
  backArrow,
  description,
  backArrowPath = '/services',
  animationDelay = 0,
  isMobile = false,
  latestEpisode,
  onPlayLatestEpisode,
  episodesLoading = false,
}: HeroSimpleProps) {
  return (
    <FadeUp delay={animationDelay}>
      <div
        style={{
          border: '1px solid var(--fx-border)',
          backgroundColor: 'var(--fx-surface-card)',
          padding: isMobile ? '24px' : '32px 48px',
          borderRadius: 'clamp(0.75rem, 1.5cqi, 0.75rem)',
          marginTop: isMobile ? '2rem' : undefined,
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '16px' : '8px',
        }}
      >
        {/* Title row with optional back arrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: isMobile ? '0.25rem' : '8px',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            overflow: 'hidden',
            paddingLeft: backArrow ? '0.5rem' : undefined,
          }}
        >
          {backArrow && (
            <Link href={backArrowPath} style={{ textDecoration: 'none' }}>
              <span
                style={{
                  display: 'inline-block',
                  fontSize: '1.5rem',
                  color: 'var(--fx-accent)',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer',
                  marginRight: '0.5rem',
                  flexShrink: 0,
                }}
                aria-label='Go back'
              >
                &#8592;
              </span>
            </Link>
          )}
          <h1
            style={{
              color: 'var(--fx-accent)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              lineHeight: 'clamp(1.2, 2vw, 1.3)',
              margin: '0.25rem 0 0',
              flex: 1,
              fontFamily: 'var(--fx-font)',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <h2
            style={{
              color: 'var(--fx-teal, var(--fx-accent))',
              fontSize: isMobile ? '1.125rem' : 'clamp(1.25rem, 3vw, 1.75rem)',
              fontWeight: 600,
              lineHeight: isMobile ? '1.4' : '1.5',
              textTransform: 'none',
              margin: 0,
              fontFamily: 'var(--fx-font)',
            }}
          >
            {subtitle}
          </h2>
        )}

        {/* Description */}
        {description && (
          <div style={{ margin: !isMobile ? '1rem 0' : '0' }}>
            <p
              style={{
                color: 'var(--fx-text-muted)',
                fontSize: isMobile ? '1rem' : '1.125rem',
                lineHeight: 'var(--fx-body-leading, 1.6)',
                margin: 0,
                fontFamily: 'var(--fx-font)',
              }}
            >
              {description}
            </p>
          </div>
        )}

        {/* Featured Latest Episode Callout */}
        {!episodesLoading && latestEpisode && onPlayLatestEpisode && (
          <div style={{ paddingTop: 32 }}>
            <FxCallout tone='gold' title='Listen to the Most Recent Episode'>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span>{latestEpisode.episode_title || 'Start listening now'}</span>
                <FxButton
                  variant='outline'
                  size='lg'
                  onClick={onPlayLatestEpisode}
                  aria-label='Listen to the latest episode of The Resonant Identity'
                >
                  Listen to Latest Episode
                </FxButton>
              </div>
            </FxCallout>
          </div>
        )}
      </div>
    </FadeUp>
  );
}
