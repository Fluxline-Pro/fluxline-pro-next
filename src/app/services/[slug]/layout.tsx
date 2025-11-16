/**
 * Service Detail Layout
 * Layout for individual service pages with SEO metadata
 */

import type { Metadata } from 'next';
import { SERVICE_CATEGORIES } from '../constants';

interface ServiceDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate metadata for service detail pages
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Find the service by slug
  const service = SERVICE_CATEGORIES.find((s) => {
    const serviceSlug = s.path.split('/').pop();
    return serviceSlug === slug;
  });

  // Default metadata if service not found
  if (!service) {
    return {
      title: 'Service Not Found | Fluxline Resonance Group',
      description: 'The requested service could not be found.',
    };
  }

  // Remove HTML tags from summary for meta description
  const plainTextSummary = service.summary
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 160);

  return {
    title: `${service.title} | Fluxline Resonance Group`,
    description: plainTextSummary,
    openGraph: {
      title: `${service.title} | Fluxline Resonance Group`,
      description: plainTextSummary,
      type: 'website',
      url: `https://fluxline.pro${service.path}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.title} | Fluxline Resonance Group`,
      description: plainTextSummary,
    },
  };
}

/**
 * Generate static params for all service pages
 */
export async function generateStaticParams() {
  return SERVICE_CATEGORIES.map((service) => ({
    slug: service.path.split('/').pop() || '',
  }));
}

export default function ServiceDetailLayout({
  children,
}: ServiceDetailLayoutProps) {
  return <>{children}</>;
}
