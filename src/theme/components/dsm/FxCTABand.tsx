'use client';

import React from 'react';
import FxButton from './FxButton';

interface FxCTABandProps {
  title: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  grid?: boolean;
  style?: React.CSSProperties;
}

export default function FxCTABand({
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  grid = true,
  style,
}: FxCTABandProps) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--fx-gradient-band)',
        border: '1px solid var(--fx-border-strong)',
        borderRadius: 'var(--fx-radius-band)',
        padding: '58px 48px',
        textAlign: 'center',
        fontFamily: 'var(--fx-font)',
        ...style,
      }}
    >
      {grid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(174,198,238,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(174,198,238,.05) 1px,transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
      )}

      <div style={{ position: 'relative' }}>
        <h2
          style={{
            fontSize: 'var(--fx-band-h2-size, 36px)',
            fontWeight: 800,
            color: 'var(--fx-text-heading-display)',
            margin: '0 0 12px',
            letterSpacing: '-.01em',
          }}
        >
          {title}
        </h2>

        {body && (
          <p
            style={{
              fontSize: 16.5,
              lineHeight: 1.6,
              color: 'var(--fx-text-mist)',
              margin: '0 auto 28px',
              maxWidth: '56ch',
            }}
          >
            {body}
          </p>
        )}

        {(primaryLabel || secondaryLabel) && (
          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {primaryLabel && (
              <FxButton size="lg" href={primaryHref}>
                {primaryLabel}
              </FxButton>
            )}
            {secondaryLabel && (
              <FxButton size="lg" variant="outline" href={secondaryHref}>
                {secondaryLabel}
              </FxButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
