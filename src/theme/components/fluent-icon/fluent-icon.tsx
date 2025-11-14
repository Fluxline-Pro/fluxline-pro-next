'use client';

/**
 * FluentIcon Component
 * Wrapper for Fluent UI icons with theme integration
 */

import React from 'react';
import { Icon, initializeIcons } from '@fluentui/react';
import { mergeStyles, IStyle } from '@fluentui/merge-styles';
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

  // Ensure icons are initialized on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeIcons();
    }
  }, []);

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

  const iconStyles: IStyle = {
    width: sizeMap[size],
    height: sizeMap[size],
    fontSize: sizeMap[size],
    color: iconColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(typeof style === 'object' && style ? style : {}),
  };

  // Generate className only on client to avoid hydration mismatch
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const mergedClassName = isClient
    ? mergeStyles(iconStyles, className)
    : className;

  // If iconName is a custom SVG component
  if (typeof iconName === 'function') {
    const CustomIcon = iconName;
    return (
      <CustomIcon
        isDarkMode={isDarkMode}
        className={mergedClassName}
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          color: iconColor,
        }}
      />
    );
  }

  // If iconName is a string (Fluent UI icon name)
  return (
    <Icon
      iconName={iconName as string}
      className={mergedClassName}
      styles={
        isClient
          ? {
              root: {
                color: `${iconColor} !important`,
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
            }
          : undefined
      }
      style={{
        color: iconColor,
        width: sizeMap[size],
        height: sizeMap[size],
        fontSize: sizeMap[size],
      }}
    />
  );
};

export default FluentIcon;
