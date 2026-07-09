'use client';

import React from 'react';
import Link from 'next/link';
import { useThemeOverride } from '@/theme/contexts/ThemeOverrideContext';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import type { ThemeMode } from '@/theme/theme';
import FxHero from '@/theme/components/dsm/FxHero';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxRailLayout from '@/theme/components/dsm/FxRailLayout';
import FxStatCard from '@/theme/components/dsm/FxStatCard';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import OurServicesImage from '@/assets/images/OurServices1197x1600.jpg';

const ethosCards = [
  { title: 'Embodied Awareness', desc: 'Mind, body, and spirit integrated for holistic transformation.' },
  { title: 'Modular Precision', desc: 'Systems designed with clarity and flexibility, adaptable to your evolution.' },
  { title: 'Legacy Resonance', desc: 'Building not just for today, but for lasting impact.' },
  { title: 'Somatic Discipline', desc: "The body's wisdom, integrated with strategic thinking." },
  { title: 'Creative Truth', desc: 'Authentic expression and honest communication in every deliverable.' },
  { title: 'Strategic Innovation', desc: 'Thoughtful experimentation balanced with proven methods.' },
];

const serviceDomains = [
  {
    kicker: 'Body & Practice',
    services: [
      { title: 'Personal Training & Wellness', desc: 'Embodied identity work through physical transformation.', href: '/services/personal-training' },
      { title: 'Resonance Core Framework™', desc: 'Identity work, narrative work, and embodiment work.', href: '/services/resonance-core' },
    ],
  },
  {
    kicker: 'Brand & Digital Presence',
    services: [
      { title: 'Brand & Experience Design', desc: 'Visual identity and user experience design.', href: '/services/design' },
      { title: 'Web Development & Digital Architecture', desc: 'Custom applications and scalable platforms.', href: '/services/development' },
    ],
  },
  {
    kicker: 'Depth Work & Strategy',
    services: [
      { title: 'Business Strategy & Systems Alignment', desc: 'Strategic consulting and operational design.', href: '/services/consulting' },
      { title: 'Coaching, Education & Leadership', desc: 'Workshops, coaching, and strategic embodiment.', href: '/services/education' },
    ],
  },
];

export default function Home() {
  const { themeMode } = useAppTheme();
  const { setOverrideThemeMode } = useThemeOverride();
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);
  const [hoveredEthos, setHoveredEthos] = React.useState<number | null>(null);

  React.useEffect(() => {
    const accessibilityModes: ThemeMode[] = ['high-contrast', 'colorblind'];
    const shouldOverride = !accessibilityModes.includes(themeMode);
    if (shouldOverride) setOverrideThemeMode('dark');
    return () => {
      if (shouldOverride) setOverrideThemeMode(null);
    };
  }, [setOverrideThemeMode, themeMode]);

  return (
    <>
      <FxHero
        eyebrow="Welcome To"
        title="FLUXLINE"
        body={
          <>
            <p style={{ margin: '0 0 10px' }}>
              We build <strong style={{ color: '#EAF0F9' }}>congruence</strong>.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: '#EAF0F9' }}>Strong</strong> bodies.{' '}
              <strong style={{ color: '#EAF0F9' }}>Clear</strong> brands.{' '}
              <strong style={{ color: '#EAF0F9' }}>Resilient</strong> systems. Whether you need
              development, design, coaching, or strategy, we integrate technical precision with
              emotional intelligence so your inner and outer work finally match.
            </p>
          </>
        }
        secondaryCta={{ label: 'Explore Fluxline ↓', href: '#about' }}
        primaryCta={{ label: 'Book a Consultation', href: '/contact' }}
        backgroundImage="/images/home/HomePageMobileGeometricBackground.jpg"
        tagline="Structure the Shift — everything Fluxline, on one page ↓"
        location="Salt Lake City, Utah · fluxline.pro"
      />

      {/* ===== ABOUT + ETHOS ===== */}
      <section
        id="about"
        style={{ scrollMarginTop: 76, borderBottom: '1px solid #1E2635' }}
      >
        <FxContainer style={{ padding: '88px 32px' }}>
          <FxRailLayout
            rail={
              <div
                style={{
                  background: '#0D1117',
                  border: '1px solid #232C3D',
                  borderRadius: 14,
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/images/home/FluxlineLogo.png"
                  alt="Fluxline — Structure the Shift"
                  style={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '1/1',
                    objectFit: 'contain',
                    background: '#05070B',
                    padding: 28,
                  }}
                />
                <div style={{ padding: '16px 20px', borderTop: '1px solid #232C3D' }}>
                  <div style={{ fontWeight: 700, fontSize: 17, color: '#EAF0F9' }}>
                    About &amp; Ethos
                  </div>
                  <div style={{ fontSize: 13, color: '#8FA8CA', marginTop: 3 }}>
                    Modular by design. Resonant by nature.
                  </div>
                </div>
              </div>
            }
          >
            <div>
              <h2
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: '#AEC6EE',
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
                  color: '#4FD1C5',
                  margin: '0 0 16px',
                  lineHeight: 1.45,
                }}
              >
                Systems that work, brands that connect, and practices that last.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#C2CEDA', margin: 0 }}>
                Fluxline is built on the belief that{' '}
                <strong style={{ color: '#EAF0F9' }}>congruence creates momentum</strong>. We build
                systems that integrate emotional intelligence, financial clarity, and physical
                discipline — empowering individuals and brands to work with purpose and precision,
                becoming intentional stewards of their own growth.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 14,
              }}
              className="fx-g4"
            >
              <FxStatCard value="50+" label="Projects Delivered" />
              <FxStatCard value="20+" label="Years Experience" />
              <FxStatCard value="6+" label="Product Offerings" />
              <FxStatCard value="10+" label="Industries Served" />
            </div>

            <FxCallout
              tone="gold"
              title="We're Not Done Yet—But We're Already Extraordinary."
            >
              <em>Modular by design. Resonant by nature.</em>
            </FxCallout>

            {/* Ethos cards */}
            <div>
              <h3
                style={{
                  fontSize: 23,
                  fontWeight: 700,
                  color: '#AEC6EE',
                  margin: '0 0 18px',
                }}
              >
                The Fluxline Ethos
              </h3>
              <div
                className="fx-g3"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 14,
                }}
              >
                {ethosCards.map((card, i) => (
                  <div
                    key={card.title}
                    onMouseEnter={() => setHoveredEthos(i)}
                    onMouseLeave={() => setHoveredEthos(null)}
                    style={{
                      background: '#11161F',
                      border: `1px solid ${hoveredEthos === i ? '#5E81A8' : '#232C3D'}`,
                      borderRadius: 12,
                      padding: '18px 18px',
                      transition: 'border-color .18s, transform .18s',
                      transform: hoveredEthos === i ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 14.5,
                        color: '#EAF0F9',
                        marginBottom: 5,
                      }}
                    >
                      {card.title}
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.55, color: '#98A2B3' }}>
                      {card.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio card */}
            <div
              className="fx-stack"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                background: '#11161F',
                border: '1px solid #232C3D',
                borderRadius: 14,
                padding: '20px 24px',
              }}
            >
              <img
                src="/images/home/HomePageCover4kLandscape.jpg"
                alt="Terence Waters"
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: 12,
                  objectFit: 'cover',
                  flexShrink: 0,
                  background: '#05070B',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 16.5, color: '#EAF0F9' }}>
                  Terence Waters
                </div>
                <div style={{ fontSize: 13.5, color: '#4FD1C5', margin: '2px 0 6px' }}>
                  CEO, Founder &amp; Chief Architect
                </div>
                <div style={{ fontSize: 13.5, lineHeight: 1.5, color: '#98A2B3' }}>
                  Visionary technologist and systems thinker, architecting transformative digital
                  experiences and coaching frameworks.
                </div>
              </div>
              <Link
                href="/about"
                style={{
                  color: '#8FA8CA',
                  fontSize: 13.5,
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color .15s',
                }}
              >
                Full story →
              </Link>
            </div>
          </FxRailLayout>
        </FxContainer>
      </section>

      {/* ===== SERVICES ===== */}
      <section
        id="services"
        style={{
          scrollMarginTop: 76,
          background: '#0C1017',
          borderBottom: '1px solid #1E2635',
        }}
      >
        <FxContainer style={{ padding: '88px 32px' }}>
          <FxRailLayout
            rail={
              <div
                style={{
                  background: '#0D1117',
                  border: '1px solid #232C3D',
                  borderRadius: 14,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={OurServicesImage.src}
                  alt="Fluxline services"
                  style={{
                    display: 'block',
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    background: '#05070B',
                  }}
                />
                <div style={{ padding: '16px 20px', borderTop: '1px solid #232C3D' }}>
                  <div style={{ fontWeight: 700, fontSize: 17, color: '#EAF0F9' }}>
                    Our Services
                  </div>
                  <div style={{ fontSize: 13, color: '#8FA8CA', marginTop: 3 }}>
                    From intention to infrastructure.
                  </div>
                </div>
              </div>
            }
          >
            <div>
              <h2
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: '#AEC6EE',
                  margin: '0 0 10px',
                  letterSpacing: '-.01em',
                }}
              >
                Choose What Kind Of Support You Need
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#C2CEDA', margin: 0 }}>
                Every service is a doorway to transformation. Six modular offerings across three
                domains — each links to its full detail page.
              </p>
            </div>

            {serviceDomains.map((domain) => (
              <div key={domain.kicker}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: '#4FD1C5',
                    marginBottom: 12,
                  }}
                >
                  {domain.kicker}
                </div>
                <div
                  className="fx-g2"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 14,
                  }}
                >
                  {domain.services.map((svc) => (
                    <Link
                      key={svc.href}
                      href={svc.href}
                      onMouseEnter={() => setHoveredCard(svc.href)}
                      onMouseLeave={() => setHoveredCard(null)}
                      style={{
                        display: 'block',
                        background: '#141A25',
                        border: `1px solid ${hoveredCard === svc.href ? '#5E81A8' : '#232C3D'}`,
                        borderRadius: 12,
                        padding: 22,
                        textDecoration: 'none',
                        transition: 'border-color .18s, transform .18s',
                        transform: hoveredCard === svc.href ? 'translateY(-3px)' : 'none',
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: 16,
                          color: '#AEC6EE',
                          marginBottom: 6,
                        }}
                      >
                        {svc.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13.5,
                          lineHeight: 1.55,
                          color: '#98A2B3',
                          marginBottom: 12,
                        }}
                      >
                        {svc.desc}
                      </div>
                      <span
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          letterSpacing: '.08em',
                          color: '#4FD1C5',
                        }}
                      >
                        LEARN MORE ›
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div
              className="fx-stack"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 18,
                background: '#11161F',
                border: '1px solid #232C3D',
                borderRadius: 12,
                padding: '18px 24px',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 15.5, color: '#EAF0F9' }}>
                  Not sure where to start?
                </div>
                <div style={{ fontSize: 13.5, color: '#98A2B3', marginTop: 2 }}>
                  Share your needs in a free consultation — we&apos;ll map the right first step
                  together.
                </div>
              </div>
              <Link
                href="/services"
                style={{
                  color: '#8FA8CA',
                  fontSize: 13.5,
                  fontWeight: 600,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color .15s',
                }}
              >
                All services →
              </Link>
            </div>
          </FxRailLayout>
        </FxContainer>
      </section>

      {/* ===== CONTENT HUB & TRI ===== */}
      <section
        id="content"
        style={{ scrollMarginTop: 76, borderBottom: '1px solid #1E2635' }}
      >
        <FxContainer style={{ padding: '88px 32px' }}>
          <div style={{ maxWidth: 680, marginBottom: 34 }}>
            <h2
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: '#AEC6EE',
                margin: '0 0 10px',
                letterSpacing: '-.01em',
              }}
            >
              Content Hub &amp; The Resonant Identity
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#C2CEDA', margin: 0 }}>
              Insights, client work, and the ongoing conversation around the Resonance Core
              Framework™.
            </p>
          </div>
          <div
            className="fx-g3"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1.2fr',
              gap: 16,
              alignItems: 'stretch',
            }}
          >
            <Link
              href="/blog"
              onMouseEnter={() => setHoveredCard('hub')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                display: 'block',
                background: '#11161F',
                border: `1px solid ${hoveredCard === 'hub' ? '#5E81A8' : '#232C3D'}`,
                borderRadius: 14,
                padding: 26,
                textDecoration: 'none',
                transition: 'border-color .18s, transform .18s',
                transform: hoveredCard === 'hub' ? 'translateY(-3px)' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: '#4FD1C5',
                  marginBottom: 10,
                }}
              >
                Content Hub
              </div>
              <div
                style={{ fontWeight: 700, fontSize: 18, color: '#AEC6EE', marginBottom: 8 }}
              >
                Blog, Case Studies &amp; Portfolio
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#98A2B3',
                  marginBottom: 14,
                }}
              >
                Thought leadership on digital transformation, human-centered design, and the work
                we&apos;ve shipped.
              </div>
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  color: '#4FD1C5',
                }}
              >
                EXPLORE THE HUB ›
              </span>
            </Link>

            <Link
              href="/scrolls"
              onMouseEnter={() => setHoveredCard('scrolls')}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                display: 'block',
                background: '#11161F',
                border: `1px solid ${hoveredCard === 'scrolls' ? '#5E81A8' : '#232C3D'}`,
                borderRadius: 14,
                padding: 26,
                textDecoration: 'none',
                transition: 'border-color .18s, transform .18s',
                transform: hoveredCard === 'scrolls' ? 'translateY(-3px)' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '.12em',
                  textTransform: 'uppercase',
                  color: '#4FD1C5',
                  marginBottom: 10,
                }}
              >
                Scrolls
              </div>
              <div
                style={{ fontWeight: 700, fontSize: 18, color: '#AEC6EE', marginBottom: 8 }}
              >
                Reflections &amp; Practice Notes
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#98A2B3',
                  marginBottom: 14,
                }}
              >
                Shorter writings on identity, embodiment, and building with intention.
              </div>
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  color: '#4FD1C5',
                }}
              >
                READ THE SCROLLS ›
              </span>
            </Link>

            <div
              style={{
                background: 'linear-gradient(150deg,#101826,#0C1220)',
                border: '1px solid #33506F',
                borderRadius: 14,
                padding: 26,
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
                  color: '#E8B95B',
                  marginBottom: 10,
                }}
              >
                The Resonant Identity
              </div>
              <div
                style={{ fontWeight: 700, fontSize: 18, color: '#EAF0F9', marginBottom: 8 }}
              >
                Newsletter &amp; Community
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: '#98A2B3',
                  marginBottom: 18,
                }}
              >
                Insights on Fluxline, the Resonance Core Framework™, and practical ways to apply
                it. No spam, ever.
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    background: '#0A0D13',
                    border: '1px solid #33506F',
                    borderRadius: 8,
                    padding: '11px 14px',
                    fontSize: 14,
                    color: '#EAF0F9',
                    outline: 'none',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  type="button"
                  style={{
                    background: '#B8CDF5',
                    color: '#0A0D13',
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 14,
                    padding: '11px 20px',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontFamily: 'inherit',
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </FxContainer>
      </section>

      {/* ===== CTA BAND ===== */}
      <section id="contact" style={{ scrollMarginTop: 76 }}>
        <FxContainer style={{ padding: '88px 32px' }}>
          <FxCTABand
            title="Ready to structure the shift?"
            body="Tell us where you are and where you're going. We'll map the right first step together — development, design, coaching, or strategy."
            primaryLabel="Book a Consultation"
            primaryHref="/contact"
            secondaryLabel="Full Contact Form →"
            secondaryHref="/contact"
          />
        </FxContainer>
      </section>
    </>
  );
}
