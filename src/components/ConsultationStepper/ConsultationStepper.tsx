'use client';

/**
 * ConsultationStepper
 * Three-step branded onboarding modal for Fluxline.pro
 *
 * Step 1: Service Selection
 * Step 2: Contextual Questions
 * Step 3: Contact & Scheduling (TidyCal integration)
 */

import React, { useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Typography } from '@/theme/components/typography';
import { Modal } from '@/components/Modal';
import { FadeIn } from '@/animations/fade-animations';
import { useConsultationStorage } from './useConsultationStorage';
import { StepServiceSelection } from './StepServiceSelection';
import { StepContextualQuestions } from './StepContextualQuestions';
import { StepContactSchedule } from './StepContactSchedule';
import { TIDYCAL_LINKS } from './constants';
import { getApiEndpoint } from '@/lib/getApiUrl';
import { LeadPayload, MeetingLength, StepperStep, SubmitStatus } from './types';
import { FormButton } from '@/theme/components/form/FormButton';
import { FluentIcon } from '@/theme/components/fluent-icon/fluent-icon';
import { StepTidyCal } from './StepTidyCal';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';

declare global {
  interface Window {
    gtag?: (
      cmd: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/** Maximum character length for TidyCal prefill notes parameter */
const TIDYCAL_MAX_NOTES_LENGTH = 500;

export interface ConsultationStepperProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onDismiss: () => void;
}

const STEP_LABELS: Record<StepperStep, string> = {
  1: 'Services',
  2: 'Your Needs',
  3: 'Contact & Schedule',
};

function StepIndicator({
  currentStep,
  onStepClick,
}: {
  currentStep: StepperStep;
  onStepClick: (step: StepperStep) => void;
}) {
  const { theme } = useAppTheme();
  const steps: StepperStep[] = [1, 2, 3];

  return (
    <nav
      aria-label='Consultation steps'
      style={{ marginBottom: theme.spacing.xl }}
    >
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: 0,
        }}
      >
        {steps.map((step, idx) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isClickable = step < currentStep;

          return (
            <React.Fragment key={step}>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: idx < 2 ? 1 : undefined,
                }}
              >
                <button
                  type='button'
                  onClick={() => isClickable && onStepClick(step)}
                  disabled={!isClickable}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`Step ${step}: ${STEP_LABELS[step]}${isCompleted ? ' (completed)' : ''}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: isClickable ? 'pointer' : 'default',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                  }}
                >
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: theme.typography.fontWeights.semiBold,
                      fontSize: '0.875rem',
                      backgroundColor: isCompleted
                        ? theme.palette.themePrimary
                        : isCurrent
                          ? theme.palette.themePrimary
                          : theme.palette.neutralQuaternaryAlt,
                      color:
                        isCompleted || isCurrent
                          ? theme.palette.white
                          : theme.palette.neutralSecondary,
                      border: isCurrent
                        ? `3px solid ${theme.palette.themeDark}`
                        : 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isCompleted ? '✓' : step}
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: isCurrent
                        ? theme.palette.themePrimary
                        : theme.palette.neutralSecondary,
                      fontWeight: isCurrent
                        ? theme.typography.fontWeights.semiBold
                        : undefined,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {STEP_LABELS[step]}
                  </span>
                </button>

                {/* Connector line */}
                {idx < 2 && (
                  <div
                    aria-hidden='true'
                    style={{
                      flex: 1,
                      height: '2px',
                      marginBottom: '20px',
                      marginLeft: '8px',
                      marginRight: '8px',
                      backgroundColor:
                        step < currentStep
                          ? theme.palette.themePrimary
                          : theme.palette.neutralQuaternaryAlt,
                      transition: 'background-color 0.3s ease',
                    }}
                  />
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  const { theme } = useAppTheme();
  return (
    <div
      style={{
        textAlign: 'center',
        padding: `${theme.spacing.xl} ${theme.spacing.m}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing.m,
      }}
      role='status'
      aria-live='polite'
    >
      <div style={{ fontSize: '4rem' }} aria-hidden='true'>
        <FluentIcon
          iconName='CheckMark'
          size='large'
          color={theme.palette.themePrimary}
        />
      </div>
      <Typography
        variant='h3'
        style={{ color: theme.palette.themePrimary, marginBottom: 0 }}
      >
        You&apos;re all set!
      </Typography>
      <Typography
        variant='p'
        style={{ color: theme.palette.neutralSecondary, maxWidth: '400px' }}
      >
        Your consultation has been scheduled. Check your inbox for a
        confirmation email with all the details.
      </Typography>

      <FormButton
        type='button'
        onClick={onClose}
        style={{
          marginTop: theme.spacing.m,
          background: 'none',
          border: 'none',
          color: theme.palette.neutralSecondary,
          cursor: 'pointer',
          fontSize: theme.typography.fonts.bodySmall.fontSize,
        }}
      >
        Close
      </FormButton>
    </div>
  );
}

/** Builds a TidyCal prefill URL with contact + summary data */
function buildTidyCalUrl(
  meetingLength: MeetingLength,
  fullName: string,
  email: string,
  noteSummary: string
): string {
  const base = TIDYCAL_LINKS[meetingLength] ?? TIDYCAL_LINKS['30'];
  const params = new URLSearchParams({
    name: fullName,
    email,
    notes: noteSummary.slice(0, TIDYCAL_MAX_NOTES_LENGTH),
  });
  return `${base}?${params.toString()}`;
}

/** Fires an analytics event if window.gtag is available */
function fireEvent(name: string, params?: Record<string, string | number>) {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', name, params);
    }
  } catch {
    // Ignore analytics errors
  }
}

export const ConsultationStepper: React.FC<ConsultationStepperProps> = ({
  isOpen,
  onDismiss,
}) => {
  const { theme } = useAppTheme();
  const [currentStep, setCurrentStep] = React.useState<StepperStep>(1);
  const [status, setStatus] = React.useState<SubmitStatus>('idle');
  const [isMounted, setIsMounted] = React.useState(false);
  const [tidyCalUrl, setTidyCalUrl] = React.useState('');
  const isMobileHook = useIsMobile();
  const isMobile = isMounted ? isMobileHook : false;

  const {
    step1,
    step2,
    step3,
    hasDraft,
    setStep1,
    setStep2,
    setStep3,
    clearDraft,
  } = useConsultationStorage();

  // Ensure component is mounted before rendering dynamic content
  // This prevents hydration mismatches by only rendering client-specific content after mount
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fire "stepper opened" event on open
  useEffect(() => {
    if (isOpen) {
      fireEvent('consultation_stepper_opened');
      setStatus('idle');
    }
  }, [isOpen]);

  const goToStep = useCallback((step: StepperStep) => {
    setCurrentStep(step);
  }, []);

  const handleStep1Next = useCallback(() => {
    fireEvent('consultation_step_completed', { step: 1 });
    setCurrentStep(2);
  }, []);

  const handleStep2Next = useCallback(() => {
    fireEvent('consultation_step_completed', { step: 2 });
    setCurrentStep(3);
  }, []);

  const handleSchedule = useCallback(async () => {
    fireEvent('consultation_booking_initiated');
    setStatus('submitting');

    // Build a brief note for TidyCal prefill
    const answerLines = Object.entries(step2.answers)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    const services = step1.services.join(', ');
    const note = `Services: ${services}\n${answerLines}`.trim();

    const url = buildTidyCalUrl(
      step3.preferredMeetingLength,
      step3.fullName,
      step3.email,
      note
    );
    setTidyCalUrl(url);

    // Post lead to backend in the background — does not block showing the calendar
    const utmParams = new URLSearchParams(window.location.search);
    const payload: LeadPayload = {
      fullName: step3.fullName,
      email: step3.email,
      phone: step3.phone,
      company: step3.company,
      services: step1.services,
      answers: step2.answers,
      preferredMeetingLength: step3.preferredMeetingLength,
      referralSource:
        step3.referralSource === 'other'
          ? step3.referralOther || 'Other'
          : step3.referralSource,
      consent: step3.consent,
      tidycalBookingId: '',
      submittedAt: new Date().toISOString(),
      utmSource: utmParams.get('utm_source') ?? undefined,
      utmMedium: utmParams.get('utm_medium') ?? undefined,
      utmCampaign: utmParams.get('utm_campaign') ?? undefined,
    };
    fetch(getApiEndpoint('/api/lead'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});

    fireEvent('consultation_step_completed', { step: 3 });
    setStatus('schedule');
  }, [step1, step2, step3]);

  /** Called when TidyCal booking is confirmed (postMessage or manual button) */
  const handleBookingComplete = useCallback(() => {
    fireEvent('consultation_booking_confirmed');
    clearDraft();
    setStatus('success');
  }, [clearDraft]);

  const handleClose = useCallback(() => {
    onDismiss();
    // Reset step after animation finishes
    setTimeout(() => {
      setCurrentStep(1);
      setStatus('idle');
    }, 300);
  }, [onDismiss]);

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={handleClose}
      ariaLabel='Book a consultation'
      maxWidth={status === 'schedule' ? '800px' : '640px'}
    >
      <div
        style={{
          padding: isMobile ? theme.spacing.s1 : theme.spacing.xl,
          paddingTop: theme.spacing.l,
        }}
      >
        {/* Draft restore toast */}
        {hasDraft && currentStep === 1 && status === 'idle' && (
          <div
            role='status'
            aria-live='polite'
            style={{
              marginBottom: theme.spacing.m,
              padding: `${theme.spacing.s2} ${theme.spacing.m}`,
              backgroundColor: theme.palette.neutralLighterAlt,
              border: `1px solid ${theme.palette.neutralQuaternary}`,
              borderLeft: `3px solid ${theme.palette.themePrimary}`,
              borderRadius: theme.effects.roundedCorner4,
              boxShadow: theme.shadows.card,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: theme.spacing.s2,
            }}
          >
            <Typography
              variant='p'
              style={{
                color: theme.palette.themePrimary,
                fontSize: theme.typography.fonts.bodySmall.fontSize,
                fontWeight: theme.typography.fontWeights.semiBold,
                margin: 0,
              }}
            >
              Your previous answers have been restored.
            </Typography>
            <button
              type='button'
              onClick={clearDraft}
              style={{
                background: 'none',
                border: 'none',
                color: theme.palette.neutralSecondary,
                cursor: 'pointer',
                fontSize: theme.typography.fonts.bodySmall.fontSize,
                flexShrink: 0,
                padding: '0 4px',
                textDecoration: 'underline',
                marginRight: isMobile ? '2rem' : undefined,
              }}
              aria-label='Clear saved draft'
            >
              Clear
            </button>
          </div>
        )}

        <AnimatePresence mode='wait'>
          {status === 'success' ? (
            <FadeIn key='success'>
              <SuccessView onClose={handleClose} />
            </FadeIn>
          ) : status === 'schedule' ? (
            <FadeIn key='schedule'>
              <StepTidyCal
                tidyCalUrl={tidyCalUrl}
                onComplete={handleBookingComplete}
                onBack={() => setStatus('idle')}
              />
            </FadeIn>
          ) : (
            <FadeIn key='stepper-views'>
              <>
                <StepIndicator
                  currentStep={currentStep}
                  onStepClick={goToStep}
                />

                <AnimatePresence mode='wait'>
                  {currentStep === 1 && (
                    <FadeIn key='step-1'>
                      <StepServiceSelection
                        data={step1}
                        onChange={setStep1}
                        onNext={handleStep1Next}
                      />
                    </FadeIn>
                  )}

                  {currentStep === 2 && (
                    <FadeIn key='step-2'>
                      <StepContextualQuestions
                        step1={step1}
                        data={step2}
                        onChange={setStep2}
                        onNext={handleStep2Next}
                        onBack={() => {
                          fireEvent('consultation_step_back', { from: 2 });
                          setCurrentStep(1);
                        }}
                      />
                    </FadeIn>
                  )}

                  {currentStep === 3 && (
                    <FadeIn key='step-3'>
                      <StepContactSchedule
                        data={step3}
                        onChange={setStep3}
                        onBack={() => {
                          fireEvent('consultation_step_back', { from: 3 });
                          setCurrentStep(2);
                        }}
                        onSchedule={handleSchedule}
                        status={status}
                      />
                    </FadeIn>
                  )}
                </AnimatePresence>
              </>
            </FadeIn>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};
