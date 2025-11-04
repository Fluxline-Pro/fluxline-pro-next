import React from 'react';
import styles from './container.module.scss';

export interface ContainerProps {
  /**
   * Content to render inside the container
   */
  children: React.ReactNode;
  /**
   * Maximum width of the container
   * @default 'default' (1280px)
   */
  maxWidth?: 'narrow' | 'default' | 'wide' | 'full';
  /**
   * Padding size
   * @default 'default'
   */
  padding?: 'none' | 'small' | 'default' | 'large';
  /**
   * Whether to center the container
   * @default true
   */
  centered?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer';
}

/**
 * Container component for constraining content width and providing consistent padding
 * Server Component - can be used for static layouts
 *
 * @example
 * ```tsx
 * <Container maxWidth="default" padding="large">
 *   <h1>Content goes here</h1>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'default',
  padding = 'default',
  centered = true,
  className = '',
  as: Component = 'div',
}) => {
  const classNames = [
    styles.container,
    styles[`maxWidth-${maxWidth}`],
    styles[`padding-${padding}`],
    centered && styles.centered,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classNames}>{children}</Component>;
};

export default Container;
