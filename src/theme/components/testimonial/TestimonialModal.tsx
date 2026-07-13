'use client';

import React from 'react';
import { Typography } from '@/theme/components/typography';
import { Testimonial } from '@/lib/testimonials/types';
import Image from 'next/image';
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
            gap: '16px',
            marginBottom: '20px',
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
                border: '3px solid var(--fx-accent)',
              }}
            />
          </div>
          <div style={{ flex: 1 }} id='testimonial-modal-title'>
            <Typography
              variant='h2'
              style={{
                color: 'var(--fx-text-heading)',
                marginBottom: '6px',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              }}
            >
              {testimonial.name}
            </Typography>
            <Typography
              variant='p'
              style={{
                color: 'var(--fx-text-muted)',
                fontWeight: 600,
                marginBottom: '6px',
              }}
            >
              {testimonial.jobTitle}
            </Typography>
            <Typography
              variant='p'
              style={{
                color: 'var(--fx-text-faint)',
                marginBottom: '6px',
              }}
            >
              {testimonial.company}
            </Typography>
            {testimonial.services.length > 0 && (
              <Typography
                variant='p'
                style={{
                  color: 'var(--fx-accent)',
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                  marginTop: '6px',
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
            padding: '16px',
            backgroundColor: 'var(--fx-surface-card)',
            borderLeft: '4px solid var(--fx-accent)',
            borderRadius: '4px',
            marginBottom: '20px',
          }}
        >
          <Typography
            variant='p'
            style={{
              fontStyle: 'italic',
              color: 'var(--fx-text-heading)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
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
            color: 'var(--fx-text-heading)',
            lineHeight: 1.8,
            marginBottom: '20px',
          }}
        >
          {testimonial.fullText}
        </Typography>

        {/* Rating display */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              style={{
                fontSize: '24px',
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
          <Typography
            variant='p'
            style={{
              color: 'var(--fx-text-muted)',
              marginLeft: '6px',
            }}
          >
            {testimonial.rating}/5
          </Typography>
        </div>
      </div>
    </Modal>
  );
};
