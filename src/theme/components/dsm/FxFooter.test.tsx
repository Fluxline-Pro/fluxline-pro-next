import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FxFooter from './FxFooter';

describe('FxFooter', () => {
  it('shows the copyright and the right-hand links only', () => {
    render(<FxFooter />);

    expect(
      screen.getByText(/Fluxline Resonance Group, LLC/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Legal & Governance' })
    ).toHaveAttribute('href', '/legal');
    expect(
      screen.getByRole('link', { name: 'Press Releases' })
    ).toHaveAttribute('href', '/press-release');
    expect(
      screen.getByRole('link', { name: 'fluxline.pro' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('navigation', { name: 'Fluxline Ecosystem' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Display/ })
    ).not.toBeInTheDocument();
  });

  it('swaps the links for a back link when one is given', () => {
    render(<FxFooter backLink={{ label: 'Back to Blog', href: '/blog' }} />);

    expect(screen.getByRole('link', { name: 'Back to Blog' })).toHaveAttribute(
      'href',
      '/blog'
    );
    expect(
      screen.queryByRole('link', { name: 'Legal & Governance' })
    ).not.toBeInTheDocument();
  });
});
