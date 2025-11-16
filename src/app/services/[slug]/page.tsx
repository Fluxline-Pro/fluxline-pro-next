/**
 * Service Detail Page
 * Dynamic route for individual service pages
 */

import React from 'react';
import { notFound } from 'next/navigation';
import { SimplePageWrapper } from '@/components/SimplePageWrapper';
import { Breadcrumb } from '@/theme/components/breadcrumb';
import { SERVICE_CATEGORIES } from '../constants';
import { ServiceDetailHero } from './components/service-detail-hero';
import { ServiceDetailContent } from './components/service-detail-content';
import { ServiceFeatures } from './components/service-features';
import { RelatedServices } from './components/related-services';
import { ServiceCTA } from './components/service-cta';

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
    <SimplePageWrapper>
      <div className='space-y-12'>
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Hero Section */}
        <ServiceDetailHero service={service} />

        {/* Main Content */}
        <ServiceDetailContent service={service} />

        {/* Features Section */}
        <ServiceFeatures service={service} />

        {/* CTA Section */}
        <ServiceCTA />

        {/* Related Services */}
        <RelatedServices currentServiceId={service.id} />
      </div>
    </SimplePageWrapper>
  );
}
