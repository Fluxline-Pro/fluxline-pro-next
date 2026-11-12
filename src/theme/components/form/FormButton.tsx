'use client';

import React from 'react';

export interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'danger'
    | 'default'
    | 'outline';
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  text?: string;
  /** When provided, clicking the button navigates to this URL. */
  href?: string;
  /** Target for href navigation. Defaults to '_blank'. */
  target?: string;
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
  href,
  target,
  onClick,
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Size configurations
  const sizeConfig = {
    small: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
    },
    medium: {
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
    },
    large: {
      padding: '1rem 2rem',
      fontSize: '1.125rem',
    },
  };

  // Variant configurations
  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: 'var(--fx-radius-control)',
      fontWeight: 600,
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
              ? 'var(--fx-text-bright)'
              : 'var(--fx-accent)',
          color: 'var(--fx-accent-ink)',
        };

      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? 'var(--fx-hover-fill)'
              : 'transparent',
          color: 'var(--fx-accent)',
          border: '2px solid var(--fx-accent)',
        };

      case 'tertiary':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? 'var(--fx-surface-card)'
              : 'var(--fx-surface-input)',
          color: 'var(--fx-text-heading)',
          border: '1px solid var(--fx-border)',
        };

      case 'outline':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled ? 'var(--fx-accent)' : 'transparent',
          color:
            isHovered && !disabled
              ? 'var(--fx-accent-ink)'
              : 'var(--fx-accent)',
          border: '2px solid var(--fx-accent)',
        };

      case 'danger':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? 'var(--fx-error-bg)'
              : 'transparent',
          color: 'var(--fx-error)',
          border: '1px solid var(--fx-error)',
        };

      case 'default':
        return {
          ...baseStyles,
          backgroundColor:
            isHovered && !disabled
              ? 'var(--fx-border)'
              : 'var(--fx-surface-card)',
          color: 'var(--fx-text-heading)',
          border: '1px solid var(--fx-border)',
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
    fontFamily: 'var(--fx-font)',
    ...style,
  };

  const content = text || children;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href && !disabled) {
      window.open(href, target ?? '_blank', 'noopener,noreferrer');
    }
    onClick?.(e);
  };

  const iconElement = icon ? (
    <span
      style={{
        fontSize: size === 'small' ? '0.875rem' : '1rem',
        lineHeight: 1,
      }}
      aria-hidden='true'
    >
      {icon}
    </span>
  ) : null;

  return (
    <button
      {...rest}
      disabled={disabled}
      className={className}
      style={buttonStyles}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {icon && iconPosition === 'left' && iconElement}
      {content}
      {icon && iconPosition === 'right' && iconElement}
    </button>
  );
};

// Backward compatibility alias
export const Button = FormButton;
export type ButtonProps = FormButtonProps;
