'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './FxNav.module.scss';

export interface FxNavMenuLink {
  label: string;
  href: string;
}

interface FxNavMenuProps {
  label: string;
  links: FxNavMenuLink[];
}

const HOVER_CLOSE_DELAY_MS = 160;

/**
 * Desktop drop-down for a group of nav links: a disclosure button over a
 * plain list of links (not an ARIA menu, so no aria-haspopup). A mouse opens
 * it on hover; a tap or keyboard press toggles it, so it never depends on
 * hover.
 * Escape (focus returns to the button), an outside click, focus leaving the
 * menu, or a route change closes it.
 */
export default function FxNavMenu({ label, links }: FxNavMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const closeTimer = React.useRef<number | undefined>(undefined);
  const pressPointer = React.useRef('');
  const menuId = React.useId();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Hand focus back only if it was in the menu: a hover-opened menu
        // must not pull focus away from wherever the reader was.
        if (wrapRef.current?.contains(document.activeElement)) {
          buttonRef.current?.focus();
        }
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  React.useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    closeTimer.current = window.setTimeout(
      () => setOpen(false),
      HOVER_CLOSE_DELAY_MS
    );
  };
  const onBlur = (e: React.FocusEvent) => {
    if (!wrapRef.current?.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={wrapRef}
      className={styles.menu}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={onBlur}
    >
      <button
        ref={buttonRef}
        type='button'
        className={`fx-navlink ${styles.menuTrigger}`}
        aria-expanded={open}
        aria-controls={menuId}
        onPointerDown={(e) => {
          pressPointer.current = e.pointerType;
        }}
        onKeyDown={() => {
          // A press that began with the mouse but never became a click
          // (dragged off the button) must not make Enter or Space read as
          // a mouse click.
          pressPointer.current = '';
        }}
        onClick={() => {
          // A mouse click lands after hover already opened the menu, so keep
          // it open. Touch and keyboard presses have no preceding hover.
          setOpen((v) => (pressPointer.current === 'mouse' ? true : !v));
          pressPointer.current = '';
        }}
      >
        {label}
        <svg
          className={styles.chevron}
          width='12'
          height='12'
          viewBox='0 0 12 12'
          aria-hidden='true'
        >
          <path
            d='M2.5 4.5L6 8l3.5-3.5'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.6'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      {open && (
        <div id={menuId} className={styles.dropdown}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.dropdownLink}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
