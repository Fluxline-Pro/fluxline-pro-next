'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxRailLayout from '@/theme/components/dsm/FxRailLayout';
import FxButton from '@/theme/components/dsm/FxButton';
import { ContactForm } from './components/ContactForm';
import TheResonantIdentityLogo from '@/assets/images/TheResonantIdentity_Logo.png';
import ContactImage from '@/assets/images/ContactMe2400x1600.jpg';

export default function ContactPage() {
  const triEmailHref = `mailto:${String.fromCharCode(
    109, 97, 105, 108
  )}@${String.fromCharCode(
    116, 104, 101, 114, 101, 115, 111, 110, 97, 110, 116, 105, 100, 101, 110,
    116, 105, 116, 121
  )}.${String.fromCharCode(99, 111, 109)}`;

  return (
    <FxContainer style={{ padding: '118px 32px 60px' }}>
      <FxRailLayout
        rail={
          <div>
            <div
              style={{
                background: 'var(--fx-surface-card)',
                border: '1px solid var(--fx-border)',
                borderRadius: 14,
                overflow: 'hidden',
              }}
            >
              <img
                src={ContactImage.src}
                alt="Let's connect"
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  background: 'var(--fx-bg-deep)',
                }}
              />
              <div style={{ padding: '16px 20px', borderTop: '1px solid var(--fx-border)' }}>
                <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--fx-text-bright)' }}>
                  Let&apos;s Connect
                </div>
                <div style={{ fontSize: 13, color: 'var(--fx-text-soft)', marginTop: 3 }}>
                  Salt Lake City, Utah
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: 14,
                    marginTop: 14,
                    flexWrap: 'wrap',
                  }}
                >
                  {[
                    { label: 'Email', href: 'mailto:support@fluxline.pro' },
                    { label: 'Facebook', href: 'https://www.facebook.com/fluxline' },
                    { label: 'Instagram', href: 'https://instagram.com/fluxlineco' },
                    { label: 'GitHub', href: 'https://github.com/fluxline-pro' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      style={{
                        color: 'var(--fx-text-soft)',
                        fontSize: 13,
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/#contact"
              style={{
                display: 'inline-block',
                marginTop: 14,
                color: 'var(--fx-text-soft)',
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              ← Back to Fluxline
            </Link>
          </div>
        }
      >
        {/* Heading */}
        <div>
          <h1
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: 'var(--fx-text-heading)',
              margin: '0 0 10px',
              letterSpacing: '-.01em',
            }}
          >
            Start a Conversation
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--fx-text-body)',
              margin: 0,
              maxWidth: '60ch',
            }}
          >
            The best place to start is a free consultation — a short call where we explore your
            goals together and map out what&apos;s possible. Or just write us a note below.
          </p>
        </div>

        {/* Consultation CTA card */}
        <div
          style={{
            background: 'var(--fx-gradient-feature)',
            border: '1px solid var(--fx-border-strong)',
            borderRadius: 16,
            padding: '28px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ fontWeight: 700, fontSize: 19, color: 'var(--fx-text-bright)', marginBottom: 6 }}>
              Book a Free Consultation
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--fx-text-muted)' }}>
              Walk us through your vision and we&apos;ll design the systems, strategies, and
              practices that move it forward. No commitment required.
            </div>
          </div>
          <FxButton size="lg" href="/contact">
            Book a Consultation
          </FxButton>
        </div>

        {/* Form card */}
        <div
          id="note"
          style={{
            scrollMarginTop: 96,
            background: 'var(--fx-surface-card)',
            border: '1px solid var(--fx-border)',
            borderRadius: 16,
            padding: '28px 32px',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 19, color: 'var(--fx-text-heading)', marginBottom: 4 }}>
            Prefer to write? Send us a note.
          </div>
          <div style={{ fontSize: 14, color: 'var(--fx-text-muted)', marginBottom: 22 }}>
            We read every note and respond as soon as we can.
          </div>
          <ContactForm />
        </div>

        {/* TRI row */}
        <div
          className="fx-g2"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
        >
          <div
            style={{
              background: 'var(--fx-surface-card)',
              border: '1px solid var(--fx-border)',
              borderRadius: 14,
              padding: '22px 24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 10,
              }}
            >
              <Image
                src={TheResonantIdentityLogo}
                alt="The Resonant Identity"
                width={40}
                height={40}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 9,
                  objectFit: 'cover',
                  background: 'var(--fx-bg-deep)',
                }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fx-text-bright)' }}>
                  The Resonant Identity
                </div>
                <div style={{ fontSize: 12, color: 'var(--fx-gold)', fontWeight: 600 }}>
                  Listener contact
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: 13.5,
                lineHeight: 1.6,
                color: 'var(--fx-text-muted)',
                marginBottom: 14,
              }}
            >
              Listening to TRI and want to continue the conversation? Reach out directly.
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a
                href={triEmailHref}
                style={{
                  color: 'var(--fx-accent)',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Email TRI →
              </a>
              <a
                href="https://facebook.com/theresonantid"
                style={{
                  color: 'var(--fx-accent)',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Facebook group →
              </a>
            </div>
          </div>

          <div
            style={{
              background: 'var(--fx-surface-card)',
              border: '1px solid var(--fx-border)',
              borderRadius: 14,
              padding: '22px 24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--fx-text-bright)', marginBottom: 6 }}>
              TRI Newsletter
            </div>
            <div
              style={{
                fontSize: 13.5,
                lineHeight: 1.6,
                color: 'var(--fx-text-muted)',
                marginBottom: 14,
              }}
            >
              Insights on Fluxline and the Resonance Core Framework™. No spam, ever.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: 'var(--fx-surface-input)',
                  border: '1px solid var(--fx-border)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  fontSize: 13.5,
                  color: 'var(--fx-text-bright)',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="button"
                style={{
                  background: 'var(--fx-accent)',
                  color: 'var(--fx-accent-ink)',
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 13,
                  padding: '10px 16px',
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
      </FxRailLayout>
    </FxContainer>
  );
}
