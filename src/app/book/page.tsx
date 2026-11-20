'use client';

/**
 * /book — Book a Conversation (#408).
 *
 * Opens the Book a Conversation dialog on load, and offers a button to reopen
 * it. Every "Book a Conversation" button on the site links here, so without
 * JavaScript this page is where they land: the TidyCal calendar link below
 * works without it.
 */

import React from 'react';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import {
  FxBookingTrigger,
  useBookingModal,
} from '@/theme/components/dsm/FxBookingModal';
import { BOOKING_FLOW, TIDYCAL_URL } from '@/theme/components/dsm/bookingCopy';

export default function BookPage() {
  const booking = useBookingModal();
  const open = booking?.open;

  // Open once on load, after a short delay so assistive technologies can
  // announce the page first.
  React.useEffect(() => {
    if (!open) return;
    const timer = setTimeout(open, 150);
    return () => clearTimeout(timer);
  }, [open]);

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      <FxSectionHeading
        title='Book a Conversation'
        subhead='Tell us about your needs and schedule a Zoom call, all in three quick steps.'
        as='h1'
      />

      <div style={{ marginTop: 20 }}>
        <FxBookingTrigger
          variant='primary'
          size='lg'
          style={{ minWidth: '260px' }}
        />
      </div>

      <noscript>
        <p style={{ marginTop: 16, color: 'var(--fx-text-body)' }}>
          {BOOKING_FLOW.noScript}{' '}
          <a href={TIDYCAL_URL} target='_blank' rel='noopener noreferrer'>
            {BOOKING_FLOW.noScriptLink}
          </a>
        </p>
      </noscript>

      {/* What the steps are, for search and for anyone reading first. */}
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
          ].map((step) => (
            <li key={step}>
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
    </FxContainer>
  );
}
