import React from 'react';
import { render, screen, within } from '@testing-library/react';
import ServicesPageClient from './ServicesPageClient';

jest.mock('@/theme/components/dsm/FxContainer', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/theme/components/dsm/FxSectionHeading', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <h1>{title}</h1>,
}));

jest.mock('@/theme/components/dsm/FxCard', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

jest.mock('@/theme/components/dsm/FxCTABand', () => ({
  __esModule: true,
  default: () => null,
}));

describe('ServicesPageClient', () => {
  it('renders five services in their existing order under the three domains', () => {
    const { container } = render(<ServicesPageClient />);

    expect(
      Array.from(container.querySelectorAll('a h3, a h4')).map((heading) =>
        heading.textContent?.trim()
      )
    ).toEqual([
      'Business Strategy & Systems Alignment',
      'Brand & Experience Design',
      'Web Development & Digital Architecture',
      'Personal Training & Wellness',
      'Resonance Core Framework™',
    ]);
    expect(screen.getByText('Brand & Digital Presence')).toBeInTheDocument();
    expect(screen.getByText('Body & Practice')).toBeInTheDocument();

    const strategySection = screen.getByText('Strategy & Leadership').closest('section');
    expect(strategySection).not.toBeNull();
    expect(within(strategySection as HTMLElement).getAllByRole('link')).toHaveLength(1);
    expect(
      within(strategySection as HTMLElement).getByRole('link', {
        name: /Business Strategy & Systems Alignment/,
      })
    ).toBeInTheDocument();
  });
});
