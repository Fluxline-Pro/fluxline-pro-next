'use client';

import React, { useState } from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Button } from '@/theme/components/button';
import { Typography } from '@/theme/components/typography';

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string; // Anti-spam field
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  submit?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export const ContactForm: React.FC = () => {
  const { theme } = useAppTheme();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [charCount, setCharCount] = useState(0);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message must be 1000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update character count for message
    if (name === 'message') {
      setCharCount(value.length);
    }

    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot field (should be empty)
    if (formData.honeypot) {
      return; // Likely spam
    }

    if (!validateForm()) {
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
      setCharCount(0);
    } catch (error) {
      setStatus('error');
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : 'Failed to send message. Please try again.',
      });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: theme.spacing.m,
    fontSize: '1rem',
    fontFamily: theme.typography.fontFamilies.base,
    backgroundColor: theme.palette.neutralLighter,
    color: theme.palette.neutralPrimary,
    border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
    borderRadius: theme.borderRadius.s,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const inputFocusStyle = {
    borderColor: theme.palette.themePrimary,
  };

  const errorStyle: React.CSSProperties = {
    color: theme.semanticColors.errorText || theme.palette.red,
    fontSize: '0.875rem',
    marginTop: theme.spacing.xs,
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Honeypot field - hidden from users */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden='true'>
        <input
          type='text'
          name='honeypot'
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete='off'
        />
      </div>

      {/* Name Field */}
      <div>
        <label
          htmlFor='name'
          style={{
            display: 'block',
            marginBottom: theme.spacing.xs,
            fontSize: '0.875rem',
            fontWeight: theme.typography.fontWeights.semiBold,
            color: theme.palette.neutralSecondary,
          }}
        >
          Name{' '}
          <span
            style={{
              color: theme.semanticColors.errorText || theme.palette.red,
            }}
          >
            *
          </span>
        </label>
        <input
          id='name'
          name='name'
          type='text'
          value={formData.name}
          onChange={handleChange}
          placeholder='Your first and last name'
          required
          aria-required='true'
          {...(errors.name && { 'aria-invalid': 'true' })}
          aria-describedby={errors.name ? 'name-error' : undefined}
          style={inputStyle}
          onFocus={(e) =>
            (e.target.style.borderColor = inputFocusStyle.borderColor)
          }
          onBlur={(e) =>
            (e.target.style.borderColor = theme.palette.neutralQuaternaryAlt)
          }
        />
        {errors.name && (
          <div id='name-error' role='alert' style={errorStyle}>
            {errors.name}
          </div>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor='email'
          style={{
            display: 'block',
            marginBottom: theme.spacing.xs,
            fontSize: '0.875rem',
            fontWeight: theme.typography.fontWeights.semiBold,
            color: theme.palette.neutralSecondary,
          }}
        >
          E-mail{' '}
          <span
            style={{
              color: theme.semanticColors.errorText || theme.palette.red,
            }}
          >
            *
          </span>
        </label>
        <input
          id='email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='E-mail address'
          required
          aria-required='true'
          {...(errors.email && { 'aria-invalid': 'true' })}
          aria-describedby={errors.email ? 'email-error' : undefined}
          style={inputStyle}
          onFocus={(e) =>
            (e.target.style.borderColor = inputFocusStyle.borderColor)
          }
          onBlur={(e) =>
            (e.target.style.borderColor = theme.palette.neutralQuaternaryAlt)
          }
        />
        {errors.email && (
          <div id='email-error' role='alert' style={errorStyle}>
            {errors.email}
          </div>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor='message'
          style={{
            display: 'block',
            marginBottom: theme.spacing.xs,
            fontSize: '0.875rem',
            fontWeight: theme.typography.fontWeights.semiBold,
            color: theme.palette.neutralSecondary,
          }}
        >
          Message{' '}
          <span
            style={{
              color: theme.semanticColors.errorText || theme.palette.red,
            }}
          >
            *
          </span>
        </label>
        <textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          placeholder='Type your message here...'
          required
          aria-required='true'
          {...(errors.message && { 'aria-invalid': 'true' })}
          aria-describedby={
            errors.message ? 'message-error' : 'message-counter'
          }
          maxLength={1000}
          rows={6}
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: '150px',
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = inputFocusStyle.borderColor)
          }
          onBlur={(e) =>
            (e.target.style.borderColor = theme.palette.neutralQuaternaryAlt)
          }
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacing.xs,
          }}
        >
          {errors.message && (
            <div id='message-error' role='alert' style={errorStyle}>
              {errors.message}
            </div>
          )}
          <div
            id='message-counter'
            style={{
              fontSize: '0.75rem',
              color: theme.palette.neutralTertiary,
              marginLeft: 'auto',
            }}
          >
            {charCount}/1000
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        variant='primary'
        fullWidth
        disabled={status === 'submitting'}
        text={status === 'submitting' ? 'Sending...' : 'Submit'}
        aria-busy={status === 'submitting'}
      />

      {/* Success Message */}
      {status === 'success' && (
        <div
          role='alert'
          style={{
            padding: theme.spacing.m,
            backgroundColor:
              theme.semanticColors.successBackground || '#E0F2F1',
            color: theme.semanticColors.successText || theme.palette.green,
            borderRadius: theme.borderRadius.s,
            textAlign: 'center',
          }}
        >
          <Typography variant='p' style={{ margin: 0 }}>
            Thank you for your message! We&apos;ll get back to you soon.
          </Typography>
        </div>
      )}

      {/* Error Message */}
      {errors.submit && (
        <div
          role='alert'
          style={{
            padding: theme.spacing.m,
            backgroundColor: theme.semanticColors.errorBackground || '#FFEBEE',
            color: theme.semanticColors.errorText || theme.palette.red,
            borderRadius: theme.borderRadius.s,
            textAlign: 'center',
          }}
        >
          <Typography variant='p' style={{ margin: 0 }}>
            {errors.submit}
          </Typography>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
