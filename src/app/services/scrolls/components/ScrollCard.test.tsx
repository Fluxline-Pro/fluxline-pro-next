/**
 * ScrollCard Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ScrollCard } from './ScrollCard';
import { ScrollItem } from '../types';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, className, ...props }: { children: React.ReactNode; href: string; className?: string }) => {
    return <a href={href} className={className} {...props}>{children}</a>;
  };
});

// Mock scroll data for testing
const mockScroll: ScrollItem = {
  id: 'test-scroll',
  title: 'Test Scroll Title',
  description: 'This is a test scroll description for testing purposes.',
  category: 'business-strategy',
  pdfUrl: '/scrolls/pdfs/test.pdf',
  fileSize: '1.2 MB',
  tags: ['testing', 'example', 'mock'],
  publishedDate: new Date('2024-01-15'),
  lastUpdated: new Date('2024-01-15'),
  seoMetadata: {
    title: 'Test Scroll - SEO Title',
    description: 'Test scroll SEO description',
    keywords: ['test', 'scroll'],
  },
};

describe('ScrollCard', () => {
  beforeEach(() => {
    // Mock window.open
    global.open = jest.fn();
  });

  it('renders without crashing', () => {
    render(<ScrollCard scroll={mockScroll} />);
  });

  it('renders scroll title correctly', () => {
    render(<ScrollCard scroll={mockScroll} />);
    expect(screen.getByText('Test Scroll Title')).toBeInTheDocument();
  });

  it('renders scroll description', () => {
    render(<ScrollCard scroll={mockScroll} />);
    expect(
      screen.getByText('This is a test scroll description for testing purposes.')
    ).toBeInTheDocument();
  });

  it('displays file size', () => {
    render(<ScrollCard scroll={mockScroll} />);
    expect(screen.getByText('1.2 MB')).toBeInTheDocument();
  });

  it('displays category badge', () => {
    render(<ScrollCard scroll={mockScroll} />);
    expect(screen.getByText('Business Strategy')).toBeInTheDocument();
  });

  it('renders download button', () => {
    render(<ScrollCard scroll={mockScroll} />);
    expect(screen.getByRole('button', { name: /download/i })).toBeInTheDocument();
  });

  it('renders details button', () => {
    render(<ScrollCard scroll={mockScroll} />);
    expect(screen.getByRole('button', { name: /details/i })).toBeInTheDocument();
  });

  it('opens PDF in new window when download button is clicked', async () => {
    const user = userEvent.setup();
    render(<ScrollCard scroll={mockScroll} />);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    await user.click(downloadButton);

    expect(global.open).toHaveBeenCalledWith(
      '/scrolls/pdfs/test.pdf',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('renders tags when variant is detailed', () => {
    render(<ScrollCard scroll={mockScroll} variant="detailed" />);
    expect(screen.getByText('testing')).toBeInTheDocument();
    expect(screen.getByText('example')).toBeInTheDocument();
    expect(screen.getByText('mock')).toBeInTheDocument();
  });

  it('does not render tags when variant is compact', () => {
    render(<ScrollCard scroll={mockScroll} variant="compact" />);
    expect(screen.queryByText('testing')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ScrollCard scroll={mockScroll} className="custom-class" />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom-class');
  });

  it('links to correct detail page', () => {
    render(<ScrollCard scroll={mockScroll} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/services/scrolls/test-scroll');
  });
});
