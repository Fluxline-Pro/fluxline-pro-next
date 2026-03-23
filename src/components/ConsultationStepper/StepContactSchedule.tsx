'use client';

/**
 * StepContactSchedule — Step 3 of the Consultation Stepper
 * Contact info, meeting length, referral source, consent, and TidyCal scheduling
 */

import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form/FormButton';
import { FormInput } from '@/theme/components/form/FormInput';
import { FormSelect } from '@/theme/components/form/FormSelect';
import { REFERRAL_OPTIONS, TIDYCAL_LINKS } from './constants';
import { MeetingLength, StepThreeData, SubmitStatus } from './types';

interface StepContactScheduleProps {
  data: StepThreeData;
  onChange: (data: StepThreeData) => void;
  onBack: () => void;
  onSchedule: () => void;
  status: SubmitStatus;
}

const MEETING_LENGTHS: Array<{ value: MeetingLength; label: string; description: string }> = [
  { value: '20', label: '20 min', description: 'Quick intro & fit check' },
  { value: '30', label: '30 min', description: 'Discovery & overview' },
  { value: '45', label: '45 min', description: 'Deep-dive & planning' },
];

export const StepContactSchedule: React.FC<StepContactScheduleProps> = ({
  data,
  onChange,
  onBack,
  onSchedule,
  status,
}) => {
  const { theme } = useAppTheme();
  const [errors, setErrors] = React.useState<Partial<Record<keyof StepThreeData, string>>>({});

  const update = <K extends keyof StepThreeData>(key: K, value: StepThreeData[K]) => {
    onChange({ ...data, [key]: value });
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof StepThreeData, string>> = {};
    if (!data.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!data.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!data.referralSource) newErrors.referralSource = 'Please let us know how you heard about us.';
    if (!data.consent) newErrors.consent = 'You must consent to be contacted to proceed.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSchedule = () => {
    if (!validate()) return;
    onSchedule();
  };

  const isLoading = status === 'booking' || status === 'submitting';

  return (
    <div>
      <Typography
        variant='h3'
        style={{ color: theme.palette.themePrimary, marginBottom: theme.spacing.xs }}
      >
        Step 3 — Contact &amp; Schedule
      </Typography>
      <Typography
        variant='p'
        style={{
          color: theme.palette.neutralSecondary,
          marginBottom: theme.spacing.l,
          fontSize: theme.typography.fonts.bodySmall.fontSize,
        }}
      >
        Enter your details below. After clicking &ldquo;Schedule a time&rdquo; you&apos;ll be taken to our booking calendar to pick a slot.
      </Typography>

      <div className='flex flex-col gap-4'>
        {/* Name */}
        <div>
          <FormInput
            label='Full Name'
            value={data.fullName}
            onChange={(v) => update('fullName', v)}
            placeholder='Your full name'
            required
            requiredIndicator
            type='text'
            aria-label='Full Name'
          />
          {errors.fullName && <ErrorMsg>{errors.fullName}</ErrorMsg>}
        </div>

        {/* Email */}
        <div>
          <FormInput
            label='Email Address'
            value={data.email}
            onChange={(v) => update('email', v)}
            placeholder='you@example.com'
            required
            requiredIndicator
            type='email'
            aria-label='Email Address'
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </div>

        {/* Phone */}
        <FormInput
          label='Phone (optional)'
          value={data.phone}
          onChange={(v) => update('phone', v)}
          placeholder='+1 (555) 000-0000'
          type='tel'
          aria-label='Phone number (optional)'
        />

        {/* Company */}
        <FormInput
          label='Company (optional)'
          value={data.company}
          onChange={(v) => update('company', v)}
          placeholder='Your company or organisation'
          type='text'
          aria-label='Company (optional)'
        />

        {/* Meeting length */}
        <fieldset
          style={{
            border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
            borderRadius: theme.effects.roundedCorner6,
            padding: theme.spacing.m,
          }}
        >
          <legend
            style={{
              fontWeight: theme.typography.fontWeights.semiBold,
              color: theme.palette.neutralPrimary,
              padding: `0 ${theme.spacing.xs}`,
              fontSize: theme.typography.fonts.body.fontSize,
            }}
          >
            Preferred Meeting Length <span aria-hidden='true' style={{ color: theme.semanticColors.errorIcon }}>*</span>
          </legend>
          <div className='flex flex-col gap-2 mt-2'>
            {MEETING_LENGTHS.map(({ value, label, description }) => (
              <label
                key={value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: theme.spacing.m,
                  cursor: 'pointer',
                  padding: `${theme.spacing.xs} 0`,
                }}
              >
                <input
                  type='radio'
                  name='meeting-length'
                  value={value}
                  checked={data.preferredMeetingLength === value}
                  onChange={() => update('preferredMeetingLength', value)}
                  style={{
                    accentColor: theme.palette.themePrimary,
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                  }}
                />
                <span>
                  <Typography
                    variant='p'
                    style={{
                      fontWeight: theme.typography.fontWeights.semiBold,
                      color: theme.palette.neutralPrimary,
                      margin: 0,
                      display: 'inline',
                    }}
                  >
                    {label}
                  </Typography>
                  {' '}
                  <Typography
                    variant='p'
                    style={{
                      color: theme.palette.neutralSecondary,
                      fontSize: theme.typography.fonts.bodySmall.fontSize,
                      margin: 0,
                      display: 'inline',
                    }}
                  >
                    — {description}
                  </Typography>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Referral source */}
        <div>
          <FormSelect
            label='How did you hear about us?'
            value={data.referralSource}
            options={REFERRAL_OPTIONS}
            onChange={(v) => update('referralSource', v)}
            placeholder='Select an option…'
            aria-label='How did you hear about us?'
          />
          {errors.referralSource && <ErrorMsg>{errors.referralSource}</ErrorMsg>}
        </div>

        {/* Referral "other" text */}
        {data.referralSource === 'other' && (
          <FormInput
            label='Please specify'
            value={data.referralOther}
            onChange={(v) => update('referralOther', v)}
            placeholder='Tell us how you found us…'
            type='text'
            aria-label='Please specify how you heard about us'
          />
        )}

        {/* Consent */}
        <div>
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: theme.spacing.m,
              cursor: 'pointer',
            }}
          >
            <input
              type='checkbox'
              checked={data.consent}
              onChange={(e) => update('consent', e.target.checked)}
              aria-label='Consent to be contacted and data storage'
              required
              style={{
                marginTop: '3px',
                accentColor: theme.palette.themePrimary,
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralPrimary,
                fontSize: theme.typography.fonts.bodySmall.fontSize,
                margin: 0,
              }}
            >
              I consent to be contacted by Fluxline and to the storage of my
              information for the purposes of this consultation. See our{' '}
              <a
                href='/legal/privacy-policy'
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: theme.palette.themePrimary }}
                aria-label='Privacy Policy (opens in new window)'
              >
                Privacy Policy
                <span className='sr-only'> (opens in new window)</span>
              </a>
              . <span aria-hidden='true' style={{ color: theme.semanticColors.errorIcon }}>*</span>
            </Typography>
          </label>
          {errors.consent && <ErrorMsg>{errors.consent}</ErrorMsg>}
        </div>
      </div>

      {status === 'error' && (
        <div
          role='alert'
          style={{
            marginTop: theme.spacing.m,
            padding: theme.spacing.m,
            backgroundColor: theme.semanticColors.errorBackground,
            color: theme.semanticColors.errorText,
            borderRadius: theme.effects.roundedCorner6,
          }}
        >
          <Typography variant='p' style={{ margin: 0 }}>
            Something went wrong. Please try again or{' '}
            <a href='/contact' style={{ color: theme.semanticColors.errorText, fontWeight: 600 }}>
              contact us directly
            </a>
            .
          </Typography>
        </div>
      )}

      <div className='flex justify-between mt-6'>
        <FormButton
          variant='secondary'
          text='← Back'
          onClick={onBack}
          size='medium'
          disabled={isLoading}
        />
        <FormButton
          variant='primary'
          text={isLoading ? 'Opening calendar…' : 'Schedule a time →'}
          onClick={handleSchedule}
          size='medium'
          disabled={isLoading}
          aria-busy={isLoading}
        />
      </div>
    </div>
  );
};

function ErrorMsg({ children }: { children: React.ReactNode }) {
  const { theme } = useAppTheme();
  return (
    <div role='alert'>
      <Typography
        variant='p'
        style={{
          color: theme.semanticColors.errorText,
          fontSize: theme.typography.fonts.bodySmall.fontSize,
          marginTop: '4px',
        }}
      >
        {children}
      </Typography>
    </div>
  );
}
