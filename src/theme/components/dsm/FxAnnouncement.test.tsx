import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FxAnnouncement from './FxAnnouncement';

function renderAnnouncement() {
  return render(
    <FxAnnouncement
      label='Now open for pre-order'
      title='The RCF book is open for pre-order.'
      ctaLabel='Pre-order the book'
      ctaHref='https://store.fluxline.pro/book'
    >
      Body copy.
    </FxAnnouncement>
  );
}

describe('FxAnnouncement', () => {
  it('names its region by its own heading', () => {
    renderAnnouncement();
    const region = screen.getByRole('region', {
      name: 'The RCF book is open for pre-order.',
    });
    expect(region).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /open for pre-order/ })
    ).toBeInTheDocument();
  });

  it('renders one link to the given href', () => {
    renderAnnouncement();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', 'https://store.fluxline.pro/book');
    expect(links[0]).toHaveTextContent('Pre-order the book');
  });

  it('takes every colour from the Mythic Gold tokens, never a hex', () => {
    const { container } = renderAnnouncement();
    expect(container.innerHTML).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(screen.getByRole('link').getAttribute('style')).toContain(
      'var(--fx-mythic-gold)'
    );
  });
});
