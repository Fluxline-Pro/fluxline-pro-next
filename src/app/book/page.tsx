'use client';

/**
 * /book — Dedicated consultation booking page
 * Opens the ConsultationStepper immediately on load.
 */

import React from 'react';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxButton from '@/theme/components/dsm/FxButton';
import { ConsultationStepper } from '@/components/ConsultationStepper';

export default function BookPage() {
  const [stepperOpen, setStepperOpen] = React.useState(false);

  // Auto-open stepper on page load with a short delay to allow
  // assistive technologies to announce the page content first
  React.useEffect(() => {
    const timer = setTimeout(() => setStepperOpen(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      <FxSectionHeading
        title='Book a Consultation'
        subhead='Tell us about your needs and schedule a Zoom call — all in three quick steps.'
        as='h1'
      />

      <div style={{ marginTop: 20 }}>
        <FxButton
          variant='primary'
          size='lg'
          onClick={() => setStepperOpen(true)}
          style={{ minWidth: '260px' }}
        >
          Start Your Consultation →
        </FxButton>
      </div>

      {/* Brief description for SEO / non-JS fallback */}
      <section
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '0 12px',
          marginTop: 44,
        }}
      >
        <h2
          style={{
            fontSize: 'var(--fx-h2-size)',
            color: 'var(--fx-accent)',
            marginBottom: 12,
            fontFamily: 'var(--fx-font)',
          }}
        >
          How it works
        </h2>
        <ol
          style={{
            paddingLeft: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {[
            'Choose the service(s) you need — or select "Help me choose".',
            'Answer a few short questions so we can make the most of our time.',
            'Enter your contact details, pick a meeting length, and schedule your Zoom call.',
          ].map((step, i) => (
            <li key={i}>
              <p
                style={{
                  color: 'var(--fx-text-heading)',
                  margin: 0,
                  fontSize: 'var(--fx-body-size)',
                  lineHeight: 'var(--fx-body-leading)',
                  fontFamily: 'var(--fx-font)',
                }}
              >
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <ConsultationStepper
        isOpen={stepperOpen}
        onDismiss={() => setStepperOpen(false)}
      />
    </FxContainer>
  );
}
