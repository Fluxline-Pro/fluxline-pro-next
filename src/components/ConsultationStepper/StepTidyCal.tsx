'use client';

import React, { useEffect } from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Typography } from '@/theme/components/typography';

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
  const { theme } = useAppTheme();

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
      style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.m }}
    >
      <div>
        <Typography variant='h4' style={{ marginBottom: theme.spacing.s1 }}>
          Pick a time
        </Typography>
        <Typography
          variant='p'
          style={{ color: theme.palette.neutralSecondary, margin: 0 }}
        >
          Choose a date and time below. Your contact details have been
          pre-filled.
        </Typography>
      </div>

      <iframe
        src={tidyCalUrl}
        style={{
          width: '100%',
          height: '600px',
          border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
          borderRadius: theme.effects.roundedCorner4,
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
            color: theme.palette.neutralSecondary,
            cursor: 'pointer',
            fontSize: theme.typography.fonts.bodySmall.fontSize,
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
            color: theme.palette.neutralSecondary,
            cursor: 'pointer',
            fontSize: theme.typography.fonts.bodySmall.fontSize,
            textDecoration: 'underline',
          }}
        >
          I&apos;ve completed my booking
        </button>
      </div>
    </div>
  );
}
