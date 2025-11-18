'use client';

import React, { useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
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
  const { theme } = useAppTheme();
  const orientation = useDeviceOrientation();
  
  // Get testimonials data
  const allTestimonials = getAllTestimonials();
  const featuredTestimonials = getFeaturedTestimonials();
  const regularTestimonials = allTestimonials.filter((t) => !t.featured);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(
    null
  );

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
    <PageWrapper>
      <div
        style={{
          padding: theme.spacing.xl,
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          style={{
            textAlign: 'center',
            marginBottom: theme.spacing.xxl,
          }}
        >
          <Typography
            variant="h1"
            style={{
              color: theme.palette.themePrimary,
              marginBottom: theme.spacing.m,
              fontSize: theme.typography.fontSizes.clamp8,
            }}
          >
            What Our Clients Say
          </Typography>
          <Typography
            variant="p"
            style={{
              color: theme.palette.neutralSecondary,
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: theme.typography.fontSizes.clamp4,
            }}
          >
            Hear from the businesses and individuals we&apos;ve helped transform through
            strategic consulting, training, and development services.
          </Typography>
        </motion.div>

        {/* Featured Testimonials Carousel */}
        {featuredTestimonials.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: theme.spacing.xxl }}
          >
            <Typography
              variant="h2"
              style={{
                color: theme.palette.neutralPrimary,
                marginBottom: theme.spacing.l,
                fontSize: theme.typography.fontSizes.clamp6,
              }}
            >
              Featured Testimonials
            </Typography>
            <TestimonialCarousel
              onItemClick={(index) => handleCardClick(featuredTestimonials[index])}
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
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: theme.spacing.xxl }}
        >
          <Typography
            variant="h2"
            style={{
              color: theme.palette.neutralPrimary,
              marginBottom: theme.spacing.l,
              fontSize: theme.typography.fontSizes.clamp6,
            }}
          >
            All Testimonials
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
              gap: theme.spacing.l,
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
                  viewType="grid"
                  onClick={() => handleCardClick(testimonial)}
                  elevation="medium"
                  imageText={testimonial.company}
                  showTitleOnImage={false}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Browse Testimonials Carousel */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          transition={{ delay: 0.6 }}
        >
          <Typography
            variant="h2"
            style={{
              color: theme.palette.neutralPrimary,
              marginBottom: theme.spacing.l,
              fontSize: theme.typography.fontSizes.clamp6,
            }}
          >
            Browse Testimonials
          </Typography>
          <TestimonialCarousel
            onItemClick={(index) => handleCardClick(allTestimonials[index])}
          >
            {allTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                style={{
                  padding: theme.spacing.m,
                  backgroundColor: theme.palette.neutralLighterAlt,
                  borderRadius: '8px',
                  boxShadow: theme.effects.elevation4,
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: theme.spacing.s2,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.s2,
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
                      border: `2px solid ${theme.palette.themePrimary}`,
                    }}
                  />
                  <div>
                    <Typography
                      variant="h4"
                      style={{
                        color: theme.palette.neutralPrimary,
                        fontSize: theme.typography.fontSizes.clamp4,
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="p"
                      style={{
                        color: theme.palette.neutralSecondary,
                        fontSize: theme.typography.fontSizes.clamp2,
                      }}
                    >
                      {testimonial.jobTitle}
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="p"
                  style={{
                    color: theme.palette.neutralPrimary,
                    fontStyle: 'italic',
                    fontSize: theme.typography.fontSizes.clamp3,
                    flex: 1,
                  }}
                >
                  "                  &ldquo;{testimonial.quote.substring(0, 120)}...&rdquo;"
                </Typography>
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
    </PageWrapper>
  );
}
