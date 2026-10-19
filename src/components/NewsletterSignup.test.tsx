import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import NewsletterSignup from './NewsletterSignup';

describe('NewsletterSignup', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  const submit = (email: string) => {
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: email },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
  };

  it('posts the email to the newsletter API and shows its message', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'You are already subscribed.' }),
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    render(<NewsletterSignup />);
    submit('  reader@example.com ');

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(
        'You are already subscribed.'
      )
    );
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/api\/newsletter-subscribe$/);
    expect(init).toMatchObject({ method: 'POST' });
    expect(JSON.parse(init.body)).toEqual({ email: 'reader@example.com' });
  });

  it('shows the API error when the request is rejected', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'A valid email address is required.' }),
    }) as unknown as typeof fetch;

    render(<NewsletterSignup />);
    submit('reader@example.com');

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(
        'A valid email address is required.'
      )
    );
  });
});
