import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
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
      <FxFilterChips options={OPTIONS} value='All' onChange={jest.fn()} />
    );
    for (const option of OPTIONS) {
      expect(screen.getByText(option)).toBeInTheDocument();
    }
  });

  it('truncates on desktop too when content overflows (two rows by default)', () => {
    mockOverflowingLayout();
    mockUseIsMobile.mockReturnValue(false);
    const { container } = render(
      <FxFilterChips options={OPTIONS} value='All' onChange={jest.fn()} />
    );
    expect(screen.getByText('Show all')).toBeInTheDocument();
    // Two 40px rows (jsdom reports a row gap of 0).
    const row = container.firstElementChild!.firstElementChild as HTMLElement;
    expect(row.style.maxHeight).toBe('80px');
  });

  it('does not show a toggle link on desktop when content fits', () => {
    mockNonOverflowingLayout();
    mockUseIsMobile.mockReturnValue(false);
    render(
      <FxFilterChips options={OPTIONS} value='All' onChange={jest.fn()} />
    );
    expect(screen.queryByText('Show all')).not.toBeInTheDocument();
  });

  it('does not show a toggle link on mobile when content fits', () => {
    mockNonOverflowingLayout();
    mockUseIsMobile.mockReturnValue(true);
    render(
      <FxFilterChips options={OPTIONS} value='All' onChange={jest.fn()} />
    );
    expect(screen.queryByText('Show all')).not.toBeInTheDocument();
  });

  it('shows "Show all" on mobile when content overflows, and toggles to "Hide all"', () => {
    mockOverflowingLayout();
    mockUseIsMobile.mockReturnValue(true);
    render(
      <FxFilterChips options={OPTIONS} value='All' onChange={jest.fn()} />
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
    render(<FxFilterChips options={OPTIONS} value='All' onChange={onChange} />);
    fireEvent.click(screen.getByText('B'));
    expect(onChange).toHaveBeenCalledWith('B');
  });

  it('clips to three rows on phones and to a custom maxLines elsewhere', () => {
    mockOverflowingLayout();
    mockUseIsMobile.mockReturnValue(true);
    const phone = render(
      <FxFilterChips options={OPTIONS} value='All' onChange={jest.fn()} />
    );
    const phoneRow = phone.container.firstElementChild!
      .firstElementChild as HTMLElement;
    expect(phoneRow.style.maxHeight).toBe('120px');
    phone.unmount();

    mockUseIsMobile.mockReturnValue(false);
    const wide = render(
      <FxFilterChips
        options={OPTIONS}
        value='All'
        onChange={jest.fn()}
        maxLines={1}
      />
    );
    const wideRow = wide.container.firstElementChild!
      .firstElementChild as HTMLElement;
    expect(wideRow.style.maxHeight).toBe('40px');
  });

  describe('with chips laid out in rows', () => {
    /** Each chip's top: 40px per row, three chips per row. */
    beforeEach(() => {
      mockOverflowingLayout();
      mockUseIsMobile.mockReturnValue(false);
      jest
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockImplementation(function (this: HTMLElement) {
          const i = OPTIONS.indexOf(this.textContent ?? '');
          const top = i < 0 ? 0 : Math.floor(i / 3) * 40;
          return {
            top,
            left: 0,
            right: 0,
            bottom: top + 40,
            width: 0,
            height: 40,
            x: 0,
            y: top,
            toJSON: () => ({}),
          } as DOMRect;
        });
    });

    it('opens when keyboard focus lands on a clipped chip', () => {
      const { container } = render(
        <FxFilterChips options={OPTIONS} value='All' onChange={jest.fn()} />
      );
      const row = container.firstElementChild!.firstElementChild as HTMLElement;
      expect(row.style.maxHeight).toBe('80px');
      act(() => {
        screen.getByText('H').focus();
      });
      expect(row.style.maxHeight).toBe('');
      expect(screen.getByText('Hide all')).toBeInTheDocument();
    });

    it('stays open while the selected chip is in a clipped row', () => {
      const { container } = render(
        <FxFilterChips options={OPTIONS} value='H' onChange={jest.fn()} />
      );
      const row = container.firstElementChild!.firstElementChild as HTMLElement;
      expect(row.style.maxHeight).toBe('');
      expect(screen.queryByText('Show all')).not.toBeInTheDocument();
    });
  });
});
