'use client';

/**
 * /book — Dedicated consultation booking page
 * Opens the ConsultationStepper immediately on load.
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components';
import { ConsultationStepper } from '@/components/ConsultationStepper';
import { Typography } from '@/theme/components/typography';
import { Hero } from '@/theme/components/hero';
import { FormButton } from '@/theme/components/form/FormButton';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { getIconForPath } from '@/utils/navigation-icons';

export default function BookPage() {
  const { theme } = useAppTheme();
  const [stepperOpen, setStepperOpen] = React.useState(false);

  // Auto-open stepper on page load with a short delay to allow
  // assistive technologies to announce the page content first
  React.useEffect(() => {
    const timer = setTimeout(() => setStepperOpen(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <Hero
        title='Book a Consultation'
        iconName={getIconForPath('/book')}
        description='Tell us about your needs and schedule a Zoom call — all in three quick steps.'
      >
        <div style={{ marginTop: theme.spacing.l }}>
          <FormButton
            variant='primary'
            size='large'
            text='Start Your Consultation →'
            onClick={() => setStepperOpen(true)}
            style={{ minWidth: '260px' }}
          />
        </div>
      </Hero>

      {/* Brief description for SEO / non-JS fallback */}
      <section
        style={{
          maxWidth: '640px',
          margin: `0 auto`,
          padding: `0 ${theme.spacing.m}`,
        }}
      >
        <Typography
          variant='h2'
          style={{
            color: theme.palette.themePrimary,
            marginBottom: theme.spacing.m,
          }}
        >
          How it works
        </Typography>
        <ol
          style={{
            paddingLeft: theme.spacing.l,
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.m,
          }}
        >
          {[
            'Choose the service(s) you need — or select "Help me choose".',
            'Answer a few short questions so we can make the most of our time.',
            'Enter your contact details, pick a meeting length, and schedule your Zoom call.',
          ].map((step, i) => (
            <li key={i}>
              <Typography
                variant='p'
                style={{ color: theme.palette.neutralPrimary, margin: 0 }}
              >
                {step}
              </Typography>
            </li>
          ))}
        </ol>
      </section>

      <ConsultationStepper
        isOpen={stepperOpen}
        onDismiss={() => setStepperOpen(false)}
      />
    </UnifiedPageWrapper>
  );
}
