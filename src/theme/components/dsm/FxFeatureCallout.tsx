'use client';

import React from 'react';
import FxCard from './FxCard';

interface FxFeatureCalloutProps {
  /** Gold uppercase label above the card (e.g. "Foundation"). */
  label: string;
  /** Card heading, set at h2 size. */
  title: string;
  /** Heading level for the title. Defaults to h3 (a section inside a page). */
  titleAs?: 'h2' | 'h3';
  /** Lead line under the title. */
  description?: React.ReactNode;
  /** Secondary, muted line under the description. */
  blurb?: React.ReactNode;
  /**
   * Makes the whole card a link. Use for navigation callouts; leave unset
   * when the card holds its own controls (`children`), so no interactive
   * element is nested inside a link.
   */
  href?: string;
  /** Text for the gold "LEARN MORE ›"-style link line (with `href`). */
  ctaLabel?: string;
  /** Actions or extra content rendered at the foot of the card. */
  children?: React.ReactNode;
  /** Anchor id for the wrapping section. */
  id?: string;
  style?: React.CSSProperties;
}

/**
 * The full-width featured callout used to make one thing the standout on a
 * page: a gold group label, then a feature-gradient card with a gold-to-accent
 * rule along its top edge. `/services` uses it for the Foundation (the RCF)
 * and Strategy & Leadership; `/contact` uses it for the free consultation.
 */
export default function FxFeatureCallout({
  label,
  title,
  titleAs: TitleTag = 'h3',
  description,
  blurb,
  href,
  ctaLabel,
  children,
  id,
  style,
}: FxFeatureCalloutProps) {
  return (
    <section id={id} style={{ padding: 'var(--fx-space-m) 0', ...style }}>
      <div
        style={{
          fontSize: 'var(--fx-kicker-size)',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--fx-gold)',
          marginBottom: 'var(--fx-space-s)',
        }}
      >
        {label}
      </div>
      <FxCard
        variant='feature'
        interactive={Boolean(href)}
        href={href}
        className='fx-feature-callout'
        style={{
          padding: 'var(--fx-space-xxl) var(--fx-space-xxl)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden='true'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              'linear-gradient(90deg, var(--fx-gold), var(--fx-accent))',
          }}
        />
        <TitleTag
          style={{
            fontSize: 'var(--fx-h2-size)',
            fontWeight: 800,
            color: 'var(--fx-text-heading)',
            margin: '0 0 var(--fx-space-s)',
            fontFamily: 'var(--fx-font)',
            letterSpacing: 'var(--fx-heading-tracking)',
          }}
        >
          {title}
        </TitleTag>
        {description && (
          <p
            style={{
              fontSize: 'var(--fx-body-size)',
              color: 'var(--fx-text-body)',
              lineHeight: 'var(--fx-body-leading)',
              margin: '0 0 var(--fx-space-xs)',
              maxWidth: '56ch',
            }}
          >
            {description}
          </p>
        )}
        {blurb && (
          <p
            style={{
              fontSize: 'var(--fx-body-sm-size)',
              color: 'var(--fx-text-muted)',
              lineHeight: 'var(--fx-body-sm-leading)',
              margin: '0 0 var(--fx-space-l)',
              maxWidth: '56ch',
            }}
          >
            {blurb}
          </p>
        )}
        {href && ctaLabel && (
          <span
            style={{
              fontSize: 'var(--fx-cta-link-size)',
              color: 'var(--fx-gold)',
              fontWeight: 700,
              letterSpacing: 'var(--fx-cta-link-tracking)',
              textTransform: 'uppercase',
            }}
          >
            {ctaLabel} ›
          </span>
        )}
        {children}
      </FxCard>
    </section>
  );
}
