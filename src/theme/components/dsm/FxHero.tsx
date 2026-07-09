'use client';

import React from 'react';
import FxButton from './FxButton';

interface FxHeroProps {
  eyebrow?: string;
  title?: string;
  body?: React.ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  backgroundImage?: string;
  tagline?: string;
  location?: string;
  style?: React.CSSProperties;
}

export default function FxHero({
  eyebrow = 'Welcome To',
  title = 'FLUXLINE',
  body,
  primaryCta,
  secondaryCta,
  backgroundImage,
  tagline,
  location,
  style,
}: FxHeroProps) {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--fx-gradient-hero)',
        borderBottom: '1px solid var(--fx-border-subtle)',
        ...style,
      }}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover' as const,
            opacity: 0.55,
          }}
        />
      )}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg,rgba(5,7,11,.6),rgba(14,21,35,.25))',
        }}
      />
      <div
        className="fx-c fx-hero-pad"
        style={{
          position: 'relative',
          maxWidth: 1220,
          margin: '0 auto',
          padding: '140px 32px 70px',
        }}
      >
        <div
          style={{
            maxWidth: 640,
            background: 'rgba(5,7,11,.72)',
            border: '1px solid var(--fx-border)',
            borderRadius: 16,
            padding: '44px 46px',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--fx-eyebrow-size)',
              letterSpacing: 'var(--fx-eyebrow-tracking)',
              textTransform: 'uppercase',
              color: 'var(--fx-text-soft)',
              marginBottom: 14,
            }}
          >
            {eyebrow}
          </div>
          <h1
            style={{
              fontSize: 'var(--fx-display-size)',
              fontWeight: 800,
              letterSpacing: 'var(--fx-display-tracking)',
              color: 'var(--fx-text-heading-display)',
              margin: '0 0 22px',
              lineHeight: 1,
            }}
          >
            {title}
          </h1>
          <div
            style={{
              height: 2,
              background: 'linear-gradient(90deg,var(--fx-line),var(--fx-accent),transparent)',
              marginBottom: 26,
            }}
          />
          {body && (
            <div style={{ fontSize: 17.5, lineHeight: 1.65, margin: '0 0 30px' }}>{body}</div>
          )}
          {(primaryCta || secondaryCta) && (
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {secondaryCta && (
                <FxButton variant="outline" href={secondaryCta.href}>
                  {secondaryCta.label}
                </FxButton>
              )}
              {primaryCta && (
                <FxButton href={primaryCta.href}>{primaryCta.label}</FxButton>
              )}
            </div>
          )}
        </div>
      </div>

      {(tagline || location) && (
        <div
          style={{
            position: 'relative',
            borderTop: '1px solid #1E2635',
            background: 'rgba(7,9,13,.6)',
          }}
        >
          <div
            className="fx-c"
            style={{
              maxWidth: 1220,
              margin: '0 auto',
              padding: '14px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            {tagline && (
              <span style={{ fontSize: 13.5, fontWeight: 600, color: '#98A2B3' }}>
                {tagline}
              </span>
            )}
            {location && (
              <span style={{ fontSize: 13, color: '#7E8A99' }}>{location}</span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
