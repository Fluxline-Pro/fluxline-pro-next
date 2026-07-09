'use client';

import React from 'react';
import FxHero from '@/theme/components/dsm/FxHero';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxRailLayout from '@/theme/components/dsm/FxRailLayout';
import FxStatCard from '@/theme/components/dsm/FxStatCard';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import FxCard from '@/theme/components/dsm/FxCard';
import FxReveal from '@/theme/components/dsm/FxReveal';
import {
  SERVICE_CATEGORIES,
  FLUXLINE_SECONDARY_TAGLINE,
} from '@/app/services/constants';
import { COMPANY_VALUES } from '@/app/about/constants';

const HOME_SERVICE_GROUPS: { key: string; label: string }[] = [
  { key: 'body-practice', label: 'Body & Practice' },
  { key: 'brand-digital', label: 'Brand & Digital Presence' },
  { key: 'depth-strategy', label: 'Depth Work & Strategy' },
];

export default function Home() {
  return (
    <>
      <FxHero
        eyebrow='Welcome To'
        title='FLUXLINE'
        body={
          <>
            We build{' '}
            <strong style={{ color: 'var(--fx-text-bright)' }}>
              congruence
            </strong>
            . <strong style={{ color: 'var(--fx-text-bright)' }}>Strong</strong>{' '}
            bodies.{' '}
            <strong style={{ color: 'var(--fx-text-bright)' }}>Clear</strong>{' '}
            brands.{' '}
            <strong style={{ color: 'var(--fx-text-bright)' }}>
              Resilient
            </strong>{' '}
            systems.
          </>
        }
        secondaryCta={{ label: 'Explore Fluxline ↓', href: '#about' }}
        primaryCta={{ label: 'Book a Consultation', href: '/contact' }}
        backgroundImage='/images/home/HomePageMobileGeometricBackground.jpg'
      />

      <section id='about' style={{ padding: '88px 0' }}>
        <FxContainer>
          <FxRailLayout
            rail={
              <FxReveal
                variant='left'
                style={{
                  background: 'var(--fx-surface-inset)',
                  border: '1px solid var(--fx-border)',
                  borderRadius: 14,
                  overflow: 'hidden',
                }}
              >
                <img
                  src='/images/home/FluxlineLogo.png'
                  alt='Fluxline — Structure the Shift'
                  style={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '1/1',
                    objectFit: 'contain',
                    background: '#000',
                    padding: 24,
                    boxSizing: 'border-box',
                  }}
                />
                <div
                  style={{
                    padding: '16px 20px',
                    borderTop: '1px solid var(--fx-border)',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 17,
                      color: 'var(--fx-text-bright)',
                    }}
                  >
                    About &amp; Ethos
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'var(--fx-text-soft)',
                      marginTop: 3,
                    }}
                  >
                    Modular by design. Resonant by nature.
                  </div>
                </div>
              </FxReveal>
            }
          >
            <FxReveal>
              <h2
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: 'var(--fx-text-heading)',
                  margin: '0 0 10px',
                  letterSpacing: '-.01em',
                }}
              >
                About Fluxline
              </h2>
              <p
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  color: 'var(--fx-teal)',
                  margin: '0 0 16px',
                }}
              >
                Systems that work, brands that connect, and practices that last.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0 }}>
                Fluxline is built on the belief that{' '}
                <strong style={{ color: 'var(--fx-text-bright)' }}>
                  congruence creates momentum
                </strong>
                .
              </p>
            </FxReveal>

            <FxReveal
              delay={100}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 14,
              }}
            >
              <FxStatCard value='50+' label='Projects Delivered' />
              <FxStatCard value='20+' label='Years Experience' />
              <FxStatCard value='6+' label='Product Offerings' />
              <FxStatCard value='10+' label='Industries Served' />
            </FxReveal>

            <FxReveal delay={200}>
              <FxCallout
                tone='gold'
                title="We're Not Done Yet—But We're Already Extraordinary."
              >
                <em>Modular by design. Resonant by nature.</em>
              </FxCallout>
            </FxReveal>

            <FxReveal delay={300}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: 'var(--fx-teal)',
                  marginBottom: 14,
                }}
              >
                The Resonance Core Framework
              </div>
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'var(--fx-text-heading)',
                  margin: '0 0 8px',
                }}
              >
                Our Core Values
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'var(--fx-text-muted)',
                  margin: '0 0 20px',
                }}
              >
                Six principles that guide every engagement, every system, every
                interaction.
              </p>
              <div
                className='fx-g3'
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 14,
                }}
              >
                {COMPANY_VALUES.map((val) => (
                  <FxCard
                    key={val.id}
                    interactive
                    style={{ padding: '20px 18px' }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: 'var(--fx-text-heading)',
                        marginBottom: 6,
                      }}
                    >
                      {val.title}
                    </div>
                    <div
                      style={{
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        color: 'var(--fx-text-muted)',
                      }}
                    >
                      {val.description}
                    </div>
                  </FxCard>
                ))}
              </div>
            </FxReveal>
          </FxRailLayout>
        </FxContainer>
      </section>

      <section
        id='services'
        style={{ padding: '88px 0', background: 'var(--fx-surface-alt)' }}
      >
        <FxContainer>
          <FxRailLayout
            rail={
              <FxReveal
                variant='left'
                style={{
                  background: 'var(--fx-surface-inset)',
                  border: '1px solid var(--fx-border)',
                  borderRadius: 14,
                  overflow: 'hidden',
                }}
              >
                <img
                  src='/images/home/HomePageCoverLandscape2.jpg'
                  alt='Fluxline services'
                  style={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    padding: '16px 20px',
                    borderTop: '1px solid var(--fx-border)',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 17,
                      color: 'var(--fx-text-bright)',
                    }}
                  >
                    Our Services
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'var(--fx-text-soft)',
                      marginTop: 3,
                    }}
                  >
                    From intention to infrastructure.
                  </div>
                </div>
              </FxReveal>
            }
          >
            <FxReveal>
              <h2
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: 'var(--fx-text-heading)',
                  margin: '0 0 10px',
                  letterSpacing: '-.01em',
                }}
              >
                Choose What Kind Of Support You Need
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0 }}>
                Every service is a doorway to transformation. Six modular
                offerings across three domains — each links to its full detail
                page.
              </p>
            </FxReveal>

            {HOME_SERVICE_GROUPS.map((group, i) => (
              <FxReveal key={group.key} delay={(i + 1) * 100}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--fx-teal)',
                    marginBottom: 12,
                  }}
                >
                  {group.label}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: 14,
                  }}
                >
                  {SERVICE_CATEGORIES.filter(
                    (s) => s.category === group.key
                  ).map((service) => (
                    <FxCard
                      key={service.id}
                      variant='raised'
                      interactive
                      href={service.path}
                      style={{ padding: 22 }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          color: 'var(--fx-text-heading)',
                          marginBottom: 6,
                        }}
                      >
                        {service.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13.5,
                          lineHeight: 1.55,
                          color: 'var(--fx-text-muted)',
                          marginBottom: 12,
                        }}
                      >
                        {service.description}
                      </div>
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          letterSpacing: '.08em',
                          color: 'var(--fx-teal)',
                        }}
                      >
                        LEARN MORE ›
                      </span>
                    </FxCard>
                  ))}
                </div>
              </FxReveal>
            ))}

            <FxReveal delay={(HOME_SERVICE_GROUPS.length + 1) * 100}>
              <FxCard
                variant='inset'
                interactive
                href='/services'
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 18,
                  padding: '18px 24px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15.5,
                      color: 'var(--fx-text-bright)',
                    }}
                  >
                    Not sure where to start?
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      color: 'var(--fx-text-muted)',
                      marginTop: 2,
                    }}
                  >
                    {FLUXLINE_SECONDARY_TAGLINE}
                  </div>
                </div>
                <span
                  style={{
                    color: 'var(--fx-text-soft)',
                    fontSize: 13.5,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  All services →
                </span>
              </FxCard>
            </FxReveal>
          </FxRailLayout>
        </FxContainer>
      </section>

      <section id='content' style={{ padding: '88px 0' }}>
        <FxContainer>
          <FxReveal style={{ maxWidth: 680, marginBottom: 34 }}>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                margin: '0 0 10px',
                letterSpacing: '-.01em',
              }}
            >
              Content Hub &amp; The Resonant Identity
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0 }}>
              Insights, client work, and the ongoing conversation around the
              Resonance Core Framework™.
            </p>
          </FxReveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 16,
              alignItems: 'stretch',
            }}
          >
            <FxReveal delay={100} style={{ height: '100%' }}>
              <FxCard
                variant='raised'
                interactive
                href='/content'
                style={{ padding: 26, height: '100%' }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--fx-teal)',
                    marginBottom: 10,
                  }}
                >
                  Content Hub
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: 'var(--fx-text-heading)',
                    marginBottom: 8,
                  }}
                >
                  Blog, Podcast &amp; Portfolio
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--fx-text-muted)',
                    marginBottom: 14,
                  }}
                >
                  Thought leadership on digital transformation, human-centered
                  design, and the work we&apos;ve shipped.
                </div>
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    color: 'var(--fx-teal)',
                  }}
                >
                  EXPLORE THE HUB ›
                </span>
              </FxCard>
            </FxReveal>

            <FxReveal delay={200} style={{ height: '100%' }}>
              <FxCard
                variant='raised'
                interactive
                href='/services/scrolls'
                style={{ padding: 26, height: '100%' }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--fx-teal)',
                    marginBottom: 10,
                  }}
                >
                  Scrolls
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: 'var(--fx-text-heading)',
                    marginBottom: 8,
                  }}
                >
                  Reflections &amp; Practice Notes
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--fx-text-muted)',
                    marginBottom: 14,
                  }}
                >
                  Shorter writings on identity, embodiment, and building with
                  intention.
                </div>
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    color: 'var(--fx-teal)',
                  }}
                >
                  READ THE SCROLLS ›
                </span>
              </FxCard>
            </FxReveal>

            <FxReveal delay={300} style={{ height: '100%' }}>
              <FxCard
                variant='band'
                interactive
                style={{
                  padding: 26,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--fx-gold)',
                    marginBottom: 10,
                  }}
                >
                  The Resonant Identity
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: 'var(--fx-text-bright)',
                    marginBottom: 8,
                  }}
                >
                  Podcast &amp; Community
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
                <div style={{ marginTop: 'auto' }}>
                  <a
                    href='/podcasts/theresonantid'
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
                    Episodes, Challenges &amp; Demos
                  </a>
                </div>
              </FxCard>
            </FxReveal>
          </div>
        </FxContainer>
      </section>

      <section
        id='contact'
        style={{ padding: '88px 0', background: 'var(--fx-surface-alt)' }}
      >
        <FxContainer>
          <FxReveal>
            <FxCTABand
              title='Ready to structure the shift?'
              body="Tell us where you are and where you're going. We'll map the right first step together — development, design, coaching, or strategy."
              primaryLabel='Book a Consultation'
              primaryHref='/contact'
              secondaryLabel='Full Contact Form →'
              secondaryHref='/contact'
            />
          </FxReveal>
        </FxContainer>
      </section>
    </>
  );
}
