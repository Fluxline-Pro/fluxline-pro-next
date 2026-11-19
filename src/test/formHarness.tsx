import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import type { ReactElement } from 'react';

/**
 * A tiny harness for form tests in jsdom, ported from terencewaters.com with
 * the booking tests (#408): mount, type into React-controlled fields, submit.
 */
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

export interface Mounted {
  container: HTMLDivElement;
  type: (selector: string, value: string) => void;
  submit: () => Promise<void>;
  /** Pick an option in a <select> (React listens for "change" there). */
  choose: (selector: string, value: string) => void;
  /** Click an element (checkbox, radio, button) and let React settle. */
  click: (selector: string | Element) => Promise<void>;
  unmount: () => void;
}

export function mount(element: ReactElement): Mounted {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root: Root = createRoot(container);
  act(() => root.render(element));

  return {
    container,
    type(selector, value) {
      const el = container.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector)!;
      Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value')!.set!.call(el, value);
      act(() => {
        el.dispatchEvent(new Event('input', { bubbles: true }));
      });
    },
    choose(selector, value) {
      const el = container.querySelector<HTMLSelectElement>(selector)!;
      Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')!.set!.call(el, value);
      act(() => {
        el.dispatchEvent(new Event('change', { bubbles: true }));
      });
    },
    async click(target) {
      const el =
        typeof target === 'string'
          ? container.querySelector<HTMLElement>(target)!
          : (target as HTMLElement);
      await act(async () => {
        el.click();
      });
    },
    async submit() {
      await act(async () => {
        container
          .querySelector('form')!
          .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      });
    },
    unmount() {
      act(() => root.unmount());
      container.remove();
    },
  };
}

/**
 * A minimal fetch Response with a JSON body (jest's jsdom has no Response).
 */
export const json = (status: number, body: unknown) =>
  ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }) as unknown as Response;
