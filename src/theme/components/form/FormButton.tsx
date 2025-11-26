'use client';

import React from 'react';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'default' | 'outline';
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  text?: string;
}

/**
 * FormButton Component
 * Consistent button component following Fluxline DSM
 *
 * Features:
 * - Multiple variants (primary, secondary, tertiary, danger, outline)
 * - Optional icons with positioning
 * - Hover states with theme colors
 * - Responsive sizing
 * - Accessible with proper ARIA attributes
 */
export const FormButton: React.FC<FormButtonProps> = ({
  variant = 'primary',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  size = 'medium',
  children,
  text,
  disabled = false,
  className,
  style,
  ...rest
}) => {
  const { theme, fontScale } = useAppTheme();
  const [isHovered, setIsHovered] = React.useState(false);

  // Size configurations
  const sizeConfig = {
    small: {
      padding: `${0.5 * fontScale}rem ${1 * fontScale}rem`,
      fontSize: `${0.875 * fontScale}rem`,
    },
    medium: {
      padding: `${0.75 * fontScale}rem ${1.5 * fontScale}rem`,
      fontSize: `${1 * fontScale}rem`,
    },
    large: {
      padding: `${1 * fontScale}rem ${2 * fontScale}rem`,
      fontSize: `${1.125 * fontScale}rem`,
    },
  };

  // Variant configurations
  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: theme.borderRadius.container.button,
      fontWeight: theme.typography.fontWeights.semiBold,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
      opacity: disabled ? 0.6 : 1,
      ...sizeConfig[size],
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? theme.themeMode === 'dark' ||
                theme.themeMode === 'high-contrast' ||
                theme.themeMode === 'grayscale-dark'
                ? theme.palette.themeLight
                : theme.palette.themeDark
              : theme.palette.themePrimary,
          color:
            theme.themeMode === 'dark' ||
            theme.themeMode === 'high-contrast' ||
            theme.themeMode === 'grayscale-dark'
              ? theme.palette.black
              : theme.palette.white,
        };

      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? theme.palette.themeLighterAlt
              : 'transparent',
          color: theme.palette.themePrimary,
          border: `2px solid ${theme.palette.themePrimary}`,
        };

      case 'tertiary':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? theme.palette.neutralLighter
              : theme.palette.neutralLight,
          color: theme.palette.neutralPrimary,
          border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        };

      case 'outline':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? theme.palette.themePrimary
              : 'transparent',
          color: isHovered && !disabled
            ? theme.themeMode === 'dark' ||
              theme.themeMode === 'high-contrast' ||
              theme.themeMode === 'grayscale-dark'
              ? theme.palette.black
              : theme.palette.white
            : theme.palette.themePrimary,
          border: `2px solid ${theme.palette.themePrimary}`,
        };

      case 'danger':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? theme.semanticColors.errorBackground
              : 'transparent',
          color: theme.semanticColors.errorIcon,
          border: `1px solid ${theme.semanticColors.errorIcon}`,
        };

      case 'default':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? theme.palette.neutralQuaternaryAlt
              : theme.palette.neutralLighter,
          color: theme.palette.neutralPrimary,
          border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        };

      default:
        return baseStyles;
    }
  };

  const buttonStyles: React.CSSProperties = {
    ...getVariantStyles(),
    width: fullWidth ? '100%' : 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: theme.typography.fonts.body.fontFamily,
    ...style,
  };

  const iconColor =
    variant === 'danger'
      ? theme.semanticColors.errorIcon
      : variant === 'primary'
        ? theme.themeMode === 'dark' ||
          theme.themeMode === 'high-contrast' ||
          theme.themeMode === 'grayscale-dark'
          ? theme.palette.black
          : theme.palette.white
        : variant === 'secondary' || variant === 'outline'
          ? isHovered && !disabled
            ? theme.palette.themePrimary
            : theme.palette.neutralPrimary
          : theme.palette.neutralPrimary;

  const content = text || children;

  return (
    <button
      {...rest}
      disabled={disabled}
      className={className}
      style={buttonStyles}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && iconPosition === 'left' && (
        <FluentIcon iconName={icon} size='small' color={iconColor} />
      )}
      {content}
      {icon && iconPosition === 'right' && (
        <FluentIcon iconName={icon} size='small' color={iconColor} />
      )}
    </button>
  );
};

// Backward compatibility alias
export const Button = FormButton;
export type ButtonProps = FormButtonProps;
