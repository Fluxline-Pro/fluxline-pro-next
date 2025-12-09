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
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  isChild?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  route,
  isHovered = false,
  getHoverProps,
  onClick,
  isExpanded = false,
  onToggleExpand,
  isChild = false,
}) => {
  const { theme, layoutPreference } = useAppTheme();
  const pathname = usePathname();
  const isActive = pathname === route.path;
  const isLeftHanded = layoutPreference === 'left-handed';
  const hasChildren = route.children && route.children.length > 0;

  const hoverProps = getHoverProps?.(route.path) || {};

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren && onToggleExpand) {
      e.preventDefault();
      onToggleExpand();
    } else if (onClick) {
      onClick();
    }
  };

  const fontSize = isChild
    ? 'clamp(1.25rem, 2.5vw, 1.5rem)'
    : 'clamp(1.5rem, 3vw, 2rem)';
  const iconSize = isChild ? 'medium' : 'large';
  const padding = isChild ? '0.5rem 0.5rem 0.5rem 2rem' : '0.75rem 0.5rem';

  const itemContent = (
    <div
      {...hoverProps}
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: isLeftHanded ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: isLeftHanded ? 'flex-start' : 'flex-end',
        gap: '1rem',
        padding,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        borderRadius: theme.borderRadius.container.small,
        backgroundColor:
          isActive || isHovered
            ? theme.palette.neutralQuaternaryAlt
            : 'transparent',
        width: '100%',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: isLeftHanded ? 'auto' : isChild ? '36px' : '48px',
          flexShrink: 0,
        }}
      >
        <FluentIcon
          iconName={route.iconName}
          size={iconSize}
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
          fontSize,
          fontWeight: isActive
            ? theme.typography.fontWeights.semiBold
            : theme.typography.fontWeights.regular,
          textAlign: isLeftHanded ? 'left' : 'right',
          flex: 1,
        }}
      >
        {route.label}
      </Typography>
      {hasChildren && (
        <FluentIcon
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          size='small'
          color={theme.palette.neutralSecondary}
        />
      )}
    </div>
  );

  if (hasChildren) {
    return <div style={{ width: '100%' }}>{itemContent}</div>;
  }

  return (
    <Link
      href={route.path}
      onClick={onClick}
      style={{
        textDecoration: 'none',
        width: '100%',
      }}
    >
      {itemContent}
    </Link>
  );
};

export default NavigationItem;
