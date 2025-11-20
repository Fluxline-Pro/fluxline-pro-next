/**
 * Service Detail Page
 * Dynamic route for individual service pages
 */

import React from 'react';
import { notFound } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { SERVICE_CATEGORIES } from '../constants';
import { ServiceDetailHero } from './components/service-detail-hero';
import { ServiceDetailContent } from './components/service-detail-content';
import { ServiceFeatures } from './components/service-features';
import { RelatedServices } from './components/related-services';
import { ServiceCTA } from './components/service-cta';
import { CTACallout } from '../components/CTACallout';

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Service Detail Page Component
 */
export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;

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

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-12'>
        {/* Hero Section */}
        <ServiceDetailHero service={service} />

        {/* Primary CTA Callout - Based on service type */}
        {service.id === 'personal-training' && (
          <CTACallout
            emoji='💡'
            title='Take our Emotional Archetype Assessment'
            description='Discover your emotional archetype to help us better understand your drives and motivations.'
            buttonHref='/contact'
            buttonText='Take Assessment'
          />
        )}

        {service.id === 'consulting' && (
          <CTACallout
            emoji='👉'
            title="Your vision is calling. Let's architect it into form."
            description="Let's get your personalized plan started! Click this button to book a free, no obligation consultation with us to discuss your business needs."
            buttonHref='/contact'
            buttonText='Book Consultation'
          />
        )}

        {service.id === 'development' && (
          <CTACallout
            emoji='👉'
            title="Ready to build something extraordinary?"
            description="Book your free consultation to discuss your project vision and technical requirements."
            buttonHref='/contact'
            buttonText='Start Your Project'
          />
        )}

        {service.id === 'design' && (
          <CTACallout
            emoji='👉'
            title="Let's bring your brand to life."
            description="Schedule a consultation to explore how we can architect your visual identity and digital experience."
            buttonHref='/contact'
            buttonText='Begin Design Journey'
          />
        )}

        {service.id === 'education-training' && (
          <CTACallout
            emoji='👉'
            title="Elevate your leadership presence."
            description="Connect with us to design your custom coaching and education program."
            buttonHref='/contact'
            buttonText='Get Started'
          />
        )}

        {service.id === 'resonance-core' && (
          <CTACallout
            emoji='💡'
            title="Begin your transformation journey."
            description="Discover how the Resonance Core Framework can guide your personal evolution and sovereign emergence."
            buttonHref='/contact'
            buttonText='Start Coaching'
          />
        )}

        {/* Main Content */}
        <ServiceDetailContent service={service} />

        {/* Features Section */}
        <ServiceFeatures service={service} />

        {/* CTA Section */}
        <ServiceCTA />

        {/* Related Services */}
        <RelatedServices currentServiceId={service.id} />
      </div>
    </UnifiedPageWrapper>
  );
}
