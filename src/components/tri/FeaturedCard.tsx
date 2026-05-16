'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '../../theme/components/typography';
import { useAppTheme } from '../../theme/hooks/useAppTheme';
import { TagChip } from './TagChip';

export interface FeaturedCardProps {
  title: string;
  description: string;
  href?: string;
  tags?: string[];
  ctaLabel?: string;
}

export function FeaturedCard({
  title,
  description,
  href,
  tags = [],
  ctaLabel = 'Read more',
}: FeaturedCardProps) {
  const { theme } = useAppTheme();
  const safeHref = React.useMemo(() => {
    if (!href) {
      return undefined;
    }

    const value = href.trim().replace(/\\/g, '/');
    if (!value.startsWith('/')) {
      return undefined;
    }

    const isSafePath = /^\/[A-Za-z0-9\-._~!$&'()*+,;=:@/%]*$/.test(value);
    if (!isSafePath) {
      return undefined;
    }

    return value;
  }, [href]);

  const content = (
    <article
      style={{
        border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
        borderRadius: theme.borderRadius.container.medium,
        padding: theme.spacing.xl,
        backgroundColor: theme.palette.white,
      }}
    >
      {tags.length > 0 ? (
        <div className='mb-3 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      ) : null}

      <Typography
        variant='h3'
        style={{ color: theme.palette.neutralPrimary, marginBottom: theme.spacing.s }}
      >
        {title}
      </Typography>

      <Typography
        variant='p'
        style={{ color: theme.palette.neutralSecondary, marginBottom: href ? theme.spacing.m : 0 }}
      >
        {description}
      </Typography>

      {safeHref ? (
        <Typography variant='span' style={{ color: theme.palette.themePrimary, margin: 0 }}>
          {ctaLabel} →
        </Typography>
      ) : null}
    </article>
  );

  if (!safeHref) {
    return content;
  }

  return (
    <Link href={safeHref} className='block' aria-label={title}>
      {content}
    </Link>
  );
}

export default FeaturedCard;
