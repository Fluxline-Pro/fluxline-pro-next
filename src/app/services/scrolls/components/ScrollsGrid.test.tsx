/**
 * ScrollsGrid Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollsGrid } from './ScrollsGrid';
import { ScrollItem } from '../types';

/** Find a rendered div whose inline display style matches. */
const findByDisplay = (container: HTMLElement, display: string) =>
  Array.from(container.querySelectorAll('div')).find(
    (el) => el.style.display === display
  );

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
    const gridElement = findByDisplay(container, 'grid');
    expect(gridElement).toBeDefined();
    expect(gridElement).toHaveStyle({
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    });
  });

  it('applies list layout when specified', () => {
    const { container } = render(
      <ScrollsGrid scrolls={mockScrolls} layout='list' />
    );
    expect(findByDisplay(container, 'grid')).toBeUndefined();
    const listElement = findByDisplay(container, 'flex');
    expect(listElement).toBeDefined();
    expect(listElement).toHaveStyle({ flexDirection: 'column' });
  });

  it('renders correct number of scroll cards', () => {
    render(<ScrollsGrid scrolls={mockScrolls} />);
    const downloadButtons = screen.getAllByRole('button', {
      name: /download/i,
    });
    expect(downloadButtons).toHaveLength(2);
  });

  it('passes scroll data correctly to ScrollCard components', () => {
    render(<ScrollsGrid scrolls={mockScrolls} />);
    expect(screen.getByText('First scroll description')).toBeInTheDocument();
    expect(screen.getByText('Second scroll description')).toBeInTheDocument();
  });
});
