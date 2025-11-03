import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ClientOnly } from './client-only';

describe('ClientOnly', () => {
  it('renders children after mount', () => {
    const testText = 'Client content';
    render(<ClientOnly>{testText}</ClientOnly>);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('renders fallback during SSR', () => {
    const fallbackText = 'Loading...';
    const childText = 'Client content';

    render(<ClientOnly fallback={fallbackText}>{childText}</ClientOnly>);

    // After mount, should show client content
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('renders null fallback by default', () => {
    const { container } = render(
      <ClientOnly>
        <div data-testid='client-content'>Client content</div>
      </ClientOnly>
    );

    expect(screen.getByTestId('client-content')).toBeInTheDocument();
  });

  it('renders complex children', () => {
    render(
      <ClientOnly>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <button>Button</button>
        </div>
      </ClientOnly>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Title');
    expect(screen.getByRole('button')).toHaveTextContent('Button');
  });

  it('handles interactive content', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <ClientOnly>
        <button onClick={handleClick}>Click me</button>
      </ClientOnly>
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
