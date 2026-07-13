'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import FxButton from './FxButton';
import styles from './FxNav.module.scss';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface FxNavProps {
  variant?: 'home' | 'subpage';
  backLabel?: string;
  backHref?: string;
  breadcrumb?: (string | BreadcrumbItem)[];
  ctaLabel?: string;
  ctaHref?: string;
}

const BACK_ROUTES: Record<string, { label: string; href: string }> = {
  '/services': { label: '← Back to Home', href: '/' },
  '/blog': { label: '← Back to Home', href: '/' },
  '/contact': { label: '← Back to Home', href: '/' },
  '/about': { label: '← Back to Home', href: '/' },
  '/portfolio': { label: '← Back to Home', href: '/' },
  '/books': { label: '← Back to Home', href: '/' },
  '/videos': { label: '← Back to Home', href: '/' },
  '/case-studies': { label: '← Back to Home', href: '/' },
  '/press-release': { label: '← Back to Home', href: '/' },
  '/github': { label: '← Back to Home', href: '/' },
  '/legal': { label: '← Back to Home', href: '/' },
  '/cue-cards': { label: '← Back to Home', href: '/' },
  '/fluxline-ethos': { label: '← Back to Home', href: '/' },
  '/unsubscribe': { label: '← Back to Home', href: '/' },
};

function resolveBack(pathname: string): { label: string; href: string } {
  if (BACK_ROUTES[pathname]) return BACK_ROUTES[pathname];

  const segments = pathname.split('/').filter(Boolean);

  // Special handling for tag/category/technology pages
  // Routes like /blog/tag/[tag], /portfolio/tag/[tag], etc. should go back to the section root
  if (segments.length >= 3) {
    const filterType = segments[1]; // 'tag', 'category', 'technology'
    if (['tag', 'category', 'technology'].includes(filterType)) {
      const sectionRoot = '/' + segments[0];
      const sectionName = segments[0]
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      return { label: `← Back to ${sectionName}`, href: sectionRoot };
    }
  }

  if (segments.length >= 2) {
    const parentPath = '/' + segments.slice(0, -1).join('/');
    const parentName = segments[segments.length - 2]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { label: `← Back to ${parentName}`, href: parentPath };
  }

  return { label: '← Back to Home', href: '/' };
}

export default function FxNav({
  variant,
  backLabel,
  backHref,
  breadcrumb,
  ctaLabel = 'Book a Consultation',
  ctaHref = '/contact',
}: FxNavProps) {
  const pathname = usePathname();
  const resolvedVariant = variant ?? (pathname === '/' ? 'home' : 'subpage');
  const resolvedBack = resolveBack(pathname);
  const finalBackLabel = backLabel ?? resolvedBack.label;
  const finalBackHref = backHref ?? resolvedBack.href;
  const [hoveredLink, setHoveredLink] = React.useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isNavHidden, setIsNavHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);

  // Scroll hide/show effect
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      // Hide nav when scrolling down and not near the top
      if (
        currentScrollY > 100 &&
        currentScrollY > lastScrollY.current &&
        scrollDelta > 5
      ) {
        setIsNavHidden(true);
      }
      // Show nav when scrolling up or near the top
      else if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsNavHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '/services' },
    { label: 'Our Content', href: '/content' },
    { label: 'Contact', href: '/contact' },
  ];

  const linkStyle = (key: string): React.CSSProperties => ({
    color:
      hoveredLink === key ? 'var(--fx-text-heading)' : 'var(--fx-text-soft)',
    textDecoration: 'none',
    fontSize: 14.5,
    fontWeight: 500,
    transition: 'color .15s',
  });

  const pillHovered = hoveredLink === '__back';
  const backPillStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: `1px solid ${pillHovered ? 'var(--fx-text-soft)' : 'var(--fx-border)'}`,
    borderRadius: 8,
    padding: '8px 14px',
    fontSize: 13.5,
    fontWeight: 600,
    color: pillHovered ? 'var(--fx-text-heading)' : 'var(--fx-text-soft)',
    textDecoration: 'none',
    transition: 'border-color .15s, color .15s',
  };

  return (
    <header
      data-fx-glass=''
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'var(--fx-nav-bg)',
        backdropFilter: 'var(--fx-nav-blur)',
        WebkitBackdropFilter: 'var(--fx-nav-blur)',
        borderBottom: '1px solid var(--fx-border-subtle)',
        transform: isNavHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      <div className={`fx-c fx-nav-gap ${styles.navContainer}`}>
        {resolvedVariant === 'home' ? (
          <>
            <Link
              href='/'
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
              }}
            >
              <img
                src='/favicon.ico'
                alt='Fluxline'
                style={{
                  width: 20,
                  height: 20,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  color: 'var(--fx-text-heading)',
                }}
              >
                Fluxline Resonance Group
                <span
                  className='fx-nav-llc'
                  style={{ color: 'var(--fx-text-soft)', fontWeight: 500 }}
                >
                  , LLC
                </span>
              </span>
            </Link>
            {/* Desktop Navigation */}
            <nav
              className={`fx-navrow ${styles.navRow}`}
              style={{
                gap: 26,
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='fx-navlink'
                  style={linkStyle(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                </Link>
              ))}
              <FxButton size='sm' href={ctaHref}>
                {ctaLabel}
              </FxButton>
            </nav>
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.hamburgerButton}
              aria-label='Toggle menu'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <line x1='3' y1='6' x2='21' y2='6' strokeLinecap='round' />
                <line x1='3' y1='12' x2='21' y2='12' strokeLinecap='round' />
                <line x1='3' y1='18' x2='21' y2='18' strokeLinecap='round' />
              </svg>
            </button>
            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  className={styles.mobileMenuDropdown}
                  initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
                  animate={{ opacity: 1, scaleY: 1, transformOrigin: 'top' }}
                  exit={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={styles.mobileMenuLink}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className={styles.mobileMenuButtonWrapper}>
                    <FxButton
                      size='sm'
                      href={ctaHref}
                      style={{ width: '100%' }}
                    >
                      {ctaLabel}
                    </FxButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            <Link
              href={finalBackHref}
              style={backPillStyle}
              onMouseEnter={() => setHoveredLink('__back')}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {finalBackLabel}
            </Link>
            {/* Desktop Navigation Links (Subpage) */}
            <nav
              className={`fx-navrow ${styles.navRow}`}
              style={{
                gap: 26,
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='fx-navlink'
                  style={linkStyle(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* Mobile Hamburger (Subpage) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.hamburgerButton}
              aria-label='Toggle menu'
            >
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <line x1='3' y1='6' x2='21' y2='6' strokeLinecap='round' />
                <line x1='3' y1='12' x2='21' y2='12' strokeLinecap='round' />
                <line x1='3' y1='18' x2='21' y2='18' strokeLinecap='round' />
              </svg>
            </button>
            {/* Mobile Menu Dropdown (Subpage) */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  className={styles.mobileMenuDropdown}
                  initial={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
                  animate={{ opacity: 1, scaleY: 1, transformOrigin: 'top' }}
                  exit={{ opacity: 0, scaleY: 0, transformOrigin: 'top' }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={styles.mobileMenuLink}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className={styles.mobileMenuButtonWrapper}>
                    <FxButton
                      size='sm'
                      href={ctaHref}
                      style={{ width: '100%' }}
                    >
                      {ctaLabel}
                    </FxButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </header>
  );
}
