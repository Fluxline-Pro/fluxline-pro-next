'use client';

import React, { useId } from 'react';
import {
  PrimaryButton,
  DefaultButton,
  IButtonProps,
  IButtonStyles,
} from '@fluentui/react';
import { useAppTheme } from '../../hooks/useAppTheme';
import styles from './button.module.scss';

export interface ButtonProps extends Omit<IButtonProps, 'size'> {
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  className?: string;
  text?: string;
  fullWidth?: boolean;
}

/**
 * Button component with Fluent UI integration
 *
 * @param props - Component props
 * @returns Button component
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  className,
  text,
  fullWidth = false,
  id,
  ...props
}) => {
  const { theme } = useAppTheme();
  const generatedId = useId();
  const buttonId = id || generatedId;

  const buttonStyles: IButtonStyles = {
    root: {
      width: fullWidth ? '100%' : 'auto',
      height: size === 'small' ? '32px' : size === 'large' ? '48px' : '40px',
      fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
      fontFamily: theme.typography.fontFamilies.base,
      transition: theme.animations.transitions.button,
    },
    rootHovered: {
      backgroundColor: theme.palette.themeDarkAlt,
    },
    rootPressed: {
      backgroundColor: theme.palette.themeDark,
    },
  };

  const ButtonComponent =
    variant === 'default'
      ? DefaultButton
      : variant === 'secondary'
        ? DefaultButton
        : PrimaryButton;

  return (
    <ButtonComponent
      id={buttonId}
      className={`${styles.button} ${className || ''}`}
      styles={buttonStyles}
      text={text || (typeof children === 'string' ? children : undefined)}
      {...props}
    >
      {typeof children !== 'string' && children}
    </ButtonComponent>
  );
};

Button.displayName = 'Button';

export default Button;
