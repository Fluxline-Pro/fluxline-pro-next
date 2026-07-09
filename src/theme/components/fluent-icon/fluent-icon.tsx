'use client';

import React from 'react';

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
  style?: React.CSSProperties;
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

/** @deprecated Use unicode characters or emoji directly instead of FluentIcon. */
export const FluentIcon: React.FC<FluentIconProps> = ({
  iconName,
  size = 'medium',
  color,
  className,
  style,
  isDarkMode,
}) => {
  const iconColor = color || 'var(--fx-text-body)';

  const combinedStyle: React.CSSProperties = {
    width: sizeMap[size],
    height: sizeMap[size],
    fontSize: sizeMap[size],
    color: iconColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(typeof style === 'object' && style ? style : {}),
  };

  if (typeof iconName === 'function') {
    const CustomIcon = iconName;
    return (
      <CustomIcon
        isDarkMode={isDarkMode}
        className={className}
        style={combinedStyle}
      />
    );
  }

  return (
    <span className={className} style={combinedStyle} aria-hidden='true'>
      {iconName}
    </span>
  );
};

export default FluentIcon;
