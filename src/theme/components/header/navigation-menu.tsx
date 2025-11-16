'use client';

/**
 * NavigationMenu Component
 * Main navigation menu with menu items
 */

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import { Typography } from '@/theme/components/typography';
import { NavigationItem } from './navigation-item';
import { navItems } from './navigation.config';
import type { NavigationProps } from './navigation.types';

export const NavigationMenu: React.FC<NavigationProps> = ({ onClose }) => {
  const { theme, layoutPreference } = useAppTheme();
  const isLeftHanded = layoutPreference === 'left-handed';
  const isMobile = useIsMobile();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  const getHoverProps = (key: string) => ({
    onMouseEnter: () => setHoveredItem(key),
    onMouseLeave: () => setHoveredItem(null),
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        color: theme.palette.neutralPrimary,
      }}
    >
      {/* Menu Title */}
      <div
        style={{
          padding: isMobile ? '1.5rem' : '2rem',
          borderBottom: `1px solid ${theme.palette.neutralQuaternary}`,
        }}
      >
        <Typography
          variant='h2'
          style={{
            color: theme.palette.themePrimary,
            fontSize: isMobile
              ? 'clamp(2rem, 6vw, 3rem)'
              : 'clamp(1.5rem, 4vw, 2.5rem)',
            textAlign: isLeftHanded ? 'left' : 'right',
          }}
        >
          Menu
        </Typography>
      </div>

      {/* Menu Items */}
      <div
        style={{
          flex: '1 1 auto',
          overflowY: 'auto',
          padding: isMobile ? '1.5rem' : '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: isLeftHanded ? 'flex-start' : 'flex-end',
            gap: 'clamp(0.5rem, 0.5vh, 1rem)',
          }}
        >
          {navItems.map((item) => (
            <NavigationItem
              key={item.path}
              route={item}
              isHovered={hoveredItem === item.path}
              getHoverProps={getHoverProps}
              onClick={() => handleNavigation(item.path)}
            />
          ))}
        </div>
      </div>

      {/* Social Links Section - Placeholder */}
      <div
        style={{
          padding: isMobile ? '1.5rem' : '2rem',
          borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
        }}
      >
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontSize: '0.875rem',
            textAlign: 'center',
          }}
        >
          &copy; 2025 Fluxline Professional Services
        </Typography>
      </div>
    </div>
  );
};

export default NavigationMenu;
