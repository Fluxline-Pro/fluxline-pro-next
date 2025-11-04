import React from 'react';
import styles from './stack.module.scss';

export interface StackProps {
  /**
   * Content to render inside the stack
   */
  children: React.ReactNode;
  /**
   * Direction of the stack
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';
  /**
   * Spacing between items
   * @default 'default'
   */
  gap?: 'none' | 'xsmall' | 'small' | 'default' | 'large' | 'xlarge';
  /**
   * Alignment of items
   */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /**
   * Justification of items (main axis)
   */
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * Whether items should wrap
   * @default false
   */
  wrap?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article' | 'ul' | 'ol' | 'nav';
}

/**
 * Stack component for creating flex-based layouts with consistent spacing
 * Server Component - can be used for static layouts
 *
 * @example
 * ```tsx
 * <Stack direction="vertical" gap="large" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'vertical',
  gap = 'default',
  align,
  justify,
  wrap = false,
  className = '',
  as: Component = 'div',
}) => {
  const classNames = [
    styles.stack,
    styles[`direction-${direction}`],
    styles[`gap-${gap}`],
    align && styles[`align-${align}`],
    justify && styles[`justify-${justify}`],
    wrap && styles.wrap,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classNames}>{children}</Component>;
};

export default Stack;
