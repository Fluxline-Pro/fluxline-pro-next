'use client';

/**
 * SkipToContent Component
 * Accessibility feature to skip navigation and jump to main content
 */

import React from 'react';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

interface SkipToContentProps {
  targetId?: string;
  label?: string;
}

/**
 * SkipToContent Component
 * Renders an accessible skip link that's visible on keyboard focus
 */
export const SkipToContent: React.FC<SkipToContentProps> = ({
  targetId = 'main-content',
  label = 'Skip to main content',
}) => {
  const { theme } = useAppTheme();

  return (
    <a
      href={`#${targetId}`}
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 999,
        padding: '1rem 1.5rem',
        backgroundColor: theme.palette.themePrimary,
        color: theme.palette.white,
        textDecoration: 'none',
        borderRadius: theme.borderRadius.container.small,
        fontSize: '1rem',
        fontWeight: theme.typography.fontWeights.semiBold,
        boxShadow: theme.shadows.xl,
        transition: 'all 0.2s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '1rem';
        e.currentTarget.style.top = '1rem';
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px';
        e.currentTarget.style.top = 'auto';
      }}
    >
      {label}
    </a>
  );
};

export default SkipToContent;
