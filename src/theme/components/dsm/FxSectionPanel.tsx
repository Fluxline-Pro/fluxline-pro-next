'use client';

import React from 'react';

export type FxSectionPanelTone =
  | 'plain'
  | 'alt'
  | 'inset'
  | 'band'
  | 'feature'
  | 'gold';

interface FxSectionPanelProps {
  /** Surface treatment. Alternate tones down a page so sections read apart. */
  tone?: FxSectionPanelTone;
  /** Anchor id, forwarded to the rendered <section>. */
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const backgrounds: Record<FxSectionPanelTone, string> = {
  plain: 'transparent',
  alt: 'var(--fx-surface-alt)',
  inset: 'var(--fx-surface-inset)',
  band: 'var(--fx-gradient-band)',
  feature: 'var(--fx-gradient-feature)',
  gold: 'var(--fx-gold-bg)',
};

const borders: Record<FxSectionPanelTone, string> = {
  plain: 'transparent',
  alt: 'var(--fx-border-subtle)',
  inset: 'var(--fx-border-subtle)',
  band: 'var(--fx-border-strong)',
  feature: 'var(--fx-border-strong)',
  gold: 'var(--fx-gold-border)',
};

/**
 * A tonal shell for a page section.
 *
 * Pages that are one long column of cards lose their seams — every block looks
 * like the last. Wrapping each section in a panel with a different DSM surface
 * token gives the reader an obvious "new section starts here" without inventing
 * any colours: every value below is a token, so all colour modes follow along.
 *
 * `tone='plain'` keeps the page background and is the escape hatch for sections
 * that already carry their own strong card.
 */
export default function FxSectionPanel({
  tone = 'plain',
  id,
  children,
  style,
  className,
}: FxSectionPanelProps) {
  const base: React.CSSProperties = {
    background: backgrounds[tone],
    border: `1px solid ${borders[tone]}`,
    borderRadius: 'var(--fx-radius-card-lg)',
    // Plain sections are unpainted, so they don't need the inset that keeps
    // painted panels off their own edges.
    padding:
      tone === 'plain' ? '0' : 'var(--fx-space-xxl) var(--fx-space-xl)',
  };

  return (
    <section
      id={id}
      className={[
        'fx-secpanel',
        tone === 'plain' ? 'fx-secpanel-plain' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ ...base, ...style }}
    >
      {children}
    </section>
  );
}
