'use client';

/**
 * Service Detail Page
 * Dynamic route for individual service pages
 */

import React from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';
import { Hero } from '@/theme/components/hero/Hero';
import { Callout } from '@/theme/components/callout/Callout';
import { FormButton } from '@/theme/components/form/FormButton';
import { InteractiveCard } from '@/components/InteractiveCard';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { SERVICE_CATEGORIES } from '../constants';
import { RelatedServices } from './components/related-services';

/**
 * Service Detail Page Component
 */
export default function ServiceDetailPage() {
  const params = useParams();
  const { theme } = useAppTheme();
  const slug = params.slug as string;

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
      consulting: [
        'Strategic systems design and operational optimization',
        'Modular frameworks for scalable growth',
        'Tech integration and infrastructure planning',
        'Business soul alignment and values-driven strategy',
      ],
      development: [
        'Custom web applications and digital platforms',
        'Intuitive UX and resilient infrastructure',
        'CI/CD pipelines and cloud architecture',
        'Full-stack development with long-term maintainability',
      ],
      design: [
        'Visual identity and brand architecture',
        'Digital experience design',
        'Modular design systems',
        'Symbolic and emotionally resonant design',
      ],
      'personal-training': [
        'Personalized fitness and wellness coaching',
        'Adaptive training systems for all bodies',
        'Movement patterns and chronic pain management',
        'Emotional intelligence in physical transformation',
      ],
      'education-training': [
        'Experiential learning and leadership workshops',
        'Emotional intelligence development',
        'Strategic embodiment coaching',
        'Team leadership and influence cultivation',
      ],
      'resonance-core': [
        'Archetypal mapping and identity exploration',
        'Emotional emergence and breakthrough documentation',
        'Symbolic rituals and transformational practices',
        'Legacy building and mission alignment',
      ],
    };
    return featuresMap[serviceId] || [];
  };

  const features = getFeatures(service.id);

  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className='space-y-12'>
        {/* Hero Section with Icon, Title, Description, and Summary */}
        <Hero
          title={service.title}
          iconName={service.icon}
          subtitle={service.description}
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

        {/* Features Section */}
        {features.length > 0 && (
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
    </UnifiedPageWrapper>
  );
}
