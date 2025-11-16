'use client';

/**
 * Header Component
 * Main navigation header for the application
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { NavigationMenu } from './navigation-menu';
import { NavigationButton } from './navigation-button';
import { FluentIcon } from '@/theme/components/fluent-icon';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [activeModal, setActiveModal] = React.useState<
    'menu' | 'settings' | null
  >(null);
  const [isViewTransitioning, setIsViewTransitioning] = React.useState(false);
  const { theme, themeMode, setThemeMode, layoutPreference } = useAppTheme();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isLeftHanded = layoutPreference === 'left-handed';

  // Calculate modal width based on device
  const modalMaxWidth = isMobile ? '350px' : '400px';

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

  // Motion settings
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
          <div
            style={{
              color: theme.palette.themePrimary,
              fontSize: '1.5rem',
              fontWeight: theme.typography.fontWeights.bold,
            }}
          >
            Fluxline
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: isLeftHanded ? 'row-reverse' : 'row',
              gap: '1rem',
            }}
          >
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
        {activeModal && (
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
                  [isLeftHanded ? 'right' : 'left']: '1rem',
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
                  <div
                    style={{
                      padding: '2rem',
                      color: theme.palette.neutralPrimary,
                    }}
                  >
                    <h2>Settings</h2>
                    <p>Settings content will be added here</p>
                  </div>
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
