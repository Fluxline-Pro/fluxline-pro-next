/**
 * ScrollsGrid Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollsGrid } from './ScrollsGrid';
import { ScrollItem } from '../types';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock scroll data for testing
const mockScrolls: ScrollItem[] = [
  {
    id: 'scroll-1',
    title: 'First Scroll',
    description: 'First scroll description',
    category: 'business-strategy',
    pdfUrl: '/scrolls/pdfs/scroll-1.pdf',
    fileSize: '1.0 MB',
    tags: ['tag1'],
    publishedDate: new Date('2025-01-15'),
    lastUpdated: new Date('2025-01-15'),
    seoMetadata: {
      title: 'First Scroll',
      description: 'Description',
      keywords: ['keyword'],
    },
  },
  {
    id: 'scroll-2',
    title: 'Second Scroll',
    description: 'Second scroll description',
    category: 'development',
    pdfUrl: '/scrolls/pdfs/scroll-2.pdf',
    fileSize: '2.0 MB',
    tags: ['tag2'],
    publishedDate: new Date('2025-01-16'),
    lastUpdated: new Date('2025-01-16'),
    seoMetadata: {
      title: 'Second Scroll',
      description: 'Description',
      keywords: ['keyword'],
    },
  },
];

describe('ScrollsGrid', () => {
  beforeEach(() => {
    // Mock window.open
    global.open = jest.fn();
  });

  it('renders without crashing', () => {
    render(<ScrollsGrid scrolls={mockScrolls} />);
  });

  it('renders all scroll cards', () => {
    render(<ScrollsGrid scrolls={mockScrolls} />);
    expect(screen.getByText('First Scroll')).toBeInTheDocument();
    expect(screen.getByText('Second Scroll')).toBeInTheDocument();
  });

  it('renders empty state when no scrolls provided', () => {
    render(<ScrollsGrid scrolls={[]} />);
    expect(
      screen.getByText('No scrolls available at this time.')
    ).toBeInTheDocument();
  });

  it('applies grid layout by default', () => {
    const { container } = render(<ScrollsGrid scrolls={mockScrolls} />);
    const gridElement = container.querySelector('.grid');
    expect(gridElement).toBeInTheDocument();
  });

  it('applies list layout when specified', () => {
    const { container } = render(
      <ScrollsGrid scrolls={mockScrolls} layout='list' />
    );
    const listElement = container.querySelector('.flex-col');
    expect(listElement).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ScrollsGrid scrolls={mockScrolls} className='custom-grid-class' />
    );
    expect(container.querySelector('.custom-grid-class')).toBeInTheDocument();
  });

  it('renders correct number of scroll cards', () => {
    render(<ScrollsGrid scrolls={mockScrolls} />);
    const cards = screen.getAllByRole('link');
    expect(cards).toHaveLength(2);
  });

  it('passes scroll data correctly to ScrollCard components', () => {
    render(<ScrollsGrid scrolls={mockScrolls} />);
    expect(screen.getByText('First scroll description')).toBeInTheDocument();
    expect(screen.getByText('Second scroll description')).toBeInTheDocument();
  });
});
