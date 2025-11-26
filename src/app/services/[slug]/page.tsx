'use client';

/**
 * Service Detail Page
 * Dynamic route for individual service pages
 */

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Callout } from '@/theme/components/callout/Callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { InteractiveCard } from '@/components/InteractiveCard';
import { Typography } from '@/theme/components/typography';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import {
  ProgramTiersTable,
  ProgramComparisonModal,
} from '@/theme/components/pricing';
import { SERVICE_CATEGORIES } from '../constants';
import { SERVICE_PRICING } from '../pricing-data';
import { SERVICE_SCROLL_MAPPING } from '../scroll-mapping';
import { getScrollById } from '../scrolls/scrollsData';
import { RelatedServices } from './components/related-services';
import { ServiceScrollSection } from './components/service-scroll-section';

/**
 * Service Detail Page Component
 */
export default function ServiceDetailPage() {
  const params = useParams();
  const { theme } = useAppTheme();
  const slug = params.slug as string;
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Find the service by slug
  const service = SERVICE_CATEGORIES.find((s) => {
    // Extract slug from path (e.g., /services/consulting -> consulting)
    const serviceSlug = s.path.split('/').pop();
    return serviceSlug === slug;
  });

  // If service not found, show 404
  if (!service) {
    notFound();
  }

  // Define features based on service type
  const getFeatures = (serviceId: string): string[] => {
    const featuresMap: Record<string, string[]> = {
      'development': [
        'Custom web applications and digital platforms',
        'Intuitive UX and resilient infrastructure',
        'CI/CD pipelines and cloud architecture',
        'Full-stack development with long-term maintainability',
        'API design and third-party integrations',
        'Performance optimization and scalability solutions',
      ],
      'design': [
        'Visual identity and brand architecture',
        'Digital experience design',
        'Modular design systems',
        'Symbolic and emotionally resonant design',
        'User-centered design methodologies and thinking',
        'Cross-platform consistency and responsiveness',
      ],
      'personal-training': [
        'Personalized fitness and wellness coaching',
        'Adaptive training systems for all bodies',
        'Movement patterns and chronic pain management',
        'Emotional intelligence in physical transformation',
        'Mindset supupport and behavioral change strategies',
        'Flexible scheduling and remote coaching options',
      ],
      'resonance-core': [
        'Archetypal mapping and identity exploration',
        'Emotional emergence and breakthrough documentation',
        'Symbolic rituals and transformational practices',
        'Legacy building and mission alignment',
        'Community resonance and network cultivation',
        'Ongoing mentorship and evolutionary support',
      ],
      'education-training': [
        'Experiential learning and leadership workshops',
        'Emotional intelligence development',
        'Strategic embodiment coaching',
        'Team leadership and influence cultivation',
        'Custom curriculum design and delivery',
        'Ongoing support and community building',
      ],
      'consulting': [
        'Strategic systems design and operational optimization',
        'Modular frameworks for scalable growth',
        'Tech integration and infrastructure planning',
        'Business soul alignment and values-driven strategy',
        'Change management and transformation facilitation',
        'Leadership coaching and team dynamics',
      ],
    };
    return featuresMap[serviceId] || [];
  };

  const features = getFeatures(service.id);
  // Check if this service has pricing data
  const pricingData = SERVICE_PRICING[service.id];

  // Get related scroll/white paper
  const scrollId = SERVICE_SCROLL_MAPPING[service.id];
  const relatedScroll = scrollId ? getScrollById(scrollId) : undefined;

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-12'>
        {/* Hero Section with Icon, Title, Description, and Summary */}
        <Hero
          title={service.title}
          iconName={service.icon}
          subtitle={service.description}
          backArrow={true}
        >
          <div
            style={{
              color: theme.palette.neutralSecondary,
              fontSize: '1.125rem',
              lineHeight: '1.7',
            }}
            dangerouslySetInnerHTML={{ __html: service.summary }}
          />
        </Hero>

        {/* Related Scroll/White Paper Section */}
        {relatedScroll && (
          <>
            <ServiceScrollSection scroll={relatedScroll} />
            {/* Divider */}
            <hr
              style={{
                border: 'none',
                height: '1px',
                backgroundColor: theme.palette.neutralQuaternary,
              }}
            />
          </>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <>
            <section className='space-y-6'>
              <Typography
                variant='h2'
                style={{
                  color: theme.palette.themePrimary,
                  fontSize: '2rem',
                  fontWeight: theme.typography.fontWeights.bold,
                }}
              >
                What We Offer
              </Typography>

              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {features.map((feature, index) => (
                  <InteractiveCard
                    key={index}
                    id={`feature-${service.id}-${index}`}
                    title=''
                    description={feature}
                    icon='CheckMark'
                    iconPosition='left'
                  />
                ))}
              </div>
            </section>
            <hr
              style={{
                border: 'none',
                height: '1px',
                backgroundColor: theme.palette.neutralQuaternary,
              }}
            />
          </>
        )}

        {/* Pricing Table (if available) */}
        {pricingData && (
          <>
            <section>
              <ProgramTiersTable
                tiers={pricingData.tiers}
                onViewComparison={() => setIsComparisonModalOpen(true)}
                showComparisonButton={true}
              />
            </section>

            <hr
              style={{
                border: 'none',
                height: '1px',
                backgroundColor: theme.palette.neutralQuaternary,
              }}
            />
          </>
        )}

        {/* CTA Section */}
        <Callout
          variant='accent'
          title='Ready to Begin?'
          subtitle="Let's design the systems, strategies, and rituals that align your vision with reality."
          action={
            <FormButton
              text='Get in Touch'
              variant='primary'
              size='large'
              icon='ChevronRight'
              iconPosition='right'
              onClick={() => (window.location.href = '/contact')}
            />
          }
        />
        {/* Related Services */}
        <RelatedServices currentServiceId={service.id} />
      </div>

      {/* Program Comparison Modal */}
      {pricingData && (
        <ProgramComparisonModal
          isOpen={isComparisonModalOpen}
          onClose={() => setIsComparisonModalOpen(false)}
          pricingData={pricingData}
        />
      )}
    </UnifiedPageWrapper>
  );
}
