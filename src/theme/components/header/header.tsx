'use client';

/**
 * Header Component
 * Main navigation header for the application
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [activeModal, setActiveModal] = React.useState<'menu' | 'settings' | null>(null);
  const [isViewTransitioning, setIsViewTransitioning] = React.useState(false);
  const { themeMode, setThemeMode } = useAppTheme();
  const pathname = usePathname();
  const orientation = useDeviceOrientation();
  const isMobileLandscape = orientation === 'mobile-landscape';

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
      {/* Navigation Bar - Placeholder for now */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-white font-bold">Fluxline</div>
          <div className="flex gap-4">
            <button
              onClick={handleMenuClick}
              className="text-white hover:text-gray-300"
              aria-label="Open menu"
            >
              Menu
            </button>
            <button
              onClick={handleThemeClick}
              className="text-white hover:text-gray-300"
              aria-label="Toggle theme"
            >
              Theme
            </button>
            <button
              onClick={handleSettingsClick}
              className="text-white hover:text-gray-300"
              aria-label="Open settings"
            >
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Modal - Placeholder for now */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 h-full w-full md:w-96 ml-auto p-6">
            <button
              onClick={handleModalClose}
              className="text-white mb-4"
              aria-label="Close modal"
            >
              Close
            </button>
            <div style={{ opacity: isViewTransitioning ? 0 : 1 }}>
              {activeModal === 'menu' && <div className="text-white">Menu Content</div>}
              {activeModal === 'settings' && <div className="text-white">Settings Content</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
