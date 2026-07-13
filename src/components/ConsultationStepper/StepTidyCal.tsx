'use client';

import React, { useEffect } from 'react';

interface StepTidyCalProps {
  /** Fully-formed TidyCal URL with prefill query params */
  tidyCalUrl: string;
  /** Called when the booking is confirmed (postMessage or manual) */
  onComplete: () => void;
  /** Called when the user wants to go back to Step 3 */
  onBack: () => void;
}

/**
 * StepTidyCal — Step 4 of the ConsultationStepper
 *
 * Embeds the TidyCal booking widget in an iframe so the user never leaves
 * the Fluxline modal flow. Listens for the TidyCal postMessage event to
 * detect booking completion automatically; also offers a manual fallback.
 */
export function StepTidyCal({
  tidyCalUrl,
  onComplete,
  onBack,
}: StepTidyCalProps) {
  // Detect booking completion via postMessage from the TidyCal iframe
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const data = event.data;
      if (!data) return;
      // TidyCal fires one of these formats depending on embed method
      const isBookingCreated =
        data.event === 'tidycal:booking:created' ||
        data.type === 'tidycal:booking:created' ||
        (typeof data === 'string' && data.includes('booking:created'));
      if (isBookingCreated) {
        onComplete();
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onComplete]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <div>
        <h4 style={{ marginBottom: '8px', fontSize: 'var(--fx-subhead-size)', fontWeight: 'var(--fx-subhead-weight)', color: 'var(--fx-text-heading)' }}>
          Pick a time
        </h4>
        <p
          style={{ color: 'var(--fx-text-muted)', margin: 0, fontSize: 'var(--fx-body-size)', lineHeight: 'var(--fx-body-leading)' }}
        >
          Choose a date and time below. Your contact details have been
          pre-filled.
        </p>
      </div>

      <iframe
        src={tidyCalUrl}
        style={{
          width: '100%',
          height: '600px',
          border: '1px solid var(--fx-border)',
          borderRadius: 'var(--fx-radius-control)',
        }}
        title='Schedule your consultation'
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button
          type='button'
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--fx-text-muted)',
            cursor: 'pointer',
            fontSize: 'var(--fx-body-sm-size)',
          }}
        >
          ← Back
        </button>
        <button
          type='button'
          onClick={onComplete}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--fx-text-muted)',
            cursor: 'pointer',
            fontSize: 'var(--fx-body-sm-size)',
            textDecoration: 'underline',
          }}
        >
          I&apos;ve completed my booking
        </button>
      </div>
    </div>
  );
}
