'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { FormButton } from '@/theme/components/form';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { FluentIcon } from '@/theme/components/fluent-icon/fluent-icon';

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
  const { theme } = useAppTheme();

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: theme.spacing.m,
        marginTop: theme.spacing.xl,
        flexWrap: 'wrap',
        gap: theme.spacing.m,
        ...style,
      }}
    >
      <div>
        <div
          className='flex flex-row items-center justify-start'
          style={{ gap: theme.spacing.s1 }}
        >
          {iconName && (
            <FluentIcon
              iconName={iconName}
              size='large'
              color={theme.palette.themePrimary}
              style={{ marginRight: theme.spacing.m }}
            />
          )}
          <Typography
            variant='h3'
            style={{
              ...style,
              color: theme.palette.themePrimary,
              margin: iconName
                ? '0'
                : isWithinCta
                  ? isMobile
                    ? `${theme.spacing.m} 0`
                    : 0
                  : isMobile
                    ? `${theme.spacing.xxl} 0 ${theme.spacing.m} 0`
                    : `${theme.spacing.xl} 0 0`,
            }}
          >
            {title}
          </Typography>
        </div>
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
