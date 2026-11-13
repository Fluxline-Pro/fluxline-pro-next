import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';
import FxNavMenu from './FxNavMenu';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

const mockUsePathname = usePathname as jest.Mock;

const LINKS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Press Releases', href: '/press-release' },
];

describe('FxNavMenu', () => {
  it('starts closed with the links hidden', () => {
    render(<FxNavMenu label='Our Content' links={LINKS} />);

    const button = screen.getByRole('button', { name: /Our Content/ });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('opens on click and lists the four links with their hrefs', async () => {
    const user = userEvent.setup();
    render(<FxNavMenu label='Our Content' links={LINKS} />);

    const button = screen.getByRole('button', { name: /Our Content/ });
    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-controls');
    LINKS.forEach(({ label, href }) => {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute(
        'href',
        href
      );
    });
  });

  it('closes on Escape and returns focus to the button', async () => {
    const user = userEvent.setup();
    render(<FxNavMenu label='Our Content' links={LINKS} />);

    const button = screen.getByRole('button', { name: /Our Content/ });
    await user.click(button);
    await user.keyboard('{Escape}');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveFocus();
  });

  it('closes on an outside click', async () => {
    const user = userEvent.setup();
    render(
      <>
        <FxNavMenu label='Our Content' links={LINKS} />
        <p>Elsewhere</p>
      </>
    );

    await user.click(screen.getByRole('button', { name: /Our Content/ }));
    await user.click(screen.getByText('Elsewhere'));

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it.each(['{Enter}', ' '])('toggles with the keyboard (%p)', async (key) => {
    const user = userEvent.setup();
    render(<FxNavMenu label='Our Content' links={LINKS} />);

    const button = screen.getByRole('button', { name: /Our Content/ });
    button.focus();
    await user.keyboard(key);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.keyboard(key);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles on touch, which has no hover', async () => {
    const user = userEvent.setup();
    render(<FxNavMenu label='Our Content' links={LINKS} />);

    const button = screen.getByRole('button', { name: /Our Content/ });
    await user.pointer({ keys: '[TouchA]', target: button });
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.pointer({ keys: '[TouchA]', target: button });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes when focus tabs out past the last link', async () => {
    const user = userEvent.setup();
    render(
      <>
        <FxNavMenu label='Our Content' links={LINKS} />
        <a href='/contact'>Contact</a>
      </>
    );

    const button = screen.getByRole('button', { name: /Our Content/ });
    button.focus();
    await user.keyboard('{Enter}');
    for (let i = 0; i < LINKS.length; i += 1) await user.tab();
    expect(screen.getByRole('link', { name: 'Press Releases' })).toHaveFocus();

    await user.tab();
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes when the route changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <FxNavMenu label='Our Content' links={LINKS} />
    );

    const button = screen.getByRole('button', { name: /Our Content/ });
    button.focus();
    await user.keyboard('{Enter}');
    expect(button).toHaveAttribute('aria-expanded', 'true');

    mockUsePathname.mockReturnValue('/blog');
    rerender(<FxNavMenu label='Our Content' links={LINKS} />);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    mockUsePathname.mockReturnValue('/');
  });

  it('opens on hover and closes shortly after the mouse leaves', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<FxNavMenu label='Our Content' links={LINKS} />);

    const button = screen.getByRole('button', { name: /Our Content/ });
    await user.hover(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    await user.unhover(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    jest.useRealTimers();
  });

  it('leaves focus alone when Escape closes a hover-opened menu', async () => {
    const user = userEvent.setup();
    render(
      <>
        <input aria-label='Search' />
        <FxNavMenu label='Our Content' links={LINKS} />
      </>
    );

    const search = screen.getByRole('textbox', { name: 'Search' });
    search.focus();
    const button = screen.getByRole('button', { name: /Our Content/ });
    await user.hover(button);
    await user.keyboard('{Escape}');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(search).toHaveFocus();
  });
});
