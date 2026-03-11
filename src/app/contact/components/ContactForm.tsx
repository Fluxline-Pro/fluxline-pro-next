'use client';

import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { FormButton, FormInput, FormTextarea } from '@/theme/components/form';
import { Typography } from '@/theme/components/typography';
import { getApiEndpoint } from '@/lib/getApiUrl';

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
  const { executeRecaptcha } = useGoogleReCaptcha();
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
    // Simple email regex for validation
    // will be more robust after backend infrastructure build
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 10) {
      newErrors.name = 'Name must be at least 10 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Message must be at least 15 characters';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message must be 1000 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateField = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'message') {
      setCharCount(value.length);
    }

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    updateField(name as keyof FormData, value);
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

    // Check if reCAPTCHA is available
    if (!executeRecaptcha) {
      setStatus('error');
      setErrors({
        submit:
          'reCAPTCHA not available. Please refresh the page and try again.',
      });
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      // Generate reCAPTCHA token
      const recaptchaToken = await executeRecaptcha('contact_form_submit');

      const apiUrl = getApiEndpoint('/api/contact');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          recaptchaToken, // Include reCAPTCHA token
        }),
      });

      if (!response.ok) {
        // Try to parse JSON error message, but handle non-JSON responses
        let errorMessage = 'Failed to send message';
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } else {
            // Non-JSON response (e.g., 404 HTML page)
            errorMessage =
              response.status === 404
                ? 'Contact service is unavailable. Please try again later.'
                : `Server error: ${response.status}`;
          }
        } catch {
          // JSON parsing failed
          errorMessage = 'Failed to send message. Please try again later.';
        }
        throw new Error(errorMessage);
      }

      // Also safely parse success response
      try {
        await response.json();
      } catch {
        // If response isn't JSON but status is OK, consider it success
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
        <FormInput
          label='Name'
          id='name'
          name='name'
          type='text'
          value={formData.name}
          onChange={(value) => updateField('name', value)}
          placeholder='Your first and last name'
          required
          requiredIndicator
          aria-required='true'
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'name-error' : undefined}
          aria-label='Name'
        />
        {errors.name && (
          <div id='name-error' role='alert' style={errorStyle}>
            {errors.name}
          </div>
        )}
      </div>

      {/* Email Field */}
      <div>
        <FormInput
          label='E-mail'
          id='email'
          name='email'
          type='email'
          value={formData.email}
          onChange={(value) => updateField('email', value)}
          placeholder='E-mail address'
          required
          requiredIndicator
          aria-required='true'
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-label='E-mail'
        />
        {errors.email && (
          <div id='email-error' role='alert' style={errorStyle}>
            {errors.email}
          </div>
        )}
      </div>

      {/* Message Field */}
      <div>
        <FormTextarea
          label='Message'
          id='message'
          name='message'
          value={formData.message}
          onChange={(value) => updateField('message', value)}
          placeholder='Type your message here...'
          required
          requiredIndicator
          aria-required='true'
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={
            errors.message ? 'message-error' : 'message-counter'
          }
          aria-label='Message'
          maxLength={1000}
          rows={6}
          style={{
            resize: 'vertical',
            minHeight: '150px',
          }}
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
      <FormButton
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
          aria-live='polite'
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
          aria-live='polite'
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
