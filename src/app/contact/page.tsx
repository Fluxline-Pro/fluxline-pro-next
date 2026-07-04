'use client';

/**
 * Contact Page - Let's Connect
 * Contact form and information for reaching out to Fluxline
 */

import React from 'react';
import Image from 'next/image';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCard from '@/theme/components/dsm/FxCard';
import FxButton from '@/theme/components/dsm/FxButton';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
import { ContactForm } from './components/ContactForm';
import { SocialLinks } from '@/app/about/components/SocialLinks';
import { FLUXLINE_SOCIAL_LINKS } from '@/app/about/constants';
import TheResonantIdentityLogo from '@/assets/images/TheResonantIdentity_Logo.png';

export default function ContactPage() {
  // Email built from char codes at render time — avoids a plain-text address
  // in the static bundle while working correctly as a React href prop.
  const triEmailHref = `mailto:${String.fromCharCode(
    109, 97, 105, 108
  )}@${String.fromCharCode(
    116, 104, 101, 114, 101, 115, 111, 110, 97, 110, 116, 105, 100, 101, 110,
    116, 105, 116, 121
  )}.${String.fromCharCode(99, 111, 109)}`;

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      {/* Page heading */}
      <FxSectionHeading
        kicker="Contact"
        title="Start a Conversation"
        subhead="Book a free consultation or send us a note."
      />

      {/* Body text */}
      <p
        style={{
          fontSize: 'var(--fx-body-size)',
          lineHeight: 'var(--fx-body-leading)',
          color: 'var(--fx-text-body)',
          maxWidth: '60ch',
          margin: '24px 0 32px',
        }}
      >
        The best place to start is a free consultation &mdash; a short call
        where we explore your goals together and map out what&apos;s possible.
        Book one in just a few steps.
      </p>

      {/* Social Links */}
      <div style={{ marginBottom: 40 }}>
        <SocialLinks
          socialLinks={FLUXLINE_SOCIAL_LINKS}
          name="Terence Waters"
          size="medium"
        />
      </div>

      {/* CTA Band */}
      <FxCTABand
        title="Book a Free Consultation"
        body="Walk us through your vision and we'll design the systems, strategies, and practices that move it forward. No commitment required."
        primaryLabel="Book a Consultation"
        primaryHref="/contact"
        style={{ marginBottom: 48 }}
      />

      {/* The Resonant Identity card */}
      <FxCard style={{ marginBottom: 48 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 16,
            flexWrap: 'wrap',
          }}
        >
          <Image
            src={TheResonantIdentityLogo}
            alt="The Resonant Identity logo"
            width={112}
            height={112}
            style={{ width: 112, height: 'auto' }}
            priority={false}
          />
          <div>
            <h3
              style={{
                fontSize: 'var(--fx-h3-size)',
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                margin: '0 0 6px',
              }}
            >
              The Resonant Identity
            </h3>
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--fx-text-muted)',
              }}
            >
              Listener Contact
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: 'var(--fx-body-size)',
            lineHeight: 'var(--fx-body-leading)',
            color: 'var(--fx-text-body)',
            maxWidth: '60ch',
            margin: '0 0 20px',
          }}
        >
          If you&apos;ve been listening to The Resonant Identity and want to
          continue the conversation, reach out directly. Share your question,
          idea, or collaboration concept and we&apos;ll take it from there.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <FxButton variant="outline" href={triEmailHref}>
            Email The Resonant Identity
          </FxButton>
          <FxButton
            href="https://facebook.com/theresonantid"
          >
            Join the Conversation on Facebook
          </FxButton>
        </div>
      </FxCard>

      {/* Divider */}
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid var(--fx-border)',
          margin: '48px 0',
        }}
      />

      {/* Contact Form — secondary option */}
      <section>
        <h3
          style={{
            fontSize: 'var(--fx-h3-size)',
            fontWeight: 600,
            color: 'var(--fx-text-heading)',
            margin: '0 0 12px',
          }}
        >
          Prefer to write? Send us a note.
        </h3>
        <p
          style={{
            fontSize: 14.5,
            lineHeight: 1.6,
            color: 'var(--fx-text-muted)',
            maxWidth: '480px',
            margin: '0 0 24px',
          }}
        >
          If you would rather drop us a message directly, feel free to use the
          form below. We read every note and will respond as soon as we can.
        </p>
        <div style={{ maxWidth: 600 }}>
          <ContactForm />
        </div>
      </section>
    </FxContainer>
  );
}
