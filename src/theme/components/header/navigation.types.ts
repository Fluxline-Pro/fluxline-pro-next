/**
 * Navigation Types
 * Type definitions for the navigation system
 */

export interface NavItem {
  label: string;
  path: string;
  view: string;
  iconName: string;
  description?: string;
  children?: NavItem[];
}

export interface NavigationProps {
  onClose: () => void;
}

export interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMobileLandscape?: boolean;
  children: React.ReactNode;
}

export interface NavigationButtonsProps {
  onSettingsClick: () => void;
  onMenuClick: () => void;
  onThemeClick: () => void;
  isMenuOpen?: boolean;
  isSettingsOpen?: boolean;
}

export interface NavigationBarProps {
  onSettingsClick: () => void;
  onMenuClick: () => void;
  onThemeClick: () => void;
  isMenuOpen?: boolean;
  isSettingsOpen?: boolean;
  isPdfModalOpen?: boolean;
}
