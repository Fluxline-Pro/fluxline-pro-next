'use client';

/**
 * StepServiceSelection — Step 1 of the Consultation Stepper
 * Multi-select checkboxes for service intent
 */

import React from 'react';
import FxButton from '@/theme/components/dsm/FxButton';
import { SERVICE_OPTIONS } from './constants';
import { ServiceKey, StepOneData } from './types';

interface StepServiceSelectionProps {
  data: StepOneData;
  onChange: (data: StepOneData) => void;
  onNext: () => void;
}

export const StepServiceSelection: React.FC<StepServiceSelectionProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const [error, setError] = React.useState('');

  const toggle = (key: ServiceKey) => {
    let next: ServiceKey[];
    if (key === 'help_me_choose') {
      // Selecting "help me choose" deselects everything else
      next = data.services.includes('help_me_choose') ? [] : ['help_me_choose'];
    } else {
      const without = data.services.filter((s) => s !== 'help_me_choose');
      next = without.includes(key)
        ? without.filter((s) => s !== key)
        : [...without, key];
    }
    onChange({ services: next });
    if (next.length > 0) setError('');
  };

  const handleNext = () => {
    if (data.services.length === 0) {
      setError('Please select at least one option to continue.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div role='group' aria-labelledby='step1-heading'>
      <h3
        id='step1-heading'
        style={{
          fontSize: 'var(--fx-h3-size)',
          fontWeight: 'var(--fx-h3-weight)',
          letterSpacing: 'var(--fx-heading-tracking)',
          color: 'var(--fx-accent)',
          marginBottom: '4px',
        }}
      >
        Step 1 — What are you interested in?
      </h3>
      <p
        style={{
          color: 'var(--fx-text-muted)',
          marginBottom: '20px',
          fontSize: 'var(--fx-body-sm-size)',
        }}
      >
        Select one or more services. If you&apos;re unsure, choose &ldquo;I
        don&apos;t know&rdquo; and we&apos;ll help on the call.
      </p>

      <div className='flex flex-col gap-3'>
        {SERVICE_OPTIONS.map((option) => {
          const isSelected = data.services.includes(option.key);
          return (
            <label
              key={option.key}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '16px',
                borderRadius: 'var(--fx-radius-card-sm)',
                border: `2px solid ${isSelected ? 'var(--fx-accent)' : 'var(--fx-border)'}`,
                backgroundColor: isSelected
                  ? 'var(--fx-surface-raised)'
                  : 'var(--fx-surface-card)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                type='checkbox'
                checked={isSelected}
                onChange={() => toggle(option.key)}
                aria-label={option.label}
                style={{
                  marginTop: '3px',
                  accentColor: 'var(--fx-accent)',
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              />
              <div>
                <p
                  style={{
                    fontWeight: 600,
                    color: isSelected
                      ? 'var(--fx-accent)'
                      : 'var(--fx-text-heading)',
                    margin: 0,
                    marginBottom: '2px',
                  }}
                >
                  {option.label}
                </p>
                <p
                  style={{
                    color: 'var(--fx-text-muted)',
                    fontSize: 'var(--fx-body-sm-size)',
                    margin: 0,
                  }}
                >
                  {option.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {error && (
        <div
          role='alert'
          style={{
            marginTop: '16px',
            color: 'var(--fx-error)',
            fontSize: 'var(--fx-body-sm-size)',
          }}
        >
          {error}
        </div>
      )}

      <div className='flex justify-end mt-6'>
        <FxButton variant="primary" size="md" onClick={handleNext}>
          Next: Tell us about your needs &rarr;
        </FxButton>
      </div>
    </div>
  );
};
