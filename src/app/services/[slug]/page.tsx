'use client';

/**
 * Service Detail Page
 * Dynamic route for individual service pages
 */

import React from 'react';
import { notFound } from 'next/navigation';
import { SimplePageWrapper } from '@/components/SimplePageWrapper';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';
import { Breadcrumb } from '@/theme/components/breadcrumb';
import { SERVICE_CATEGORIES } from '../constants';
import type { ServiceCategory } from '../constants';
import Link from 'next/link';

interface ServiceDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * ServiceDetailHero Component
 * Hero section for service detail page
 */
const ServiceDetailHero: React.FC<{ service: ServiceCategory }> = ({
  service,
}) => {
  const { theme } = useAppTheme();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <FluentIcon
          iconName={service.icon}
          size="xLarge"
          color={theme.palette.themePrimary}
        />
        <Typography
          variant="h1"
          style={{
            color: theme.palette.themePrimary,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: theme.typography.fontWeights.bold,
          }}
        >
          {service.title}
        </Typography>
      </div>

      <Typography
        variant="p"
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '1.25rem',
          lineHeight: theme.typography.lineHeights.relaxed,
        }}
      >
        {service.description}
      </Typography>
    </div>
  );
};

/**
 * ServiceDetailContent Component
 * Main content section with HTML summary
 */
const ServiceDetailContent: React.FC<{ service: ServiceCategory }> = ({
  service,
}) => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: theme.borderRadius.container.medium,
        border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          color: theme.palette.neutralPrimary,
          fontSize: '1.125rem',
          lineHeight: theme.typography.lineHeights.relaxed,
        }}
        dangerouslySetInnerHTML={{ __html: service.summary }}
      />
    </div>
  );
};

/**
 * ServiceFeatures Component
 * Key features and benefits section
 */
const ServiceFeatures: React.FC<{ service: ServiceCategory }> = ({
  service,
}) => {
  const { theme } = useAppTheme();

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

  if (features.length === 0) return null;

  return (
    <div className="space-y-4">
      <Typography
        variant="h2"
        style={{
          color: theme.palette.themePrimary,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: theme.typography.fontWeights.semiBold,
        }}
      >
        What We Offer
      </Typography>

      <div className="grid gap-4 md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              gap: '1rem',
              padding: '1rem',
              borderRadius: theme.borderRadius.container.small,
              backgroundColor: 'transparent',
              border: `1px solid ${theme.palette.neutralQuaternaryAlt}`,
            }}
          >
            <FluentIcon
              iconName="CheckMark"
              size="medium"
              color={theme.palette.themeTertiary}
            />
            <Typography
              variant="p"
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '1rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              {feature}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * RelatedServices Component
 * Shows related services
 */
const RelatedServices: React.FC<{ currentServiceId: string }> = ({
  currentServiceId,
}) => {
  const { theme } = useAppTheme();

  // Get 3 related services (excluding current)
  const relatedServices = SERVICE_CATEGORIES.filter(
    (s) => s.id !== currentServiceId
  ).slice(0, 3);

  if (relatedServices.length === 0) return null;

  return (
    <div className="space-y-6">
      <Typography
        variant="h2"
        style={{
          color: theme.palette.themePrimary,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: theme.typography.fontWeights.semiBold,
        }}
      >
        Related Services
      </Typography>

      <div className="grid gap-4 md:grid-cols-3">
        {relatedServices.map((service) => (
          <Link
            key={service.id}
            href={service.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1.5rem',
              borderRadius: theme.borderRadius.container.medium,
              border: `1px solid ${theme.palette.neutralTertiaryAlt}`,
              backgroundColor: 'transparent',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = theme.shadows.m;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FluentIcon
              iconName={service.icon}
              size="large"
              color={theme.palette.themePrimary}
              style={{ marginBottom: '1rem' }}
            />
            <Typography
              variant="h3"
              style={{
                color: theme.palette.themePrimary,
                fontSize: '1.25rem',
                fontWeight: theme.typography.fontWeights.semiBold,
                marginBottom: '0.5rem',
              }}
            >
              {service.title}
            </Typography>
            <Typography
              variant="p"
              style={{
                color: theme.palette.neutralSecondary,
                fontSize: '0.875rem',
                lineHeight: theme.typography.lineHeights.relaxed,
              }}
            >
              {service.description}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

/**
 * ServiceCTA Component
 * Call to action section
 */
const ServiceCTA: React.FC = () => {
  const { theme } = useAppTheme();

  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: theme.borderRadius.container.medium,
        border: `2px solid ${theme.palette.themeTertiary}`,
        backgroundColor: 'transparent',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        style={{
          color: theme.palette.themePrimary,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: theme.typography.fontWeights.semiBold,
          marginBottom: '1rem',
        }}
      >
        Ready to Begin?
      </Typography>
      <Typography
        variant="p"
        style={{
          color: theme.palette.neutralSecondary,
          fontSize: '1.125rem',
          lineHeight: theme.typography.lineHeights.relaxed,
          marginBottom: '1.5rem',
        }}
      >
        Let&apos;s design the systems, strategies, and rituals that align your
        vision with reality.
      </Typography>
      <Link
        href="/contact"
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          borderRadius: theme.borderRadius.container.small,
          backgroundColor: theme.palette.themePrimary,
          color: theme.palette.white,
          textDecoration: 'none',
          fontSize: '1rem',
          fontWeight: theme.typography.fontWeights.semiBold,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.palette.themeSecondary;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = theme.palette.themePrimary;
        }}
      >
        Get in Touch
      </Link>
    </div>
  );
};

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
      <div className="space-y-12">
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
