'use client';

import React, { useEffect } from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Testimonial } from '@/lib/testimonials/types';
import Image from 'next/image';
import { Icon, IconButton } from '@fluentui/react';

interface TestimonialModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  testimonial: Testimonial;
}

/**
 * TestimonialModal Component
 * Full-screen modal displaying complete testimonial details
 * Includes client avatar, name, company, job title, services, quote, full text, and rating
 */
export const TestimonialModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  onDismiss,
  testimonial,
}) => {
  const { theme } = useAppTheme();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onDismiss();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onDismiss]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem',
      }}
      onClick={onDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-modal-title"
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '800px',
          maxHeight: '90vh',
          width: '100%',
          backgroundColor: theme.palette.white,
          borderRadius: '8px',
          boxShadow: theme.effects.elevation16,
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1 }}>
          <IconButton
            iconProps={{ iconName: 'Cancel' }}
            onClick={onDismiss}
            ariaLabel="Close modal"
            styles={{
              root: {
                color: theme.palette.neutralPrimary,
              },
              rootHovered: {
                color: theme.palette.themePrimary,
              },
            }}
          />
        </div>

        <div
          style={{
            padding: theme.spacing.xl,
          }}
        >
          {/* Header with avatar and client info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: theme.spacing.m,
              marginBottom: theme.spacing.l,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Image
                src={testimonial.imageUrl}
                alt={testimonial.imageAlt}
                width={100}
                height={100}
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `3px solid ${theme.palette.themePrimary}`,
                }}
              />
            </div>
            <div style={{ flex: 1 }} id="testimonial-modal-title">
              <Typography
                variant="h2"
                style={{
                  color: theme.palette.neutralPrimary,
                  marginBottom: theme.spacing.s1,
                  fontSize: theme.typography.fontSizes.clamp6,
                }}
              >
                {testimonial.name}
              </Typography>
              <Typography
                variant="p"
                style={{
                  color: theme.palette.neutralSecondary,
                  fontWeight: 600,
                  marginBottom: theme.spacing.s1,
                }}
              >
                {testimonial.jobTitle}
              </Typography>
              <Typography
                variant="p"
                style={{
                  color: theme.palette.neutralTertiary,
                  marginBottom: theme.spacing.s1,
                }}
              >
                {testimonial.company}
              </Typography>
              {testimonial.services.length > 0 && (
                <Typography
                  variant="p"
                  style={{
                    color: theme.palette.themePrimary,
                    fontSize: theme.typography.fontSizes.clamp2,
                    marginTop: theme.spacing.s1,
                  }}
                >
                  Services: {testimonial.services.join(', ')}
                </Typography>
              )}
            </div>
          </div>

          {/* Quote section */}
          <div
            style={{
              padding: theme.spacing.m,
              backgroundColor: theme.palette.neutralLighterAlt,
              borderLeft: `4px solid ${theme.palette.themePrimary}`,
              borderRadius: '4px',
              marginBottom: theme.spacing.l,
            }}
          >
            <Typography
              variant="p"
              style={{
                fontStyle: 'italic',
                color: theme.palette.neutralPrimary,
                fontSize: theme.typography.fontSizes.clamp4,
                lineHeight: 1.6,
              }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </Typography>
          </div>

          {/* Full testimonial text */}
          <Typography
            variant="p"
            style={{
              color: theme.palette.neutralPrimary,
              lineHeight: 1.8,
              marginBottom: theme.spacing.l,
            }}
          >
            {testimonial.fullText}
          </Typography>

          {/* Rating display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.s1,
            }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon
                key={index}
                iconName="FavoriteStarFill"
                styles={{
                  root: {
                    fontSize: '24px',
                    color:
                      index < testimonial.rating
                        ? theme.palette.themePrimary
                        : theme.palette.neutralLight,
                  },
                }}
              />
            ))}
            <Typography
              variant="p"
              style={{
                color: theme.palette.neutralSecondary,
                marginLeft: theme.spacing.s1,
              }}
            >
              {testimonial.rating}/5
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
