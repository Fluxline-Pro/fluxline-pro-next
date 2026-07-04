'use client';

import React from 'react';
import { useThemeOverride } from '@/theme/contexts/ThemeOverrideContext';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import type { ThemeMode } from '@/theme/theme';
import FxHero from '@/theme/components/dsm/FxHero';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxRailLayout from '@/theme/components/dsm/FxRailLayout';
import FxStatCard from '@/theme/components/dsm/FxStatCard';
import FxCallout from '@/theme/components/dsm/FxCallout';
import FxCTABand from '@/theme/components/dsm/FxCTABand';

export default function Home() {
  const { themeMode } = useAppTheme();
  const { setOverrideThemeMode } = useThemeOverride();

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
            We build{' '}
            <strong style={{ color: 'var(--fx-text-bright)' }}>congruence</strong>.{' '}
            <strong style={{ color: 'var(--fx-text-bright)' }}>Strong</strong> bodies.{' '}
            <strong style={{ color: 'var(--fx-text-bright)' }}>Clear</strong> brands.{' '}
            <strong style={{ color: 'var(--fx-text-bright)' }}>Resilient</strong> systems.
          </>
        }
        secondaryCta={{ label: 'Explore Fluxline ↓', href: '#about' }}
        primaryCta={{ label: 'Book a Consultation', href: '/contact' }}
        backgroundImage="/images/home/HomePageMobileGeometricBackground.jpg"
      />

      <section id="about" style={{ padding: '88px 0' }}>
        <FxContainer>
          <FxRailLayout
            rail={
              <div
                style={{
                  background: 'var(--fx-surface-inset)',
                  border: '1px solid var(--fx-border)',
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
              </div>
            }
          >
            <div>
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
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: 14,
              }}
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
          </FxRailLayout>
        </FxContainer>
      </section>

      <FxContainer style={{ paddingBottom: 88 }}>
        <FxCTABand
          title="Ready to structure the shift?"
          body="Tell us where you are and where you're going. We'll map the right first step together."
          primaryLabel="Book a Consultation"
          primaryHref="/contact"
        />
      </FxContainer>
    </>
  );
}
