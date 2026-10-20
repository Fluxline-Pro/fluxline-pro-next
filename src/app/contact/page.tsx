'use client';

import React from 'react';
import Link from 'next/link';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxRailLayout from '@/theme/components/dsm/FxRailLayout';
import FxButton from '@/theme/components/dsm/FxButton';
import FxFeatureCallout from '@/theme/components/dsm/FxFeatureCallout';
import { ConsultationStepper } from '@/components/ConsultationStepper';
import { ContactForm } from './components/ContactForm';
import NewsletterSignup from '@/components/NewsletterSignup';
import ContactImage from '@/assets/images/ContactMe2400x1600.jpg';

/** The booking flow, in the words the /book page uses. */
const CONSULTATION_STEPS = [
  'Choose the service(s) you need, or select "Help me choose".',
  'Answer a few short questions so we can make the most of our time.',
  'Enter your contact details, pick a meeting length, and schedule your Zoom call.',
];

export default function ContactPage() {
  const [stepperOpen, setStepperOpen] = React.useState(false);

  return (
    <FxContainer style={{ padding: '118px 32px 60px' }}>
      <FxRailLayout
        parallax
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
                  Let&apos;s Connect
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--fx-text-soft)',
                    marginTop: 3,
                  }}
                >
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
                    {
                      label: 'Facebook',
                      href: 'https://www.facebook.com/fluxline',
                    },
                    {
                      label: 'Instagram',
                      href: 'https://instagram.com/fluxlineco',
                    },
                    {
                      label: 'GitHub',
                      href: 'https://github.com/fluxline-pro',
                    },
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
              href='/#contact'
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
            The best place to start is a free consultation — a short call where
            we explore your goals together and map out what&apos;s possible. Or
            just write us a note below.
          </p>
        </div>

        {/* Consultation: the standout next step (same featured callout as
            the RCF and Business Strategy sections on /services). The note
            form below stays available but is deliberately secondary. */}
        <FxFeatureCallout
          id='consultation'
          label='Start here'
          title='Book a Free Consultation'
          titleAs='h2'
          description={
            <>
              Walk us through your vision and we&apos;ll design the systems,
              strategies, and practices that move it forward. No commitment
              required.
            </>
          }
          blurb='Tell us about your needs and schedule a Zoom call, all in three quick steps.'
          style={{ padding: 0 }}
        >
          <ol
            style={{
              margin: '0 0 var(--fx-space-l)',
              paddingLeft: 'var(--fx-space-l)',
              listStyle: 'decimal',
              display: 'grid',
              gap: 'var(--fx-space-xs)',
              fontSize: 'var(--fx-body-sm-size)',
              lineHeight: 'var(--fx-body-sm-leading)',
              color: 'var(--fx-text-body)',
              maxWidth: '60ch',
            }}
          >
            {CONSULTATION_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <FxButton
            variant='primary'
            size='lg'
            onClick={() => setStepperOpen(true)}
            className='fx-feature-callout-action'
          >
            Book a Free Consultation
          </FxButton>
        </FxFeatureCallout>

        {/* Form card (secondary) */}
        <div
          id='note'
          style={{
            scrollMarginTop: 96,
            background: 'var(--fx-surface-inset)',
            border: '1px solid var(--fx-border-subtle)',
            borderRadius: 'var(--fx-radius-card)',
            padding: 'var(--fx-space-l) var(--fx-space-xl)',
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 'var(--fx-body-size)',
              color: 'var(--fx-text-heading)',
              marginBottom: 'var(--fx-space-xxs)',
            }}
          >
            Prefer to write? Send us a note.
          </div>
          <div
            style={{
              fontSize: 'var(--fx-body-sm-size)',
              color: 'var(--fx-text-muted)',
              marginBottom: 'var(--fx-space-l)',
            }}
          >
            We read every note and respond as soon as we can.
          </div>
          <ContactForm />
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
          <div
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--fx-text-bright)',
              marginBottom: 6,
            }}
          >
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
            Insights on Fluxline and the Resonance Core Framework™. Book launch
            updates included. No spam, ever.
          </div>
          <div style={{ marginTop: 'auto' }}>
            <NewsletterSignup size='sm' />
          </div>
        </div>
      </FxRailLayout>

      <ConsultationStepper
        isOpen={stepperOpen}
        onDismiss={() => setStepperOpen(false)}
      />
    </FxContainer>
  );
}
