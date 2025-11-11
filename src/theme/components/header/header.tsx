'use client';

/**
 * Header Component
 * Main navigation header for the application
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { NavigationMenu } from './navigation-menu';
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
  const orientation = useDeviceOrientation();
  const isMobileLandscape = orientation === 'mobile-landscape';
  const isLeftHanded = layoutPreference === 'left-handed';

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
            <button
              onClick={handleMenuClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label='Open menu'
            >
              <FluentIcon
                iconName={activeModal === 'menu' ? 'Cancel' : 'GlobalNavButton'}
                size='medium'
                color={theme.palette.neutralPrimary}
              />
            </button>
            <button
              onClick={handleThemeClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label='Toggle theme'
            >
              <FluentIcon
                iconName={themeMode === 'dark' ? 'Sunny' : 'ClearNight'}
                size='medium'
                color={theme.palette.neutralPrimary}
              />
            </button>
            <button
              onClick={handleSettingsClick}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label='Open settings'
            >
              <FluentIcon
                iconName={activeModal === 'settings' ? 'Cancel' : 'Settings'}
                size='medium'
                color={theme.palette.neutralPrimary}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {activeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={handleModalClose}
        >
          <div
            style={{
              background:
                themeMode === 'dark' || themeMode === 'grayscale-dark'
                  ? theme.gradients?.components?.modal?.dark ||
                    theme.palette.themeDark
                  : theme.gradients?.components?.modal?.light ||
                    theme.palette.white,
              height: '100%',
              width: '100%',
              maxWidth: '400px',
              marginLeft: isLeftHanded ? 0 : 'auto',
              marginRight: isLeftHanded ? 'auto' : 0,
              boxShadow: theme.shadows.xl,
            }}
            onClick={(e) => e.stopPropagation()}
          >
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
