'use client';

/**
 * Service Detail Page
 * Dynamic route for individual service pages
 */

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import FxContainer from '@/theme/components/dsm/FxContainer';
import FxSectionHeading from '@/theme/components/dsm/FxSectionHeading';
import FxCard from '@/theme/components/dsm/FxCard';
import FxCTABand from '@/theme/components/dsm/FxCTABand';
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
import FxRailLayout from '@/theme/components/dsm/FxRailLayout';
import FxReveal from '@/theme/components/dsm/FxReveal';
import DesignImage from '@/assets/images/Portfolio1280x1815.jpg';
import DevelopmentImage from '@/assets/images/GitHubPortrait.jpg';
import PersonalTrainingImage from '@/assets/images/PersonalTrainingPortrait.jpg';
import ResonanceCoreImage from '@/assets/images/LifeCoachingResonanceCore.jpg';
import EducationImage from '@/assets/images/EducationTrainingPortrait.jpg';
import ConsultingImage from '@/assets/images/ConsultingPortrait.jpg';
import ServicesFallbackImage from '@/assets/images/OurServices1197x1600.jpg';

/** Left-rail image per service, keyed by service id. */
const SERVICE_IMAGES: Record<string, { src: string }> = {
  design: DesignImage,
  development: DevelopmentImage,
  'personal-training': PersonalTrainingImage,
  'resonance-core': ResonanceCoreImage,
  'education-training': EducationImage,
  consulting: ConsultingImage,
};

/**
 * Service Detail Page Component
 */
export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Find the service by slug
  const service = SERVICE_CATEGORIES.find((s) => {
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
      development: [
        'Custom web applications and digital platforms',
        'Intuitive UX and resilient infrastructure',
        'CI/CD pipelines and cloud architecture',
        'Full-stack development with long-term maintainability',
        'API design and third-party integrations',
        'Performance optimization and scalability solutions',
      ],
      design: [
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
        'Mindset support and behavioral change strategies',
        'Flexible scheduling and remote coaching options',
      ],
      'resonance-core': [
        'Understand the signals your body and emotions send',
        "Reveal the stories you've been living inside",
        'Name the outdated identities shaping your choices',
        'Update your internal predictions and interpretations',
        "Choose the identity that supports who you're becoming",
        'Take aligned action from your chosen identity',
      ],
      'education-training': [
        'Experiential learning and leadership workshops',
        'Emotional intelligence development',
        'Strategic embodiment coaching',
        'Team leadership and influence cultivation',
        'Custom curriculum design and delivery',
        'Ongoing support and community building',
      ],
      consulting: [
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
  const pricingData = SERVICE_PRICING[service.id];

  const pricingSubtitles: Record<string, string> = {
    'personal-training':
      'Choose your path based on your archetype assessment and personal goals.',
    design:
      "Choose the tier that aligns with your brand's current phase, archetype, and unfolding vision.",
    development:
      'Select the program that matches your project scope and technical requirements.',
  };

  const pricingSubtitle =
    pricingSubtitles[service.id] ||
    'Choose the program that best fits your needs and objectives.';

  const pricingDisclaimers: Record<string, string> = {
    design:
      'Additional services can be added for an extra fee. Rush delivery fees apply for expedited timelines.',
    development:
      'Additional services can be added for an extra fee. Rush delivery fees apply for expedited timelines.',
  };

  const pricingDisclaimer = pricingDisclaimers[service.id];

  const scrollId = SERVICE_SCROLL_MAPPING[service.id];
  const relatedScroll = scrollId ? getScrollById(scrollId) : undefined;

  const serviceImage = SERVICE_IMAGES[service.id] ?? ServicesFallbackImage;

  const rail = (
    <FxReveal variant='left'>
      <div
        style={{
          background: 'var(--fx-surface-inset)',
          border: '1px solid var(--fx-border)',
          borderRadius: 14,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 'clamp(240px, 50vw, 460px)',
            overflow: 'hidden',
            background: 'var(--fx-bg-deep)',
          }}
        >
          <img
            src={serviceImage.src}
            alt={service.title}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </div>
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--fx-border)',
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 17,
              color: 'var(--fx-text-bright)',
            }}
          >
            {service.title}
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'var(--fx-text-soft)',
              marginTop: 3,
            }}
          >
            {service.description}
          </div>
        </div>
      </div>
    </FxReveal>
  );

  return (
    <FxContainer style={{ padding: '64px 32px 88px' }}>
      <FxRailLayout rail={rail}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          {/* Hero Section */}
          <FxReveal>
            <div>
              <FxSectionHeading
                title={service.title}
                subhead={service.description}
                as='h1'
              />
              <div
                style={{
                  color: 'var(--fx-text-body)',
                  fontSize: '1.125rem',
                  lineHeight: 1.7,
                  marginTop: 4,
                }}
                dangerouslySetInnerHTML={{ __html: service.summary }}
              />
            </div>
          </FxReveal>

          {/* Related Scroll/White Paper Section */}
          {relatedScroll && (
            <>
              <FxReveal>
                <ServiceScrollSection scroll={relatedScroll} />
              </FxReveal>
              <hr
                style={{
                  border: 'none',
                  height: '1px',
                  backgroundColor: 'var(--fx-border)',
                }}
              />
            </>
          )}

          {/* Features Section */}
          {features.length > 0 && (
            <>
              <FxReveal>
                <section
                  style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                >
                  <h2
                    style={{
                      color: 'var(--fx-accent)',
                      fontSize: 'var(--fx-h2-size)',
                      fontWeight: 700,
                      margin: 0,
                    }}
                  >
                    What We Offer
                  </h2>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(auto-fill, minmax(280px, 1fr))',
                      gap: 16,
                      paddingTop: 8,
                    }}
                  >
                    {features.map((feature, index) => (
                      <FxCard key={index} variant='standard'>
                        <p
                          style={{
                            color: 'var(--fx-text-body)',
                            fontSize: 'var(--fx-body-size)',
                            lineHeight: 1.7,
                            margin: 0,
                          }}
                        >
                          {feature}
                        </p>
                      </FxCard>
                    ))}
                  </div>
                </section>
              </FxReveal>
              <hr
                style={{
                  border: 'none',
                  height: '1px',
                  backgroundColor: 'var(--fx-border)',
                }}
              />
            </>
          )}

          {/* Pricing Table (if available) */}
          {pricingData && (
            <>
              <FxReveal>
                <section>
                  <ProgramTiersTable
                    tiers={pricingData.tiers}
                    onViewComparison={() => setIsComparisonModalOpen(true)}
                    showComparisonButton={true}
                    subtitle={pricingSubtitle}
                    firstColumnWidth={
                      service.id === 'personal-training' ? '26%' : undefined
                    }
                  />

                  {/* Pricing Disclaimer */}
                  {pricingDisclaimer && (
                    <div
                      style={{
                        marginTop: 20,
                        padding: 12,
                        backgroundColor: 'var(--fx-surface-card)',
                        borderLeft: '4px solid var(--fx-accent)',
                        borderRadius: 4,
                      }}
                    >
                      <p
                        style={{
                          color: 'var(--fx-text-body)',
                          fontSize: '0.9375rem',
                          fontStyle: 'italic',
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        <strong
                          style={{
                            color: 'var(--fx-accent)',
                            fontWeight: 600,
                          }}
                        >
                          Note:
                        </strong>{' '}
                        {pricingDisclaimer}
                      </p>
                    </div>
                  )}
                </section>
              </FxReveal>

              <hr
                style={{
                  border: 'none',
                  height: '1px',
                  backgroundColor: 'var(--fx-border)',
                }}
              />
            </>
          )}

          {/* CTA Section */}
          <FxReveal>
            <FxCTABand
              title='Ready to Begin?'
              body='Book a 20-30 minute consultation to explore your personal identity and aligning your decisions with it.'
              primaryLabel='Book a Consultation'
              primaryHref='/bookings'
            />
          </FxReveal>

          {/* Related Services */}
          <FxReveal>
            <RelatedServices currentServiceId={service.id} />
          </FxReveal>
        </div>
      </FxRailLayout>

      {/* Program Comparison Modal */}
      {pricingData && (
        <ProgramComparisonModal
          isOpen={isComparisonModalOpen}
          onClose={() => setIsComparisonModalOpen(false)}
          pricingData={pricingData}
        />
      )}
    </FxContainer>
  );
}
