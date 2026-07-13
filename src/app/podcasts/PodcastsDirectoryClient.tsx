'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxButton from '@/theme/components/dsm/FxButton';

/**
 * PodcastsDirectoryClient
 * Podcast hub page - focuses on The Resonant Identity episodes
 * Links externally to TheResonantIdentity.com
 */
export function PodcastsDirectoryClient() {
  const router = useRouter();

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--fx-gradient-hero)',
          borderBottom: '1px solid var(--fx-border-subtle)',
          padding: '120px 32px 80px',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg,rgba(5,7,11,.6),rgba(14,21,35,.25))',
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: 1220,
            margin: '0 auto',
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
              The Resonant Identity
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
              PODCAST
            </h1>
            <div
              style={{
                height: 2,
                background:
                  'linear-gradient(90deg,var(--fx-line),var(--fx-accent),transparent)',
                marginBottom: 26,
              }}
            />
            <div
              style={{ fontSize: 17.5, lineHeight: 1.65, margin: '0 0 30px' }}
            >
              Identity architecture, self-improvement, and practical frameworks
              for navigating transitions with clarity and intention.
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <FxButton
                variant='outline'
                onClick={() => router.push('/podcasts/theresonantid')}
              >
                Listen to Episodes
              </FxButton>
              <a
                href='https://theresonantidentity.com'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  whiteSpace: 'nowrap',
                  borderRadius: 'var(--fx-radius-control)',
                  fontFamily: 'var(--fx-font)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  fontSize: 15.5,
                  padding: '14px 30px',
                  background: 'var(--fx-accent)',
                  color: 'var(--fx-accent-ink)',
                  border: 'none',
                  transition:
                    'filter var(--fx-color-duration), background var(--fx-color-duration), color var(--fx-color-duration), border-color var(--fx-color-duration)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'brightness(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'none';
                }}
              >
                Visit TheResonantIdentity.com →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <FxContainer style={{ padding: '88px 32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
          {/* Listen to Latest Episode */}
          <section>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                margin: '0 0 20px',
                letterSpacing: '-.01em',
              }}
            >
              Latest Episode
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--fx-text-body)',
                margin: '0 0 24px',
              }}
            >
              Listen to the most recent episode and explore the full archive on
              The Resonant Identity podcast. Episodes dive into identity
              architecture, personal transformation, and practical strategies
              for building resilient systems.
            </p>
            <FxButton onClick={() => router.push('/podcasts/theresonantid')}>
              Explore All Episodes
            </FxButton>
          </section>

          {/* Podcast Platforms */}
          <section>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                margin: '0 0 20px',
                letterSpacing: '-.01em',
              }}
            >
              Listen Everywhere
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--fx-text-body)',
                margin: '0 0 24px',
              }}
            >
              The Resonant Identity is available on all major podcast platforms.
              Subscribe to get new episodes delivered automatically.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 16,
              }}
            >
              <a
                href='https://open.spotify.com/show/theresonantidentity'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  background: 'var(--fx-surface-card)',
                  border: '1px solid var(--fx-border)',
                  borderRadius: 'var(--fx-radius-card)',
                  padding: '20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  transition:
                    'border-color var(--fx-color-duration), transform var(--fx-color-duration), box-shadow var(--fx-color-duration)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--fx-border-hover)';
                  e.currentTarget.style.transform = 'var(--fx-hover-lift)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 24px rgba(0,0,0,0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--fx-border)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: 'var(--fx-text-heading)',
                    marginBottom: 8,
                  }}
                >
                  Spotify
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'var(--fx-text-muted)',
                  }}
                >
                  Listen on Spotify →
                </div>
              </a>
              <a
                href='https://podcasts.apple.com/podcast/theresonantidentity'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  background: 'var(--fx-surface-card)',
                  border: '1px solid var(--fx-border)',
                  borderRadius: 'var(--fx-radius-card)',
                  padding: '20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  transition:
                    'border-color var(--fx-color-duration), transform var(--fx-color-duration), box-shadow var(--fx-color-duration)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--fx-border-hover)';
                  e.currentTarget.style.transform = 'var(--fx-hover-lift)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 24px rgba(0,0,0,0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--fx-border)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: 'var(--fx-text-heading)',
                    marginBottom: 8,
                  }}
                >
                  Apple Podcasts
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'var(--fx-text-muted)',
                  }}
                >
                  Listen on Apple Podcasts →
                </div>
              </a>
              <a
                href='https://theresonantidentity.com/rss'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  background: 'var(--fx-surface-card)',
                  border: '1px solid var(--fx-border)',
                  borderRadius: 'var(--fx-radius-card)',
                  padding: '20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  transition:
                    'border-color var(--fx-color-duration), transform var(--fx-color-duration), box-shadow var(--fx-color-duration)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--fx-border-hover)';
                  e.currentTarget.style.transform = 'var(--fx-hover-lift)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 24px rgba(0,0,0,0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--fx-border)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: 'var(--fx-text-heading)',
                    marginBottom: 8,
                  }}
                >
                  RSS Feed
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'var(--fx-text-muted)',
                  }}
                >
                  Subscribe via RSS →
                </div>
              </a>
            </div>
          </section>

          {/* More from The Resonant Identity */}
          <section>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                margin: '0 0 20px',
                letterSpacing: '-.01em',
              }}
            >
              Explore TRI
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--fx-text-body)',
                margin: '0 0 24px',
              }}
            >
              The Resonant Identity has evolved into a dedicated platform with
              expanded content, community, and resources. Visit the main website
              to explore the full ecosystem.
            </p>
            <a
              href='https://theresonantidentity.com'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                borderRadius: 'var(--fx-radius-control)',
                fontFamily: 'var(--fx-font)',
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
                fontSize: 15.5,
                padding: '14px 30px',
                background: 'var(--fx-accent)',
                color: 'var(--fx-accent-ink)',
                border: 'none',
                transition:
                  'filter var(--fx-color-duration), background var(--fx-color-duration), color var(--fx-color-duration), border-color var(--fx-color-duration)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'none';
              }}
            >
              Go to TheResonantIdentity.com →
            </a>
          </section>
        </div>
      </FxContainer>
    </>
  );
}
