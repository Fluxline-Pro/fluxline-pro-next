'use client';

/**
 * NavigationMenu Component
 * Main navigation menu with menu items
 */

import React from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile, useIsMobileLandscape } from '@/theme/hooks/useMediaQuery';
import { useReducedMotion } from '@/theme/hooks/useReducedMotion';
import { Typography } from '@/theme/components/typography';
import { NavigationItem } from './navigation-item';
import { navItems } from './navigation.config';
import type { NavigationProps } from './navigation.types';
import { SocialLinks } from './social-links';

export const NavigationMenu: React.FC<NavigationProps> = ({ onClose }) => {
  const { theme, layoutPreference } = useAppTheme();
  const isLeftHanded = layoutPreference === 'left-handed';
  const isMobile = useIsMobile();
  const isMobileLandscape = useIsMobileLandscape();
  const { shouldReduceMotion } = useReducedMotion();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set()
  );

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleToggleExpand = (path: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
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
          padding: isMobileLandscape
            ? '0.75rem 1rem'
            : isMobile
              ? '1.5rem'
              : '1rem 2rem',
          borderBottom: `1px solid ${theme.palette.neutralQuaternary}`,
        }}
      >
        <Typography
          variant='h2'
          style={{
            color: theme.palette.themePrimary,
            fontSize: isMobileLandscape
              ? '1.5rem'
              : isMobile
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
          padding: isMobileLandscape ? '1rem' : isMobile ? '1.5rem' : '2rem',
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
            <React.Fragment key={item.path}>
              <NavigationItem
                route={item}
                isHovered={hoveredItem === item.path}
                getHoverProps={getHoverProps}
                onClick={() => handleNavigation(item.path)}
                isExpanded={expandedItems.has(item.path)}
                onToggleExpand={() => handleToggleExpand(item.path)}
              />
              <AnimatePresence>
                {item.children && expandedItems.has(item.path) && (
                  <motion.div
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1, height: 'auto' }
                        : { opacity: 0, height: 0 }
                    }
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 1, height: 'auto' }
                        : { opacity: 0, height: 0 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      ease: 'easeInOut',
                    }}
                    style={{
                      overflow: 'hidden',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        paddingLeft: isLeftHanded ? '0' : '0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.25rem',
                        paddingTop: '0.25rem',
                      }}
                    >
                      {item.children.map((child) => (
                        <NavigationItem
                          key={child.path}
                          route={child}
                          isHovered={hoveredItem === child.path}
                          getHoverProps={getHoverProps}
                          onClick={() => handleNavigation(child.path)}
                          isChild
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Social Links Footer */}
      <div
        style={{
          padding: isMobileLandscape ? '1rem' : isMobile ? '1.5rem' : '2rem',
          borderTop: `1px solid ${theme.palette.neutralQuaternary}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <SocialLinks />
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
