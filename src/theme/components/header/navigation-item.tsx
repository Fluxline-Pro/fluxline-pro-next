'use client';

/**
 * NavigationItem Component
 * Individual navigation menu item with icon and label
 */

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import type { NavItem } from './navigation.types';

interface NavigationItemProps {
  route: NavItem;
  isHovered?: boolean;
  getHoverProps?: (key: string) => {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  onClick?: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  route,
  isHovered = false,
  getHoverProps,
  onClick,
}) => {
  const { theme, layoutPreference } = useAppTheme();
  const pathname = usePathname();
  const isActive = pathname === route.path;
  const isLeftHanded = layoutPreference === 'left-handed';

  const hoverProps = getHoverProps?.(route.path) || {};

  return (
    <Link
      href={route.path}
      onClick={onClick}
      {...hoverProps}
      style={{
        display: 'flex',
        flexDirection: isLeftHanded ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: isLeftHanded ? 'flex-start' : 'flex-end',
        gap: '1rem',
        padding: '0.75rem 0.5rem',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        borderRadius: theme.borderRadius.container.small,
        backgroundColor:
          isActive || isHovered
            ? theme.palette.neutralQuaternaryAlt
            : 'transparent',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isLeftHanded ? 'auto' : '48px', // Fixed width for right-handed mode
          flexShrink: 0,
        }}
      >
        <FluentIcon
          iconName={route.iconName}
          size='large'
          color={
            isActive || isHovered
              ? theme.palette.themePrimary
              : theme.palette.neutralSecondary
          }
        />
      </div>
      <Typography
        variant='h3'
        style={{
          textTransform: 'capitalize',
          color:
            isActive || isHovered
              ? theme.palette.themePrimary
              : theme.palette.neutralPrimary,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: isActive
            ? theme.typography.fontWeights.semiBold
            : theme.typography.fontWeights.regular,
          textAlign: isLeftHanded ? 'left' : 'right',
          flex: 1,
        }}
      >
        {route.label}
      </Typography>
    </Link>
  );
};

export default NavigationItem;
