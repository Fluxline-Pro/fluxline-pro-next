'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { Testimonial } from '@/lib/testimonials/types';
import Image from 'next/image';
import { Icon } from '@fluentui/react/lib/Icon';
import { PrimaryButton } from '@fluentui/react/lib/Button';

interface FeaturedTestimonialProps {
  testimonial: Testimonial;
  onViewFull?: () => void;
}

/**
 * FeaturedTestimonial Component
 * Large highlighted testimonial card with featured badge
 * Displays prominent quote, client info, and "View Full Testimonial" CTA
 */
export const FeaturedTestimonial: React.FC<FeaturedTestimonialProps> = ({
  testimonial,
  onViewFull,
}) => {
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();

  const isMobile =
    orientation === 'portrait' || orientation === 'mobile-landscape';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? theme.spacing.s2 : theme.spacing.m,
        padding: isMobile ? theme.spacing.m : theme.spacing.xl,
        backgroundColor: theme.palette.neutralLighterAlt,
        borderRadius: '8px',
        border: `2px solid ${theme.palette.themePrimary}`,
        boxShadow: theme.effects.elevation8,
        position: 'relative',
        minHeight: isMobile ? '350px' : '400px',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Decorative accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: `linear-gradient(to right, ${theme.palette.themePrimary}, ${theme.palette.themeSecondary})`,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      />

      {/* Avatar with featured badge */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <Image
          src={testimonial.imageUrl}
          alt={testimonial.imageAlt}
          width={isMobile ? 80 : 120}
          height={isMobile ? 80 : 120}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            border: `4px solid ${theme.palette.themePrimary}`,
          }}
        />
        {/* Featured badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            backgroundColor: theme.palette.themeSecondary,
            color: theme.palette.white,
            borderRadius: '50%',
            width: isMobile ? '32px' : '40px',
            height: isMobile ? '32px' : '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '16px' : '20px',
            fontWeight: 'bold',
            boxShadow: theme.effects.elevation4,
          }}
          aria-label='Featured'
        >
          ★
        </div>
      </div>

      {/* Quote */}
      <div
        style={{
          padding: isMobile ? theme.spacing.s2 : theme.spacing.m,
          backgroundColor: theme.palette.white,
          borderLeft: `4px solid ${theme.palette.themePrimary}`,
          borderRadius: '4px',
          boxShadow: theme.effects.elevation4,
          width: '100%',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='p'
          style={{
            fontStyle: 'italic',
            color: theme.palette.neutralPrimary,
            fontSize: isMobile
              ? theme.typography.fontSizes.clamp3
              : theme.typography.fontSizes.clamp4,
            lineHeight: 1.6,
            textAlign: 'center',
          }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </Typography>
      </div>

      {/* Client info */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.s1,
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant='h3'
          style={{
            color: theme.palette.neutralPrimary,
            fontWeight: 700,
            fontSize: isMobile
              ? theme.typography.fontSizes.clamp4
              : theme.typography.fontSizes.clamp5,
          }}
        >
          {testimonial.name}
        </Typography>
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralSecondary,
            fontWeight: 600,
            fontSize: isMobile
              ? theme.typography.fontSizes.clamp2
              : theme.typography.fontSizes.clamp3,
          }}
        >
          {testimonial.jobTitle}
        </Typography>
        <Typography
          variant='p'
          style={{
            color: theme.palette.neutralTertiary,
            fontSize: isMobile
              ? theme.typography.fontSizes.clamp2
              : theme.typography.fontSizes.clamp3,
          }}
        >
          {testimonial.company}
        </Typography>

        {/* Rating */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.s1,
            marginTop: theme.spacing.s1,
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Icon
              key={index}
              iconName='FavoriteStarFill'
              styles={{
                root: {
                  fontSize: isMobile ? '16px' : '20px',
                  color:
                    index < testimonial.rating
                      ? theme.palette.themePrimary
                      : theme.palette.neutralLight,
                },
              }}
            />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      {onViewFull && (
        <PrimaryButton
          text={isMobile ? 'View Full' : 'View Full Testimonial'}
          onClick={onViewFull}
          iconProps={{ iconName: 'ChevronRight' }}
          styles={{
            root: {
              marginTop: theme.spacing.s2,
              borderRadius: '4px',
              fontSize: isMobile
                ? theme.typography.fontSizes.clamp2
                : theme.typography.fontSizes.clamp3,
            },
          }}
        />
      )}
    </div>
  );
};
