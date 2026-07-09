'use client';

import React from 'react';

export interface ContentSectionProps {
  children: React.ReactNode;
  backgroundColor?: string;
  padding?: boolean;
  borderRadius?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isWithinCta?: boolean; // New prop to indicate if this section is within a CTA context
  isMobile?: boolean; // Optional prop to allow mobile-specific styling if needed
}

/**
 * ContentSection - Wrapper component for content sections
 * Applies consistent spacing, optional background color, and theme tokens
 */
export function ContentSection({
  children,
  backgroundColor,
  padding = false,
  borderRadius = false,
  className,
  style,
  isWithinCta = false,
  isMobile = false,
}: ContentSectionProps) {
  return (
    <section
      className={className}
      style={{
        marginBottom: isWithinCta ? 0 : 48,
        ...(backgroundColor && { backgroundColor }),
        ...(padding && { padding: isMobile ? 20 : 32 }),
        ...(borderRadius && {
          borderRadius: 'var(--fx-radius-card)',
        }),
        ...style,
      }}
    >
      {children}
    </section>
  );
}
