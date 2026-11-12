'use client';

import React from 'react';

interface FxSectionHeadingProps {
  kicker?: string;
  title: string;
  subhead?: string;
  lede?: string;
  as?: 'h1' | 'h2' | 'h3';
  style?: React.CSSProperties;
}

const titleSizes: Record<string, number> = { h1: 38, h2: 34, h3: 23 };

export default function FxSectionHeading({
  kicker,
  title,
  subhead,
  lede,
  as = 'h2',
  style,
}: FxSectionHeadingProps) {
  const Heading = as;

  return (
    <div style={{ fontFamily: 'var(--fx-font)', maxWidth: 680, ...style }}>
      {kicker && (
        <div
          style={{
            fontSize: 'var(--fx-kicker-size)',
            fontWeight: 600,
            letterSpacing: 'var(--fx-kicker-tracking)',
            textTransform: 'uppercase',
            color: 'var(--fx-teal)',
            marginBottom: 12,
          }}
        >
          {kicker}
        </div>
      )}

      <Heading
        style={{
          fontSize: titleSizes[as],
          fontWeight: as === 'h1' ? 800 : 700,
          color: 'var(--fx-text-heading)',
          margin: '0 0 10px',
          letterSpacing: 'var(--fx-heading-tracking)',
          lineHeight: 1.2,
        }}
      >
        {title}
      </Heading>

      {subhead && (
        <p
          style={{
            fontSize: 'var(--fx-subhead-size)',
            fontWeight: 'var(--fx-subhead-weight)' as unknown as number,
            color: 'var(--fx-teal)',
            margin: '0 0 14px',
            lineHeight: 1.45,
          }}
        >
          {subhead}
        </p>
      )}

      {lede && (
        <p
          style={{
            fontSize: 'var(--fx-body-size)',
            lineHeight: 'var(--fx-body-leading)',
            color: 'var(--fx-text-body)',
            margin: 0,
          }}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
