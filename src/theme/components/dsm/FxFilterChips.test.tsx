import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FxFilterChips from './FxFilterChips';

jest.mock('../../hooks/useMediaQuery', () => ({
  useIsMobile: jest.fn(),
}));

const mockUseIsMobile = jest.requireMock('../../hooks/useMediaQuery')
  .useIsMobile as jest.MockedFunction<() => boolean>;

const OPTIONS = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

/** Forces the overflow measurement to report content taller than 3 rows. */
function mockOverflowingLayout() {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return 40;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      return 400;
    },
  });
}

function mockNonOverflowingLayout() {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    get() {
      return 40;
    },
  });
  Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
    configurable: true,
    get() {
      return 40;
    },
  });
}

describe('FxFilterChips', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders every option', () => {
    mockNonOverflowingLayout();
    mockUseIsMobile.mockReturnValue(false);
    render(
      <FxFilterChips options={OPTIONS} value="All" onChange={jest.fn()} />
    );
    for (const option of OPTIONS) {
      expect(screen.getByText(option)).toBeInTheDocument();
    }
  });

  it('does not show a toggle link on desktop even when content overflows', () => {
    mockOverflowingLayout();
    mockUseIsMobile.mockReturnValue(false);
    render(
      <FxFilterChips options={OPTIONS} value="All" onChange={jest.fn()} />
    );
    expect(screen.queryByText('Show all')).not.toBeInTheDocument();
  });

  it('does not show a toggle link on mobile when content fits', () => {
    mockNonOverflowingLayout();
    mockUseIsMobile.mockReturnValue(true);
    render(
      <FxFilterChips options={OPTIONS} value="All" onChange={jest.fn()} />
    );
    expect(screen.queryByText('Show all')).not.toBeInTheDocument();
  });

  it('shows "Show all" on mobile when content overflows, and toggles to "Hide all"', () => {
    mockOverflowingLayout();
    mockUseIsMobile.mockReturnValue(true);
    render(
      <FxFilterChips options={OPTIONS} value="All" onChange={jest.fn()} />
    );

    const toggle = screen.getByText('Show all');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(screen.getByText('Hide all')).toBeInTheDocument();
    expect(screen.getByText('Hide all')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('still invokes onChange when a chip is clicked', () => {
    mockNonOverflowingLayout();
    mockUseIsMobile.mockReturnValue(false);
    const onChange = jest.fn();
    render(
      <FxFilterChips options={OPTIONS} value="All" onChange={onChange} />
    );
    fireEvent.click(screen.getByText('B'));
    expect(onChange).toHaveBeenCalledWith('B');
  });
});
