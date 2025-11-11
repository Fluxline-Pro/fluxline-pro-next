'use client';

import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import styles from './section.module.scss';

export interface SectionProps {
  /**
   * Content to render inside the section
   */
  children: React.ReactNode;
  /**
   * Vertical padding size
   * @default 'default'
   */
  spacing?: 'none' | 'small' | 'default' | 'large' | 'xlarge';
  /**
   * Background variant
   * @default 'transparent'
   */
  background?: 'transparent' | 'subtle' | 'elevated';
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * HTML id attribute
   */
  id?: string;
}

/**
 * Section component for creating distinct content sections with consistent spacing
 * Server Component - can be used for static layouts
 *
 * @example
 * ```tsx
 * <Section spacing="large" background="subtle">
 *   <Container>
 *     <h2>Section Title</h2>
 *     <p>Section content</p>
 *   </Container>
 * </Section>
 * ```
 */
export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'default',
  background = 'transparent',
  className = '',
  id,
}) => {
  const { themeMode } = useAppTheme();
  const isDark = themeMode === 'dark' || themeMode === 'grayscale';
  
  const backgroundClass = background !== 'transparent' && isDark 
    ? `${background}-dark` 
    : background;

  const classNames = [
    styles.section,
    styles[`spacing-${spacing}`],
    styles[`background-${backgroundClass}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classNames} id={id}>
      {children}
    </section>
  );
};

export default Section;
