'use client';

import React from 'react';
import { Typography } from '../../theme/components/typography';
import { useAppTheme } from '../../theme/hooks/useAppTheme';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  cta?: React.ReactNode;
  align?: 'left' | 'center';
}

export function SectionHeader({
  title,
  subtitle,
  cta,
  align = 'left',
}: SectionHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <header
      className={align === 'center' ? 'text-center' : undefined}
      style={{
        marginBottom: theme.spacing.l,
      }}
    >
      <Typography
        variant='h2'
        textAlign={align}
        style={{
          marginBottom: subtitle || cta ? theme.spacing.s : 0,
          color: theme.palette.neutralPrimary,
        }}
      >
        {title}
      </Typography>

      {subtitle ? (
        <Typography
          variant='p'
          textAlign={align}
          style={{
            color: theme.palette.neutralSecondary,
            marginBottom: cta ? theme.spacing.m : 0,
          }}
        >
          {subtitle}
        </Typography>
      ) : null}

      {cta ? <div>{cta}</div> : null}
    </header>
  );
}

export default SectionHeader;
