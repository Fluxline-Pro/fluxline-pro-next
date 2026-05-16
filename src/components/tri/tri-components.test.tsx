import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TRILayout } from './TRILayout';
import { SectionHeader } from './SectionHeader';
import { HeroWithFilters } from './HeroWithFilters';
import { FilteredContentList } from './FilteredContentList';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('../../theme/hooks/useAppTheme', () => ({
  useAppTheme: () => ({
    theme: {
      spacing: {
        s2: '0.125rem',
        s: '0.75rem',
        m: '1rem',
        l: '1.5rem',
        xl: '2rem',
        xxl: '2.5rem',
        xxxl: '3rem',
      },
      palette: {
        neutralPrimary: '#111',
        neutralSecondary: '#555',
        neutralQuaternary: '#ccc',
        neutralQuaternaryAlt: '#ddd',
        themePrimary: '#0066ff',
        white: '#fff',
      },
      borderRadius: {
        container: {
          small: '4px',
          medium: '8px',
        },
      },
      typography: {
        fonts: {
          h1: { fontFamily: 'Inter', fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 },
          h2: { fontFamily: 'Inter', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 },
          h3: { fontFamily: 'Inter', fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
          body: { fontFamily: 'Inter', fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
          bodySmall: {
            fontFamily: 'Inter',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.5,
          },
          label: { fontFamily: 'Inter', fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.4 },
          quote: { fontFamily: 'Inter', fontSize: '1rem', fontWeight: 400, lineHeight: 1.6 },
          pre: { fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.4 },
          code: {
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.4,
          },
        },
        lineHeights: {
          relaxed: '1.6',
        },
      },
    },
  }),
}));

jest.mock('../../app/blog/lib/blogLoader', () => ({
  getFilteredBlogPosts: jest.fn(() => [
    {
      slug: 'tri-post-1',
      title: 'TRI Foundations',
      excerpt: 'Foundational resonant identity article.',
      tags: ['Foundations', 'Resonant Identity'],
      publishedDate: new Date('2026-01-01'),
    },
    {
      slug: 'tri-post-2',
      title: 'Identity Challenge',
      excerpt: 'A practical challenge entry.',
      tags: ['Identity Challenge'],
      publishedDate: new Date('2026-01-02'),
    },
  ]),
}));

describe('TRI scaffolding components', () => {
  it('renders the TRI layout container', () => {
    render(
      <TRILayout>
        <div>Child content</div>
      </TRILayout>
    );

    expect(screen.getByTestId('tri-layout')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('renders section header title, subtitle, and CTA', () => {
    render(
      <SectionHeader
        title='Section Title'
        subtitle='Section subtitle'
        cta={<button type='button'>Learn More</button>}
      />
    );

    expect(screen.getByText('Section Title')).toBeInTheDocument();
    expect(screen.getByText('Section subtitle')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument();
  });

  it('supports tag and date filters in HeroWithFilters', () => {
    const onToggleTag = jest.fn();
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();

    render(
      <HeroWithFilters
        title='TRI Library'
        subtitle='Browse TRI content.'
        availableTags={['Foundations']}
        selectedTags={[]}
        onToggleTag={onToggleTag}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Foundations' }));
    expect(onToggleTag).toHaveBeenCalledWith('Foundations');

    fireEvent.change(screen.getByLabelText('Date From'), {
      target: { value: '2026-01-01' },
    });
    expect(onStartDateChange).toHaveBeenCalledWith('2026-01-01');

    fireEvent.change(screen.getByLabelText('Date To'), {
      target: { value: '2026-01-31' },
    });
    expect(onEndDateChange).toHaveBeenCalledWith('2026-01-31');
  });

  it('auto-populates and renders markdown-backed filtered content', () => {
    render(<FilteredContentList category='Resonant Identity' limit={2} />);

    expect(screen.getByTestId('tri-filtered-content-list')).toBeInTheDocument();
    expect(screen.getByText('TRI Foundations')).toBeInTheDocument();
    expect(screen.getByText('Identity Challenge')).toBeInTheDocument();
  });
});
