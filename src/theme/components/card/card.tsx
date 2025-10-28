'use client';

import React from 'react';
import { mergeStyleSets } from '@fluentui/react';
import { useAppTheme } from '../../hooks/useAppTheme';
import styles from './card.module.scss';

export interface CardProps {
  className?: string;
  children?: React.ReactNode;
  elevation?: 1 | 2 | 3;
  padding?: 'none' | 'small' | 'medium' | 'large';
  onClick?: () => void;
  hoverable?: boolean;
}

/**
 * Card component with theme integration
 * 
 * @param props - Component props
 * @returns Card component
 */
export const Card: React.FC<CardProps> = ({
  className,
  children,
  elevation = 1,
  padding = 'medium',
  onClick,
  hoverable = false,
  ...props
}) => {
  const { theme } = useAppTheme();

  const classNames = mergeStyleSets({
    root: [
      styles.card,
      {
        backgroundColor: theme.palette.neutralLighter,
        borderRadius: theme.borderRadius.m,
        boxShadow: theme.shadows[elevation === 1 ? 's' : elevation === 2 ? 'm' : 'l'],
        padding: 
          padding === 'none' ? 0 :
          padding === 'small' ? theme.spacing.s :
          padding === 'large' ? theme.spacing.l :
          theme.spacing.m,
        cursor: onClick || hoverable ? 'pointer' : 'default',
        transition: theme.animations.transitions.card,
        ':hover': hoverable || onClick ? {
          boxShadow: theme.shadows[elevation === 1 ? 'm' : elevation === 2 ? 'l' : 'xl'],
          transform: 'translateY(-2px)',
        } : undefined,
      },
      className,
    ],
  });

  return (
    <div className={classNames.root} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
