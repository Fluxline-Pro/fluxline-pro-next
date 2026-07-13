'use client';

/**
 * SkipToContent Component
 * Accessibility feature to skip navigation and jump to main content
 */

import React from 'react';

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
  return (
    <a
      href={`#${targetId}`}
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 999,
        padding: '1rem 1.5rem',
        backgroundColor: 'var(--fx-accent)',
        color: 'var(--fx-text-bright)',
        textDecoration: 'none',
        borderRadius: 'var(--fx-radius-sm, 4px)',
        fontSize: '1rem',
        fontWeight: 600,
        boxShadow: '0 10px 25px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.1)',
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
