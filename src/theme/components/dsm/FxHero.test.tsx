import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FxHero from './FxHero';

/** FxHero (#414): the home page's defaults stay put; the new options work. */
describe('FxHero', () => {
  it('keeps the home page defaults when no new options are passed', () => {
    const { container } = render(
      <FxHero title='FLUXLINE' backgroundImage='/images/home/bg.jpg' />
    );
    const img = container.querySelector('img')!;
    expect(img.style.opacity).toBe('0.55');
    expect(img).toHaveAttribute('aria-hidden', 'true');
    expect(img).toHaveAttribute('alt', '');
    expect(container.querySelector('.fx-hero-pad')).not.toBeNull();
    expect(container.querySelector('.fx-hero-pad-compact')).toBeNull();
    expect(screen.getByRole('heading', { level: 1 }).style.fontSize).toBe(
      'var(--fx-display-size)'
    );
    const overlay = img.nextElementSibling as HTMLElement;
    expect(overlay.style.background).toContain('160deg');
  });

  it('compact: shorter padding class and an h1-sized title', () => {
    const { container } = render(<FxHero compact title='The RCF' />);
    expect(container.querySelector('.fx-hero-pad-compact')).not.toBeNull();
    expect(screen.getByRole('heading', { level: 1 }).style.fontSize).toBe(
      'var(--fx-h1-size)'
    );
  });

  it('shows a tertiary action and applies the background options', () => {
    const { container } = render(
      <FxHero
        title='The RCF'
        tertiaryCta={{ label: 'Download the RCF Preview', href: '/rcf.pdf' }}
        backgroundImage='/images/RCF_banner_logo.jpg'
        backgroundAlt='The DRIVE compass'
        backgroundPosition='right center'
        backgroundOpacity={0.9}
        backgroundOverlay='linear-gradient(90deg, black, transparent)'
      />
    );
    expect(
      screen.getByRole('link', { name: 'Download the RCF Preview' })
    ).toHaveAttribute('href', '/rcf.pdf');
    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('alt', 'The DRIVE compass');
    expect(img).not.toHaveAttribute('aria-hidden');
    expect(img.style.objectPosition).toBe('right center');
    expect(img.style.opacity).toBe('0.9');
    expect((img.nextElementSibling as HTMLElement).style.background).toContain(
      '90deg'
    );
  });

  it('marks the card as content on a dark surface (light text in every theme)', () => {
    render(<FxHero title='The RCF' />);
    const card = screen.getByRole('heading', { level: 1 }).parentElement!;
    expect(card).toHaveClass('fx-on-dark');
  });
});
