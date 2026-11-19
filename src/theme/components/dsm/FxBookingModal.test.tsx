import { act, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FxBookingModalProvider, FxBookingTrigger } from './FxBookingModal';
import { BOOK_A_CONVERSATION } from './bookingCopy';
import { mount, type Mounted } from '@/test/formHarness';

jest.mock('next/navigation', () => ({ usePathname: jest.fn(() => '/') }));
const mockPathname = usePathname as jest.Mock;

/** The full-screen Book a Conversation dialog (#408, from TW #278). */
let page: Mounted;
afterEach(() => {
  page?.unmount();
  mockPathname.mockReturnValue('/');
  delete (window as { gtag?: unknown }).gtag;
});

const dialog = () => document.querySelector<HTMLElement>('[role="dialog"]');
const trigger = () => page.container.querySelector<HTMLAnchorElement>('a')!;
const press = (key: string) =>
  act(() => {
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true })
    );
  });
const nextFrame = () =>
  act(
    () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
  );

function renderWithProvider() {
  page = mount(
    <FxBookingModalProvider>
      <FxBookingTrigger />
    </FxBookingModalProvider>
  );
}

describe('FxBookingModal (#408)', () => {
  it('opens a labelled, modal dialog with the booking flow and locks the page', async () => {
    renderWithProvider();
    expect(dialog()).toBeNull();
    await page.click(trigger());
    const d = dialog()!;
    expect(d.getAttribute('aria-modal')).toBe('true');
    const title = document.getElementById(d.getAttribute('aria-labelledby')!);
    expect(title?.textContent).toBe(BOOK_A_CONVERSATION.label);
    // The stepper's first step is inside the dialog.
    expect(d.querySelectorAll('button').length).toBeGreaterThan(1);
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(document.documentElement.hasAttribute('data-booking-open')).toBe(
      true
    );
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Close');
  });

  it('closes on Escape and gives focus back to the opener', async () => {
    renderWithProvider();
    trigger().focus();
    await page.click(trigger());
    await press('Escape');
    expect(dialog()).toBeNull();
    expect(document.documentElement.style.overflow).toBe('');
    expect(document.documentElement.hasAttribute('data-booking-open')).toBe(
      false
    );
    await nextFrame();
    expect(document.activeElement).toBe(trigger());
  });

  it('closes with the X and with a tap outside the panel, but not inside it', async () => {
    renderWithProvider();
    await page.click(trigger());
    await page.click(
      document.querySelector<HTMLElement>('[aria-label="Close"]')!
    );
    expect(dialog()).toBeNull();

    await page.click(trigger());
    const panel = dialog()!;
    const overlay = panel.parentElement!;
    Object.defineProperty(overlay, 'clientWidth', { value: 1000 });
    // A press inside the panel never closes it.
    await act(() => {
      panel.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      panel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(dialog()).not.toBeNull();
    // A tap on the dim area does.
    await act(() => {
      overlay.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 10 })
      );
      overlay.dispatchEvent(
        new MouseEvent('click', { bubbles: true, clientX: 10 })
      );
    });
    expect(dialog()).toBeNull();
  });

  it("does not close on a press on the overlay's scrollbar (keeps a filled-in form)", async () => {
    renderWithProvider();
    await page.click(trigger());
    const overlay = dialog()!.parentElement!;
    Object.defineProperty(overlay, 'clientWidth', { value: 1000 });
    await act(() => {
      overlay.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, clientX: 1005 })
      );
      overlay.dispatchEvent(
        new MouseEvent('click', { bubbles: true, clientX: 1005 })
      );
    });
    expect(dialog()).not.toBeNull();
  });

  it('keeps Tab inside the dialog', async () => {
    renderWithProvider();
    await page.click(trigger());
    const items = Array.from(
      dialog()!.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    );
    const last = items[items.length - 1];
    last.focus();
    await act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      );
    });
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Close');
    await act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Tab',
          shiftKey: true,
          bubbles: true,
        })
      );
    });
    expect(document.activeElement).toBe(last);
  });

  it('closes when a link inside the flow is followed', async () => {
    renderWithProvider();
    await page.click(trigger());
    const link = document.createElement('a');
    link.href = '/contact/#note';
    link.addEventListener('click', (e) => e.preventDefault());
    dialog()!.querySelector('div:last-child')!.appendChild(link);
    await act(() => {
      link.click();
    });
    expect(dialog()).toBeNull();
  });

  it('stays open for links that open a new tab (TidyCal, Privacy Policy)', async () => {
    renderWithProvider();
    await page.click(trigger());
    const link = document.createElement('a');
    link.href = 'https://tidycal.com/terencewaters';
    link.target = '_blank';
    link.addEventListener('click', (e) => e.preventDefault());
    dialog()!.querySelector('div:last-child')!.appendChild(link);
    await act(() => {
      link.click();
    });
    expect(dialog()).not.toBeNull();
  });

  it('runs onOpen when it opens the dialog (the mobile menu closes)', async () => {
    const onOpen = jest.fn();
    page = mount(
      <FxBookingModalProvider>
        <FxBookingTrigger onOpen={onOpen} />
      </FxBookingModalProvider>
    );
    await page.click(trigger());
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(dialog()).not.toBeNull();
  });

  it('brings Tab back inside when focus has left the panel (e.g. to <body>)', async () => {
    renderWithProvider();
    await page.click(trigger());
    (document.activeElement as HTMLElement).blur();
    expect(document.activeElement).toBe(document.body);
    await act(() => {
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      );
    });
    expect(dialog()!.contains(document.activeElement)).toBe(true);
  });

  it('closes when the page changes', async () => {
    function Harness() {
      const [, setTick] = useState(0);
      return (
        <FxBookingModalProvider>
          <FxBookingTrigger />
          <button
            type='button'
            id='rerender'
            onClick={() => setTick((t) => t + 1)}
          />
        </FxBookingModalProvider>
      );
    }
    page = mount(<Harness />);
    await page.click(trigger());
    expect(dialog()).not.toBeNull();
    mockPathname.mockReturnValue('/services/');
    await page.click('#rerender');
    expect(dialog()).toBeNull();
  });

  it('returns focus to returnFocusRef when the trigger is gone (mobile menu)', async () => {
    function Menu() {
      const menuButton = useRef<HTMLButtonElement>(null);
      const [menuOpen, setMenuOpen] = useState(true);
      return (
        <FxBookingModalProvider>
          <button type='button' ref={menuButton} id='menu-button' />
          {menuOpen ? (
            <FxBookingTrigger
              returnFocusRef={menuButton}
              onOpen={() => setMenuOpen(false)}
            />
          ) : null}
        </FxBookingModalProvider>
      );
    }
    page = mount(<Menu />);
    await page.click(trigger());
    expect(page.container.querySelector('a')).toBeNull();
    await press('Escape');
    await nextFrame();
    expect(document.activeElement?.id).toBe('menu-button');
  });

  it('marks the trigger as opening a dialog and fires the GA open event', async () => {
    const gtag = jest.fn();
    (window as { gtag?: unknown }).gtag = gtag;
    renderWithProvider();
    expect(trigger().getAttribute('aria-haspopup')).toBe('dialog');
    await page.click(trigger());
    expect(gtag).toHaveBeenCalledWith(
      'event',
      'consultation_stepper_opened',
      undefined
    );
  });

  it('is a plain link outside the provider (no JavaScript fallback)', async () => {
    page = mount(<FxBookingTrigger />);
    const link = trigger();
    expect(link.getAttribute('href')).toBe(BOOK_A_CONVERSATION.href);
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    await act(() => {
      link.dispatchEvent(click);
    });
    expect(click.defaultPrevented).toBe(false);
    expect(link.hasAttribute('aria-haspopup')).toBe(false);
    expect(dialog()).toBeNull();
  });
});
