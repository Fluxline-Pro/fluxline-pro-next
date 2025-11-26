'use client';

import React from 'react';
import Link from 'next/link';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { FormButton } from '@/theme/components/form/FormButton';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useIsMobile } from '@/theme/hooks/useMediaQuery';
import type { ScrollItem } from '@/app/services/scrolls/types';

interface ServiceScrollSectionProps {
  scroll: ScrollItem;
}

/**
 * ServiceScrollSection Component
 * Displays the related white paper/scroll for a service
 */
export const ServiceScrollSection: React.FC<ServiceScrollSectionProps> = ({
  scroll,
}) => {
  const { theme } = useAppTheme();
  const isMobile = useIsMobile();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(scroll.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className='space-y-6'>
      <Typography
        variant='h2'
        style={{
          color: theme.palette.themePrimary,
          fontSize: '2rem',
          fontWeight: theme.typography.fontWeights.bold,
        }}
      >
        Strategic Insights
      </Typography>

      <div
        style={{
          border: `1px solid ${theme.palette.neutralTertiary}`,
          borderRadius: theme.borderRadius.container.medium,
          backgroundColor: theme.palette.neutralLight,
          padding: isMobile ? theme.spacing.l : theme.spacing.xl,
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.m,
        }}
      >
        {/* Header with Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: theme.spacing.m,
          }}
        >
          <FluentIcon
            iconName='Documentation'
            size='xLarge'
            color={theme.palette.themePrimary}
            style={{ flexShrink: 0 }}
          />
          <div style={{ flex: 1 }}>
            <Typography
              variant='h3'
              style={{
                color: theme.palette.themePrimary,
                fontSize: isMobile ? '1.25rem' : '1.5rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: theme.spacing.s1,
              }}
            >
              {scroll.title}
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: isMobile ? '0.875rem' : '1rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              {scroll.description}
            </Typography>
          </div>
        </div>

        {/* Tags */}
        {scroll.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {scroll.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: theme.borderRadius.container.small,
                  backgroundColor: theme.palette.themeLighterAlt,
                  color: theme.palette.themePrimary,
                  fontSize: '0.75rem',
                  fontWeight: theme.typography.fontWeights.semiBold,
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* File Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.s1,
            color: theme.palette.neutralTertiary,
            fontSize: '0.875rem',
          }}
        >
          <FluentIcon iconName='PDF' size='small' />
          <span>{scroll.fileSize}</span>
        </div>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: theme.spacing.m,
            marginTop: theme.spacing.s1,
          }}
        >
          <FormButton
            text='Download White Paper'
            variant='primary'
            size='large'
            icon='Download'
            iconPosition='right'
            onClick={handleDownload}
          />
          <Link href={`/services/scrolls/${scroll.id}`}>
            <FormButton
              text='Learn More'
              variant='secondary'
              size='large'
              icon='ChevronRight'
              iconPosition='right'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};
