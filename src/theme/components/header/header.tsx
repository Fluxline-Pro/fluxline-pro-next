'use client';

/**
 * Header Component
 * Main navigation header for the application
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { NavigationMenu } from './navigation-menu';
import { NavigationButton } from './navigation-button';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { Typography } from '@/theme/components/typography';
import { SettingsPanel } from '@/theme/components/settings-panel';
import { FormButton } from '@/theme/components/form';
import { useRouter } from 'next/navigation';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [activeModal, setActiveModal] = React.useState<
    'menu' | 'settings' | null
  >(null);
  const [isViewTransitioning, setIsViewTransitioning] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const { theme, themeMode, setThemeMode, layoutPreference } = useAppTheme();
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const isLeftHanded = layoutPreference === 'left-handed';

  // Ensure component is mounted before rendering dynamic content
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate modal width based on device
  const modalMaxWidth = isMobile ? '350px' : '400px';

  // Generate breadcrumb items from pathname
  const breadcrumbItems: BreadcrumbItem[] = React.useMemo(() => {
    const paths = pathname.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      // Capitalize and format the path
      const label = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      crumbs.push({
        label,
        href: currentPath,
      });
    });

    return crumbs;
  }, [pathname]);

  // Get current page title (last breadcrumb item)
  const currentPageTitle =
    breadcrumbItems[breadcrumbItems.length - 1]?.label || 'Home';

  const handleSettingsClick = () => {
    if (activeModal === 'settings') {
      setActiveModal(null);
    } else if (activeModal === 'menu') {
      setIsViewTransitioning(true);
      setTimeout(() => {
        setActiveModal('settings');
        setIsViewTransitioning(false);
      }, 300);
    } else {
      setActiveModal('settings');
    }
  };

  const handleMenuClick = () => {
    if (activeModal === 'menu') {
      setActiveModal(null);
    } else if (activeModal === 'settings') {
      setIsViewTransitioning(true);
      setTimeout(() => {
        setActiveModal('menu');
        setIsViewTransitioning(false);
      }, 300);
    } else {
      setActiveModal('menu');
    }
  };

  const handleThemeClick = () => {
    if (themeMode !== 'light' && themeMode !== 'dark') return;
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  // Detect if we're on the home page
  const isHomePage = pathname === '/';

  // Use white color for buttons on home page for better visibility against dark background
  const buttonIconColor = isHomePage
    ? theme.palette.white
    : theme.palette.neutralPrimary;
  const { shouldReduceMotion } = useReducedMotion();

  // Modal ref for focus management
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Handle Escape key to close modal
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModal) {
        handleModalClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeModal]);

  // Focus management for modal
  React.useEffect(() => {
    if (activeModal && modalRef.current) {
      // Save current focus to restore later
      const previousFocus = document.activeElement as HTMLElement;
      modalRef.current.focus();

      return () => {
        previousFocus?.focus();
      };
    }
  }, [activeModal]);

  // Animation variants for modal slide
  const modalVariants: Variants = {
    hidden: {
      x: isLeftHanded ? '-100%' : '100%',
      opacity: shouldReduceMotion ? 1 : 0,
    },
    visible: {
      x: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.3,
        ease: [0.4, 0.0, 0.2, 1.0], // Custom cubic-bezier equivalent to easeOut
      },
    },
    exit: {
      x: isLeftHanded ? '-100%' : '100%',
      opacity: shouldReduceMotion ? 1 : 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.25,
        ease: [0.4, 0.0, 1.0, 1.0], // Custom cubic-bezier equivalent to easeIn
      },
    },
  };

  // Backdrop variants for fade effect
  const backdropVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <div className={className}>
      {/* Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: theme.isInverted
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.palette.neutralQuaternary}`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isLeftHanded ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            maxWidth: '1920px',
            margin: '0 auto',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Mobile: Show page title */}
            {isMobile ? (
              <Typography
                variant='h3'
                style={{
                  color: isHomePage
                    ? theme.palette.white
                    : theme.palette.themePrimary,
                  fontSize: '1.5rem',
                  fontWeight: theme.typography.fontWeights.bold,
                  fontFamily: theme.typography.fonts.h3.fontFamily,
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {isHomePage ? 'Fluxline' : currentPageTitle}
              </Typography>
            ) : (
              /* Desktop: Show breadcrumb navigation */
              <nav aria-label='Breadcrumb'>
                {isHomePage ? (
                  <Typography
                    variant='h3'
                    style={{
                      color: theme.palette.white,
                      fontSize: '1.5rem',
                      fontWeight: theme.typography.fontWeights.bold,
                      fontFamily: theme.typography.fonts.h2.fontFamily,
                      margin: 0,
                    }}
                  >
                    Fluxline Resonance Group, LLC
                  </Typography>
                ) : (
                  <ol
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: isLeftHanded ? 'flex-end' : 'flex-start',
                      gap: '0.5rem',
                      flexWrap: 'wrap',
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                    }}
                  >
                    {breadcrumbItems.map((item, index) => {
                      const isLast = index === breadcrumbItems.length - 1;
                      const isFirst = index === 0;

                      return (
                        <li
                          key={item.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}
                        >
                          {index > 0 && (
                            <FluentIcon
                              iconName='ChevronRight'
                              size='xSmall'
                              color={theme.palette.neutralTertiary}
                            />
                          )}

                          {isLast ? (
                            <Typography
                              variant='p'
                              style={{
                                color: theme.palette.neutralPrimary,
                                fontSize: '1.125rem',
                                fontWeight:
                                  theme.typography.fontWeights.semiBold,
                                margin: 0,
                              }}
                              aria-current='page'
                            >
                              {item.label}
                            </Typography>
                          ) : (
                            <Link
                              href={item.href}
                              style={{
                                color: isFirst
                                  ? theme.palette.themePrimary
                                  : theme.palette.neutralSecondary,
                                fontSize: isFirst ? '1.25rem' : '1.125rem',
                                fontWeight: isFirst
                                  ? theme.typography.fontWeights.bold
                                  : theme.typography.fontWeights.regular,
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color =
                                  theme.palette.themePrimary;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = isFirst
                                  ? theme.palette.themePrimary
                                  : theme.palette.neutralSecondary;
                              }}
                            >
                              {item.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                )}
              </nav>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: isLeftHanded ? 'row-reverse' : 'row',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {!isMobile && !isHomePage && (
              <FormButton
                variant='primary'
                size='medium'
                onClick={() => router.push('/contact')}
                icon='Calendar'
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                Book a Consultation
              </FormButton>
            )}
            {!isHomePage && (
              <NavigationButton
                onClick={handleThemeClick}
                iconName={themeMode === 'dark' ? 'ClearNight' : 'Sunny'}
                color={buttonIconColor}
                ariaLabel='Toggle theme'
                tooltipText={themeMode === 'dark' ? 'Dark Mode' : 'Light Mode'}
                hoverScale={1.05}
              />
            )}
            <NavigationButton
              onClick={handleSettingsClick}
              iconName={activeModal === 'settings' ? 'Cancel' : 'Settings'}
              color={buttonIconColor}
              ariaLabel='Open settings'
              tooltipText='Settings'
              hoverScale={1.05}
            />
            <NavigationButton
              onClick={handleMenuClick}
              iconName={activeModal === 'menu' ? 'Cancel' : 'GlobalNavButton'}
              color={buttonIconColor}
              ariaLabel='Open menu'
              tooltipText='Menu'
              hoverScale={1.15}
            />
          </div>
        </div>
      </nav>

      {/* Modal */}
      <AnimatePresence mode='wait'>
        {isMounted && activeModal && (
          <motion.div
            variants={backdropVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
            }}
            onClick={handleModalClose}
          >
            <motion.div
              ref={modalRef}
              tabIndex={-1}
              variants={modalVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              style={{
                background:
                  themeMode === 'dark' || themeMode === 'grayscale-dark'
                    ? theme.gradients?.components?.modal?.dark ||
                      theme.palette.themeDark
                    : theme.gradients?.components?.modal?.light ||
                      theme.palette.white,
                height: '100%',
                width: '100%',
                maxWidth: modalMaxWidth,
                marginLeft: isLeftHanded ? 0 : 'auto',
                marginRight: isLeftHanded ? 'auto' : 0,
                boxShadow: theme.shadows.xl,
                position: 'relative',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleModalClose}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  // isLeftHanded mode or the active modal is settings which always has
                  // its close button on the right side
                  [isLeftHanded || activeModal === 'settings'
                    ? 'right'
                    : 'left']: '1rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: isMobile ? '0.75rem' : '1.5rem',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.2s ease, transform 0.2s ease',
                  transform: 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                  e.currentTarget.style.transform = 'scale(1.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                aria-label='Close menu'
              >
                <FluentIcon
                  iconName='Cancel'
                  size='large'
                  color={theme.semanticColors.errorIcon}
                />
              </button>
              <div
                style={{
                  opacity: isViewTransitioning ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out',
                  height: '100%',
                }}
              >
                {activeModal === 'menu' && (
                  <NavigationMenu onClose={handleModalClose} />
                )}
                {activeModal === 'settings' && (
                  <SettingsPanel onClose={handleModalClose} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
