import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CueCard, CueCardData } from './cue-card';

// Mock the useAppTheme hook
jest.mock('../../hooks/useAppTheme', () => ({
  useAppTheme: () => ({
    theme: {
      palette: {
        themePrimary: '#0078d4',
        themeDark: '#005a9e',
        neutralPrimary: '#323130',
        neutralSecondary: '#605e5c',
        neutralLight: '#eaeaea',
      },
      fonts: {
        small: { fontSize: '12px', fontFamily: 'Inter' },
        medium: { fontSize: '14px', fontFamily: 'Inter' },
        large: { fontSize: '18px', fontFamily: 'Inter', fontWeight: 600 },
        xLarge: { fontSize: '24px', fontFamily: 'Inter', fontWeight: 700 },
      },
      spacing: {
        xs: '4px',
        s: '8px',
        m: '16px',
        l: '24px',
      },
      borderRadius: {
        s: '4px',
        m: '8px',
      },
    },
  }),
}));

// Mock Card component
jest.mock('../card/card', () => ({
  Card: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <div data-testid="mock-card" onClick={onClick}>
      {children}
    </div>
  ),
}));

const mockCueCardData: CueCardData = {
  id: 'test-card',
  icon: '🏋️',
  title: 'The Rebuilder',
  mantra: 'I rise stronger through structure.',
  action: 'Begin 4-week PT on-ramp',
  overlay: 'This client honors repetition and mythic milestones.',
  link: '/services/personal-training',
  linkText: 'Start Your Journey',
  tags: ['strength', 'discipline'],
};

describe('CueCard', () => {
  it('renders without crashing', () => {
    render(<CueCard data={mockCueCardData} />);
  });

  it('renders title correctly', () => {
    render(<CueCard data={mockCueCardData} />);
    expect(screen.getByText('The Rebuilder')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<CueCard data={mockCueCardData} />);
    expect(screen.getByText('🏋️')).toBeInTheDocument();
  });

  it('renders mantra with quotes', () => {
    render(<CueCard data={mockCueCardData} />);
    expect(
      screen.getByText(/I rise stronger through structure/i)
    ).toBeInTheDocument();
  });

  it('renders action prompt', () => {
    render(<CueCard data={mockCueCardData} />);
    expect(screen.getByText('Begin 4-week PT on-ramp')).toBeInTheDocument();
  });

  it('renders overlay description', () => {
    render(<CueCard data={mockCueCardData} />);
    expect(
      screen.getByText(/This client honors repetition and mythic milestones/i)
    ).toBeInTheDocument();
  });

  it('renders link when provided', () => {
    render(<CueCard data={mockCueCardData} />);
    const link = screen.getByText('Start Your Journey');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute(
      'href',
      '/services/personal-training'
    );
  });

  it('renders tags when provided', () => {
    render(<CueCard data={mockCueCardData} />);
    expect(screen.getByText('strength')).toBeInTheDocument();
    expect(screen.getByText('discipline')).toBeInTheDocument();
  });

  it('renders without icon when not provided', () => {
    const dataWithoutIcon = { ...mockCueCardData, icon: undefined };
    render(<CueCard data={dataWithoutIcon} />);
    expect(screen.queryByText('🏋️')).not.toBeInTheDocument();
  });

  it('renders without link when not provided', () => {
    const dataWithoutLink = { ...mockCueCardData, link: undefined };
    render(<CueCard data={dataWithoutLink} />);
    expect(screen.queryByText('Start Your Journey')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <CueCard data={mockCueCardData} className='custom-class' />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with default linkText when link provided without linkText', () => {
    const dataWithDefaultLinkText = {
      ...mockCueCardData,
      linkText: undefined,
    };
    render(<CueCard data={dataWithDefaultLinkText} />);
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });
});
