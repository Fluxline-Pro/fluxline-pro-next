'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Testimonial } from '@/lib/testimonials/types';
import Image from 'next/image';
import { Icon } from '@fluentui/react';
import { Modal } from '@/components/Modal';

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

  return (
    <Modal
      isOpen={isOpen}
      onDismiss={onDismiss}
      ariaLabel={`Testimonial from ${testimonial.name}`}
    >
      <div id='testimonial-modal-title'>
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
          <div style={{ flex: 1 }} id='testimonial-modal-title'>
            <Typography
              variant='h2'
              style={{
                color: theme.palette.neutralPrimary,
                marginBottom: theme.spacing.s1,
                fontSize: theme.typography.fontSizes.clamp6,
              }}
            >
              {testimonial.name}
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralSecondary,
                fontWeight: 600,
                marginBottom: theme.spacing.s1,
              }}
            >
              {testimonial.jobTitle}
            </Typography>
            <Typography
              variant='p'
              style={{
                color: theme.palette.neutralTertiary,
                marginBottom: theme.spacing.s1,
              }}
            >
              {testimonial.company}
            </Typography>
            {testimonial.services.length > 0 && (
              <Typography
                variant='p'
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
            variant='p'
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
          variant='p'
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
              iconName='FavoriteStarFill'
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
            variant='p'
            style={{
              color: theme.palette.neutralSecondary,
              marginLeft: theme.spacing.s1,
            }}
          >
            {testimonial.rating}/5
          </Typography>
        </div>
      </div>
    </Modal>
  );
};
