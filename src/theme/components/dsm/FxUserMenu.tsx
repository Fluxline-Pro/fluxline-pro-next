'use client';

import React from 'react';
import { useAuth, getInitials } from '@/lib/auth';
import { getAccountPortalUrl } from '@/lib/integrations/config';
import styles from './FxNav.module.scss';

/** Neutral avatar-circle glyph (inline SVG — no icon fonts per DSM rules). */
function AvatarGlyph() {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.6'
      aria-hidden='true'
      focusable='false'
    >
      <circle cx='12' cy='12' r='10' />
      <circle cx='12' cy='9.5' r='3.2' />
      <path d='M5.5 19a7.5 7.5 0 0 1 13 0' strokeLinecap='round' />
    </svg>
  );
}

/**
 * Header sign-in / user-avatar control.
 *
 * Signed out: "Sign in" link navigating to the Fluxline Account Portal.
 * Signed in: initials circle opening a menu with "My Account" and "Sign out".
 * Keyboard accessible; closes on outside click and Escape.
 */
export default function FxUserMenu() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const firstItemRef = React.useRef<HTMLAnchorElement>(null);

  // Close on outside click / Escape
  React.useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  // Move focus into the menu when it opens
  React.useEffect(() => {
    if (menuOpen) firstItemRef.current?.focus();
  }, [menuOpen]);

  // Neutral placeholder while the cookie hint is read on first render.
  if (isLoading && !isAuthenticated) {
    return (
      <div className={styles.userMenu} aria-hidden='true'>
        <span className={styles.userAvatarPlaceholder} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.userMenu}>
        <a
          href={`${getAccountPortalUrl()}/login`}
          className={styles.signInButton}
          aria-label='Sign in to your Fluxline account'
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            color: hovered ? 'var(--fx-text-heading)' : 'var(--fx-text-soft)',
            borderColor: hovered ? 'var(--fx-text-soft)' : 'var(--fx-border)',
          }}
        >
          <AvatarGlyph />
          <span className={styles.signInLabel}>Sign in</span>
        </a>
      </div>
    );
  }

  const initials = getInitials(user?.name, user?.email);
  const menuId = 'fx-user-menu-popup';

  return (
    <div className={styles.userMenu} ref={containerRef}>
      <button
        type='button'
        ref={triggerRef}
        className={styles.userAvatarButton}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={
          user?.name ? `Account menu for ${user.name}` : 'Account menu'
        }
        aria-haspopup='true'
        aria-expanded={menuOpen}
        aria-controls={menuOpen ? menuId : undefined}
      >
        {initials}
      </button>
      {menuOpen && (
        <div
          id={menuId}
          role='group'
          aria-label='Account'
          className={styles.userMenuPopup}
        >
          {(user?.name || user?.email) && (
            <div className={styles.userMenuIdentity} role='presentation'>
              {user?.name && (
                <span className={styles.userMenuName}>{user.name}</span>
              )}
              {user?.email && (
                <span className={styles.userMenuEmail}>{user.email}</span>
              )}
            </div>
          )}
          <a
            href={getAccountPortalUrl()}
            ref={firstItemRef}
            className={styles.userMenuItem}
            onClick={() => setMenuOpen(false)}
          >
            My Account
          </a>
          <button
            type='button'
            className={styles.userMenuItem}
            onClick={() => {
              setMenuOpen(false);
              void logout();
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
