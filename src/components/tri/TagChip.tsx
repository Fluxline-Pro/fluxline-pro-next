'use client';

import React from 'react';
import { Typography } from '../../theme/components/typography';
import { useAppTheme } from '../../theme/hooks/useAppTheme';

export interface TagChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function TagChip({ label, active = false, onClick }: TagChipProps) {
  const { theme } = useAppTheme();

  return (
    <button
      type='button'
      aria-pressed={active}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '999px',
        border: `1px solid ${
          active ? theme.palette.themePrimary : theme.palette.neutralQuaternary
        }`,
        backgroundColor: active ? theme.palette.themePrimary : 'transparent',
        padding: `${theme.spacing.s2} ${theme.spacing.m}`,
      }}
    >
      <Typography
        variant='span'
        style={{
          color: active ? theme.palette.white : theme.palette.neutralSecondary,
          margin: 0,
        }}
      >
        {label}
      </Typography>
    </button>
  );
}

export default TagChip;
