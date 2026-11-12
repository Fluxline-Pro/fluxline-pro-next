import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import PreorderBar from './PreorderBar';
import { RCF_STORE_BOOK_URL } from '@/lib/resonanceCore';

describe('PreorderBar', () => {
  it('announces the pre-order with the expected release window', () => {
    render(<PreorderBar />);

    const bar = screen.getByRole('complementary', { name: 'Book pre-order' });
    expect(
      within(bar).getByText('Pre-order for the RCF book now open')
    ).toBeInTheDocument();
    expect(
      within(bar).getByText(
        'Expected release: late February to mid-March 2027 (subject to change)'
      )
    ).toBeInTheDocument();
  });

  it("links to the book's page on the store", () => {
    render(<PreorderBar />);

    const link = screen.getByRole('link', { name: /Go to Store/ });
    expect(link).toHaveAttribute('href', RCF_STORE_BOOK_URL);
    expect(RCF_STORE_BOOK_URL).toMatch(/\/book$/);
  });
});
