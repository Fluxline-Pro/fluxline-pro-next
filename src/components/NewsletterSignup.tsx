'use client';

import React from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { getApiEndpoint } from '@/lib/getApiUrl';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/** How long a submit waits for the async reCAPTCHA script before giving up. */
const RECAPTCHA_READY_TIMEOUT_MS = 10000;
const RECAPTCHA_POLL_MS = 100;

interface NewsletterSignupProps {
  /** `sm` matches the compact contact-page card; `md` the wider bands. */
  size?: 'sm' | 'md';
  /** Accessible name for the email field. */
  ariaLabel?: string;
  /** Extra styles for the input + button row (e.g. flex sizing in a band). */
  rowStyle?: React.CSSProperties;
}

/**
 * The TRI Newsletter sign-up (email → /api/newsletter-subscribe → the
 * SharePoint distribution list). Used wherever Fluxline offers the
 * newsletter or "be notified at launch", so every box actually subscribes.
 */
export function NewsletterSignup({
  size = 'md',
  ariaLabel = 'Email address for The Resonant Identity newsletter',
  rowStyle,
}: NewsletterSignupProps) {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');
  const [message, setMessage] = React.useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  // `executeRecaptcha` is undefined until the async reCAPTCHA script finishes
  // loading. Read it through a ref so a submit already in flight can wait for
  // the real function instead of capturing the undefined it started with —
  // a one-field form like this is often submitted before the script lands.
  const executeRecaptchaRef = React.useRef(executeRecaptcha);
  React.useEffect(() => {
    executeRecaptchaRef.current = executeRecaptcha;
  }, [executeRecaptcha]);

  const waitForRecaptcha = React.useCallback(async () => {
    const deadline = Date.now() + RECAPTCHA_READY_TIMEOUT_MS;
    while (!executeRecaptchaRef.current) {
      if (Date.now() > deadline) return null;
      await new Promise((resolve) => setTimeout(resolve, RECAPTCHA_POLL_MS));
    }
    return executeRecaptchaRef.current;
  }, []);

  const pad = size === 'sm' ? '10px 12px' : '12px 14px';
  const fontSize = size === 'sm' ? 13.5 : 14;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      const execute = await waitForRecaptcha();
      if (!execute) {
        setStatus('error');
        setMessage(
          'Spam protection didn’t finish loading. Refresh the page and try again.'
        );
        return;
      }
      const recaptchaToken = await execute('newsletter_subscribe');

      const res = await fetch(getApiEndpoint('/api/newsletter-subscribe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), recaptchaToken }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong. Please try again.');
        return;
      }
      setStatus('success');
      setMessage(data.message ?? "You're subscribed. Thank you.");
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div style={{ display: 'flex', gap: 8, ...rowStyle }}>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='your@email.com'
          aria-label={ariaLabel}
          autoComplete='email'
          disabled={status === 'submitting'}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'var(--fx-surface-input)',
            border: '1px solid var(--fx-border)',
            borderRadius: 8,
            padding: pad,
            fontSize,
            color: 'var(--fx-text-bright)',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button
          type='submit'
          disabled={status === 'submitting'}
          style={{
            background: 'var(--fx-accent)',
            color: 'var(--fx-accent-ink)',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: size === 'sm' ? 13 : 14,
            padding: size === 'sm' ? '10px 16px' : '12px 22px',
            border: 'none',
            cursor: status === 'submitting' ? 'default' : 'pointer',
            whiteSpace: 'nowrap',
            fontFamily: 'inherit',
            opacity: status === 'submitting' ? 0.7 : 1,
          }}
        >
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      <p
        role='status'
        aria-live='polite'
        style={{
          margin: message ? '8px 0 0' : 0,
          fontSize: 13,
          lineHeight: 1.5,
          color: status === 'error' ? 'var(--fx-error)' : 'var(--fx-teal)',
        }}
      >
        {message}
      </p>
    </form>
  );
}

export default NewsletterSignup;
