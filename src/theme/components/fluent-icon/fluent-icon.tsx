'use client';

/**
 * FluentIcon Component
 * Wrapper for Fluent UI icons with theme integration
 */

import React from 'react';
import { Icon, initializeIcons } from '@fluentui/react';
import { IStyle } from '@fluentui/merge-styles';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

// Initialize Fluent UI icons on component load
if (typeof window !== 'undefined') {
  initializeIcons();
}

export interface FluentIconProps {
  iconName:
    | string
    | React.FC<{
        isDarkMode?: boolean;
        className?: string;
        style?: React.CSSProperties;
      }>;
  size?: 'xSmall' | 'small' | 'medium' | 'large' | 'xLarge';
  color?: string;
  className?: string;
  style?: IStyle;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  isDarkMode?: boolean;
}

const sizeMap = {
  xSmall: '12px',
  small: '16px',
  medium: '24px',
  large: '32px',
  xLarge: '48px',
};

export const FluentIcon: React.FC<FluentIconProps> = ({
  iconName,
  size = 'medium',
  color,
  className,
  style,
  variant,
  isDarkMode,
}) => {
  const { theme } = useAppTheme();

  const getVariantColor = () => {
    switch (variant) {
      case 'primary':
        return theme.palette.themePrimary;
      case 'secondary':
        return theme.palette.themeSecondary;
      case 'success':
        return theme.palette.green;
      case 'warning':
        return theme.palette.yellow;
      case 'error':
        return theme.palette.red;
      case 'info':
        return theme.palette.blue;
      default:
        return theme.palette.white;
    }
  };

  const iconColor = color || getVariantColor();

  // Use inline styles to avoid hydration mismatch from mergeStyles
  const combinedStyle: React.CSSProperties = {
    width: sizeMap[size],
    height: sizeMap[size],
    fontSize: sizeMap[size],
    color: iconColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(typeof style === 'object' && style
      ? (style as React.CSSProperties)
      : {}),
  };

  // If iconName is a custom SVG component
  if (typeof iconName === 'function') {
    const CustomIcon = iconName;
    return (
      <CustomIcon
        isDarkMode={isDarkMode}
        className={className}
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          color: iconColor,
          ...combinedStyle,
        }}
      />
    );
  }

  // If iconName is a string (Fluent UI icon name)
  return (
    <Icon
      iconName={iconName as string}
      className={className}
      suppressHydrationWarning
      styles={{
        root: {
          color: `${iconColor} !important`,
          width: sizeMap[size],
          height: sizeMap[size],
          fontSize: sizeMap[size],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& i': {
            color: `${iconColor} !important`,
          },
          '&::before': {
            color: `${iconColor} !important`,
          },
          '& *': {
            color: `${iconColor} !important`,
          },
        },
      }}
      style={combinedStyle}
    />
  );
};

export default FluentIcon;
