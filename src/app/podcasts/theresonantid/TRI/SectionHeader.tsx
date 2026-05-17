'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  isWithinCta?: boolean;
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
  cta,
  className,
  style,
}: SectionHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: theme.spacing.xl,
        flexWrap: 'wrap',
        gap: theme.spacing.m,
        ...style,
      }}
    >
      <div>
        <Typography
          variant='h3'
          style={{
            ...style,
            color: theme.palette.themePrimary,
            margin: isWithinCta ? 0 : `${theme.spacing.xl} 0 0`,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginTop: theme.spacing.m,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </div>
      {cta && (
        <FormButton
          text={cta.label}
          variant={cta.variant || 'primary'}
          icon={cta.icon}
          iconPosition={cta.iconPosition || 'left'}
          onClick={cta.onClick}
        />
      )}
    </div>
  );
}
