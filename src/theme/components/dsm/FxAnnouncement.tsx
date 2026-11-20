'use client';

import React from 'react';
import FxButton from './FxButton';

interface FxAnnouncementProps {
  /** Small uppercase label above the heading. */
  label: string;
  title: string;
  /** Heading level for the page outline. Defaults to h2 (a section-level band). */
  as?: 'h2' | 'h3';
  children: React.ReactNode;
  ctaLabel: string;
  ctaHref: string;
  style?: React.CSSProperties;
}

/**
 * A small Mythic Gold announcement band: gold border with a heavier top edge,
 * a faint gold tint over the page, one short paragraph and one gold-filled
 * button. Every colour comes from the `--fx-mythic-gold*` tokens so the grayscale
 * and high-contrast themes remap it rather than showing gold in a theme that
 * has none. The region is named by its own heading.
 */
export default function FxAnnouncement({
  label,
  title,
  as: Heading = 'h2',
  children,
  ctaLabel,
  ctaHref,
  style,
}: FxAnnouncementProps) {
  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      style={{
        border: '1px solid var(--fx-mythic-gold)',
        borderTop: '4px solid var(--fx-mythic-gold)',
        background: 'var(--fx-mythic-gold-bg)',
        borderRadius: 'var(--fx-radius-card-sm)',
        padding: 'clamp(20px, 4vw, 32px)',
        fontFamily: 'var(--fx-font)',
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--fx-mythic-gold-text)',
          marginBottom: 10,
        }}
      >
        {label}
      </div>
      <Heading
        id={headingId}
        style={{
          fontSize: 'clamp(20px, 3vw, 26px)',
          fontWeight: 800,
          lineHeight: 1.25,
          color: 'var(--fx-text-heading-display)',
          margin: '0 0 10px',
        }}
      >
        {title}
      </Heading>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.65,
          color: 'var(--fx-text-body)',
          margin: '0 0 20px',
          maxWidth: '64ch',
        }}
      >
        {children}
      </p>
      <FxButton
        variant='primary'
        href={ctaHref}
        style={{
          background: 'var(--fx-mythic-gold)',
          color: 'var(--fx-mythic-gold-ink)',
        }}
      >
        {ctaLabel}
      </FxButton>
    </section>
  );
}
