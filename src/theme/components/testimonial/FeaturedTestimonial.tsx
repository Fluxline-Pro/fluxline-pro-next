'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { Testimonial } from '@/lib/testimonials/types';
import Image from 'next/image';

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
  const [isMounted, setIsMounted] = React.useState(false);
  const orientationHook = useDeviceOrientation();
  const orientation = isMounted ? orientationHook : 'landscape';

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMobile =
    orientation === 'portrait' || orientation === 'mobile-landscape';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: isMobile ? '12px' : '16px',
        padding: isMobile ? '16px' : '32px',
        backgroundColor: 'var(--fx-surface-card)',
        borderRadius: '8px',
        border: '2px solid var(--fx-accent)',
        boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
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
          background: 'linear-gradient(to right, var(--fx-accent), var(--fx-accent-hover))',
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
            border: '4px solid var(--fx-accent)',
          }}
        />
        {/* Featured badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            backgroundColor: 'var(--fx-accent-hover)',
            color: 'var(--fx-text-bright)',
            borderRadius: '50%',
            width: isMobile ? '32px' : '40px',
            height: isMobile ? '32px' : '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '16px' : '20px',
            fontWeight: 'bold',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          }}
          aria-label='Featured'
        >
          ★
        </div>
      </div>

      {/* Quote */}
      <div
        style={{
          padding: isMobile ? '12px' : '16px',
          backgroundColor: 'var(--fx-text-bright)',
          borderLeft: '4px solid var(--fx-accent)',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
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
            color: 'var(--fx-text-heading)',
            fontSize: isMobile
              ? 'clamp(0.875rem, 1.8vw, 1rem)'
              : 'clamp(1rem, 2vw, 1.25rem)',
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
          gap: '6px',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          variant='h3'
          style={{
            color: 'var(--fx-text-heading)',
            fontWeight: 700,
            fontSize: isMobile
              ? 'clamp(1rem, 2vw, 1.25rem)'
              : 'clamp(1.25rem, 2.5vw, 1.5rem)',
          }}
        >
          {testimonial.name}
        </Typography>
        <Typography
          variant='p'
          style={{
            color: 'var(--fx-text-muted)',
            fontWeight: 600,
            fontSize: isMobile
              ? 'clamp(0.75rem, 1.5vw, 0.875rem)'
              : 'clamp(0.875rem, 1.8vw, 1rem)',
          }}
        >
          {testimonial.jobTitle}
        </Typography>
        <Typography
          variant='p'
          style={{
            color: 'var(--fx-text-faint)',
            fontSize: isMobile
              ? 'clamp(0.75rem, 1.5vw, 0.875rem)'
              : 'clamp(0.875rem, 1.8vw, 1rem)',
          }}
        >
          {testimonial.company}
        </Typography>

        {/* Rating */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '6px',
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              style={{
                fontSize: isMobile ? '16px' : '20px',
                color:
                  index < testimonial.rating
                    ? 'var(--fx-accent)'
                    : 'var(--fx-border)',
                lineHeight: 1,
              }}
              aria-hidden='true'
            >
              {index < testimonial.rating ? '★' : '☆'}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      {onViewFull && (
        <button
          onClick={onViewFull}
          style={{
            marginTop: '12px',
            borderRadius: '4px',
            fontSize: isMobile
              ? 'clamp(0.75rem, 1.5vw, 0.875rem)'
              : 'clamp(0.875rem, 1.8vw, 1rem)',
            background: 'var(--fx-accent)',
            color: 'var(--fx-text-bright)',
            border: 'none',
            padding: '8px 16px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 600,
          }}
        >
          {isMobile ? 'View Full' : 'View Full Testimonial'}
          <span aria-hidden='true'>&rsaquo;</span>
        </button>
      )}
    </div>
  );
};
