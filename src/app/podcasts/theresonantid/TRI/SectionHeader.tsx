'use client';

import React from 'react';
import FxButton from '@/theme/components/dsm/FxButton';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  isMobile?: boolean; // Optional prop to allow mobile-specific styling if needed
  isWithinCta?: boolean;
  iconName?: string; // Optional icon name for the title
  cta?: {
    label: string;
    onClick: () => void;
    icon?: string;
    iconPosition?: 'left' | 'right';
    variant?: 'primary' | 'secondary' | 'outline';
  };
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SectionHeader - Reusable section header component for TRI pages
 * Includes title, optional subtitle, and optional CTA button
 */
export function SectionHeader({
  title,
  subtitle,
  isWithinCta = false,
  isMobile = false,
  iconName,
  cta,
  className,
  style,
}: SectionHeaderProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 16,
        marginTop: 32,
        flexWrap: 'wrap',
        gap: 16,
        ...style,
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 12,
          }}
        >
          {/* Icon slot removed — previously used FluentIcon */}
          <h3
            style={{
              ...style,
              color: 'var(--fx-accent)',
              margin: iconName
                ? '0'
                : isWithinCta
                  ? isMobile
                    ? '16px 0'
                    : 0
                  : isMobile
                    ? '48px 0 16px 0'
                    : '32px 0 0',
            }}
          >
            {title}
          </h3>
        </div>
        {subtitle && (
          <p
            style={{
              color: 'var(--fx-text-body)',
              marginTop: 16,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {cta && (
        <FxButton
          variant={cta.variant === 'secondary' ? 'outline' : (cta.variant || 'primary')}
          onClick={cta.onClick}
        >
          {cta.label}
        </FxButton>
      )}
    </div>
  );
}
