'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../../theme/components/typography';
import { useAppTheme } from '../../theme/hooks/useAppTheme';

export interface HeroSimpleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  backPath?: string;
  backLabel?: string;
  cta?: React.ReactNode;
}

export function HeroSimple({
  title,
  subtitle,
  eyebrow,
  backPath,
  backLabel = 'Back',
  cta,
}: HeroSimpleProps) {
  const { theme } = useAppTheme();

  return (
    <section
      style={{
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
      }}
    >
      {backPath ? (
        <Link
          href={backPath}
          style={{
            color: theme.palette.themePrimary,
            display: 'inline-block',
            marginBottom: theme.spacing.m,
          }}
          aria-label={backLabel}
        >
          ← {backLabel}
        </Link>
      ) : null}

      {eyebrow ? (
        <Typography
          variant='span'
          style={{
            color: theme.palette.themePrimary,
            marginBottom: theme.spacing.xs,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </Typography>
      ) : null}

      <Typography
        variant='h1'
        style={{
          color: theme.palette.neutralPrimary,
          marginBottom: subtitle ? theme.spacing.s : 0,
        }}
      >
        {title}
      </Typography>

      {subtitle ? (
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            marginBottom: cta ? theme.spacing.l : 0,
          }}
        >
          {subtitle}
        </Typography>
      ) : null}

      {cta ? <div>{cta}</div> : null}
    </section>
  );
}

export default HeroSimple;
