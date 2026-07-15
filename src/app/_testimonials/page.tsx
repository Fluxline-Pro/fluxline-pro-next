'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { useDeviceOrientation } from '@/theme/hooks/useMediaQuery';
import { motion } from 'framer-motion';
import {
  getAllTestimonials,
  getFeaturedTestimonials,
  Testimonial,
} from '@/lib/testimonials';
import { UnifiedCard } from '@/theme/components/card/unified-card';
import {
  TestimonialCarousel,
  TestimonialModal,
  FeaturedTestimonial,
} from '@/theme/components/testimonial';
import Image from 'next/image';

/**
 * Testimonials Page Component
 * Displays client testimonials with featured carousel, grid, and modal views
 * Features:
 * - Static generation (SSG) with mock data
 * - Featured testimonials carousel
 * - Responsive grid layout (3/2/1 columns)
 * - Full testimonial modal
 * - Staggered animations
 * - Accessibility support
 */
export default function TestimonialsPage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const orientationHook = useDeviceOrientation();
  const orientation = isMounted ? orientationHook : 'landscape';

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get testimonials data
  const allTestimonials = getAllTestimonials();
  const featuredTestimonials = getFeaturedTestimonials();
  const regularTestimonials = allTestimonials.filter((t) => !t.featured);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  const handleCardClick = (testimonial: Testimonial) => {
    setSelectedTestimonial(testimonial);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTestimonial(null);
  };

  // Determine grid columns based on orientation
  const gridColumns = React.useMemo(() => {
    switch (orientation) {
      case 'portrait':
      case 'tablet-portrait':
        return 1;
      case 'mobile-landscape':
      case 'square':
        return 2;
      case 'landscape':
      case 'large-portrait':
      case 'ultrawide':
      default:
        return 3;
    }
  }, [orientation]);

  const isMobile =
    orientation === 'portrait' || orientation === 'mobile-landscape';

  // Animation variants
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div
        style={{
          padding: isMobile ? '16px' : '20px',
          width: '100%',
        }}
      >
        {/* Back Navigation */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={fadeUpVariants}
          style={{
            marginBottom: '20px',
          }}
        >
          <Link
            href='/#about'
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px',
              borderRadius: '8px',
              color: 'var(--fx-accent)',
              textDecoration: 'none',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--fx-surface-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg
              width='20'
              height='20'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Back to About
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={fadeUpVariants}
          transition={{ delay: 0.1 }}
          style={{
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          <h1
            style={{
              fontSize: 'var(--fx-h1-size)',
              fontWeight: 700,
              color: 'var(--fx-accent)',
              marginBottom: '16px',
              marginTop: 0,
            }}
          >
            What Our Clients Say
          </h1>
          <p
            style={{
              color: 'var(--fx-text-muted)',
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
            }}
          >
            Hear from the businesses and individuals we&apos;ve helped transform
            through strategic consulting, training, and development services.
          </p>
        </motion.div>

        {/* Featured Testimonials Carousel */}
        {featuredTestimonials.length > 0 && (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={fadeUpVariants}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: '48px' }}
          >
            <h2
              style={{
                fontSize: 'var(--fx-h2-size)',
                fontWeight: 700,
                color: 'var(--fx-text-heading)',
                marginBottom: '20px',
                marginTop: 0,
              }}
            >
              Featured Testimonials
            </h2>
            <TestimonialCarousel
              onItemClick={(index) =>
                handleCardClick(featuredTestimonials[index])
              }
            >
              {featuredTestimonials.map((testimonial) => (
                <FeaturedTestimonial
                  key={testimonial.id}
                  testimonial={testimonial}
                  onViewFull={() => handleCardClick(testimonial)}
                />
              ))}
            </TestimonialCarousel>
          </motion.div>
        )}

        {/* All Testimonials Grid */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={fadeUpVariants}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: '48px' }}
        >
          <h2
            style={{
              fontSize: 'var(--fx-h2-size)',
              fontWeight: 700,
              color: 'var(--fx-text-heading)',
              marginBottom: '20px',
              marginTop: 0,
            }}
          >
            All Testimonials
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
              gap: isMobile ? '16px' : '20px',
            }}
          >
            {regularTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.025,
                }}
              >
                <UnifiedCard
                  id={testimonial.id}
                  title={testimonial.name}
                  description={testimonial.quote}
                  imageUrl={testimonial.imageUrl}
                  imageAlt={testimonial.imageAlt}
                  viewType='grid'
                  onClick={() => handleCardClick(testimonial)}
                  elevation='medium'
                  imageText={testimonial.company}
                  showTitleOnImage={false}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Browse Testimonials Carousel */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={fadeUpVariants}
          transition={{ delay: 0.6 }}
        >
          <h2
            style={{
              fontSize: 'var(--fx-h2-size)',
              fontWeight: 700,
              color: 'var(--fx-text-heading)',
              marginBottom: '20px',
              marginTop: 0,
            }}
          >
            Browse Testimonials
          </h2>
          <TestimonialCarousel
            onItemClick={(index) => handleCardClick(allTestimonials[index])}
          >
            {allTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--fx-surface-card)',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Image
                    src={testimonial.imageUrl}
                    alt={testimonial.imageAlt}
                    width={60}
                    height={60}
                    style={{
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--fx-accent)',
                    }}
                  />
                  <div>
                    <h4
                      style={{
                        fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                        fontWeight: 700,
                        color: 'var(--fx-text-heading)',
                        margin: 0,
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    <p
                      style={{
                        color: 'var(--fx-text-muted)',
                        fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                        margin: 0,
                      }}
                    >
                      {testimonial.jobTitle}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    color: 'var(--fx-text-heading)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                    flex: 1,
                    margin: 0,
                  }}
                >
                  &ldquo;{testimonial.quote.substring(0, 120)}...&rdquo;
                </p>
              </div>
            ))}
          </TestimonialCarousel>
        </motion.div>
      </div>

      {/* Testimonial Detail Modal */}
      {selectedTestimonial && (
        <TestimonialModal
          isOpen={modalOpen}
          onDismiss={handleCloseModal}
          testimonial={selectedTestimonial}
        />
      )}
    </UnifiedPageWrapper>
  );
}
