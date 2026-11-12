import React from 'react';

interface FxGroupLabelProps {
  /** Teal for structural/section labels, gold for emphasis and announcements. */
  tone?: 'teal' | 'gold';
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * FxGroupLabel
 *
 * The small uppercase label that sits above a section or a group of cards —
 * the same treatment FxSectionHeading uses for its kicker, extracted so
 * sections that don't warrant a full heading can stay consistent with it.
 */
export default function FxGroupLabel({
  tone = 'teal',
  children,
  style,
}: FxGroupLabelProps) {
  return (
    <div
      style={{
        fontFamily: 'var(--fx-font)',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: tone === 'gold' ? 'var(--fx-gold)' : 'var(--fx-accent)',
        marginBottom: 'var(--fx-space-s)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
