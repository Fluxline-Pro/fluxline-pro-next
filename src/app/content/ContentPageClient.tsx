'use client';

import React from 'react';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCard from '@/theme/components/dsm/FxCard';

const SECONDARY_LINKS: {
  label: string;
  href?: string;
  comingSoon?: boolean;
}[] = [
  {
    label: 'GitHub — open source & code samples',
    href: 'https://github.com/aplusandminus',
  },
  {
    label: 'Videos — tutorials & live streams',
    href: 'https://www.youtube.com/@TerenceWaters',
  },
  { label: 'Books', comingSoon: true },
];

/**
 * Content Hub Page Client Component
 * Three doorways into Fluxline content — read, listen, or see the work.
 */
export default function ContentPageClient() {
  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      <div style={{ width: '100%', maxWidth: 1220, margin: '0 auto' }}>
        <FxSectionHeading
          title='Content Hub'
          subhead='Where ideas meet execution.'
          lede="Three places to go, depending on what you're here for — read, listen, or see the work."
          as='h1'
          style={{ maxWidth: 680, marginBottom: 34 }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))',
            gap: 16,
            alignItems: 'stretch',
            marginBottom: 24,
          }}
        >
          {/* Blog */}
          <FxCard
            variant='raised'
            interactive
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '26px 26px 0' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--fx-teal)',
                  }}
                >
                  Read
                </span>
                <span style={{ fontSize: 12, color: 'var(--fx-text-faint)' }}>
                  Posts &amp; guides
                </span>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 21,
                  color: 'var(--fx-text-heading)',
                  marginBottom: 8,
                }}
              >
                The Blog
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'var(--fx-text-muted)',
                  marginBottom: 18,
                }}
              >
                Insights on technology, design, wellness, and business
                transformation across the Fluxline platform.
              </div>
            </div>
            <div style={{ padding: '18px 26px 24px', marginTop: 'auto' }}>
              <Link
                href='/blog'
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'var(--fx-accent)',
                  color: 'var(--fx-accent-ink)',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14.5,
                  padding: '12px 20px',
                  textDecoration: 'none',
                }}
              >
                Read the Blog
              </Link>
            </div>
          </FxCard>

          {/* Podcast */}
          <FxCard
            variant='band'
            interactive
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              border: '1px solid var(--fx-gold)',
            }}
          >
            <div style={{ padding: '26px 26px 0' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--fx-gold)',
                  }}
                >
                  Listen
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    textTransform: 'uppercase',
                    background: 'var(--fx-gold-bg)',
                    color: 'var(--fx-gold)',
                    padding: '4px 10px',
                    borderRadius: 999,
                  }}
                >
                  New episodes
                </span>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 21,
                  color: 'var(--fx-text-bright)',
                  marginBottom: 8,
                }}
              >
                Podcast
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'var(--fx-text-muted)',
                  marginBottom: 18,
                }}
              >
                Identity architecture, self-improvement, and practical
                frameworks for navigating transitions with clarity.
              </div>
            </div>
            <div style={{ padding: '18px 26px 24px', marginTop: 'auto' }}>
              <Link
                href='/podcasts'
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'var(--fx-accent)',
                  color: 'var(--fx-accent-ink)',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14.5,
                  padding: '12px 20px',
                  textDecoration: 'none',
                }}
              >
                Listen to the Podcast
              </Link>
            </div>
          </FxCard>

          {/* Portfolio */}
          <FxCard
            variant='raised'
            interactive
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '26px 26px 0' }}>
              <div style={{ marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--fx-teal)',
                  }}
                >
                  See the work
                </span>
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 21,
                  color: 'var(--fx-text-heading)',
                  marginBottom: 8,
                }}
              >
                Portfolio
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: 'var(--fx-text-muted)',
                  marginBottom: 18,
                }}
              >
                Web applications, mobile apps, and enterprise software — the
                projects behind the practice.
              </div>
            </div>
            <div style={{ padding: '18px 26px 24px', marginTop: 'auto' }}>
              <Link
                href='/portfolio'
                style={{
                  display: 'block',
                  textAlign: 'center',
                  background: 'var(--fx-accent)',
                  color: 'var(--fx-accent-ink)',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 14.5,
                  padding: '12px 20px',
                  textDecoration: 'none',
                }}
              >
                View the Portfolio
              </Link>
            </div>
          </FxCard>
        </div>

        {/* Secondary row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
            border: '1px solid var(--fx-border-subtle)',
            borderRadius: 12,
            background: 'var(--fx-surface-inset)',
            padding: '16px 22px',
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--fx-text-faint)',
            }}
          >
            More
          </span>
          {SECONDARY_LINKS.map((link, i) => (
            <React.Fragment key={link.label}>
              {i > 0 && <span style={{ color: 'var(--fx-border)' }}>·</span>}
              {link.comingSoon ? (
                <span
                  style={{
                    color: 'var(--fx-text-faint)',
                    fontSize: 13.5,
                    fontWeight: 600,
                  }}
                >
                  {link.label}{' '}
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                      background: 'var(--fx-surface-card)',
                      color: 'var(--fx-text-muted)',
                      padding: '3px 8px',
                      borderRadius: 999,
                      marginLeft: 4,
                    }}
                  >
                    Coming soon
                  </span>
                </span>
              ) : (
                <a
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    color: 'var(--fx-text-soft)',
                    fontSize: 13.5,
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Stay updated */}
        <FxCard
          variant='band'
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
            padding: '30px 34px',
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--fx-text-bright)',
                marginBottom: 4,
              }}
            >
              Stay updated
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'var(--fx-text-mist)',
              }}
            >
              New posts, episodes, and projects — delivered by The Resonant
              Identity newsletter. No spam, ever.
            </div>
          </div>
          <Link
            href='/contact'
            style={{
              background: 'var(--fx-accent)',
              color: 'var(--fx-accent-ink)',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 14.5,
              padding: '12px 26px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Get in Touch
          </Link>
        </FxCard>
      </div>
    </FxContainer>
  );
}
