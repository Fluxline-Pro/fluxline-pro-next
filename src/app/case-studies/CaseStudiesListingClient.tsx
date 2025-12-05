'use client';

import React from 'react';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
import { getIconForPath } from '@/utils/navigation-icons';
import { CaseStudy } from './types';
import FluxlineLogoDarkMode from '@/assets/images/FluxlineLogoDarkMode.png';

interface CaseStudiesListingClientProps {
  caseStudies: CaseStudy[];
}

/**
 * Case Studies Listing - Client Component
 * Handles filtering and transforming case studies data
 */
export default function CaseStudiesListingClient({
  caseStudies: allCaseStudies,
}: CaseStudiesListingClientProps) {
  // Filter state
  const [selectedIndustries, setSelectedIndustries] = React.useState<string[]>(
    []
  );

  // Get all unique industries
  const allIndustries = React.useMemo(() => {
    const industries = new Set(allCaseStudies.map((study) => study.industry));
    return Array.from(industries).sort();
  }, [allCaseStudies]);

  // Filter case studies based on selected industries
  const caseStudies = React.useMemo(() => {
    if (selectedIndustries.length === 0) {
      return allCaseStudies;
    }
    return allCaseStudies.filter((study) =>
      selectedIndustries.includes(study.industry)
    );
  }, [allCaseStudies, selectedIndustries]);

  // Transform case studies to card format
  const cards = React.useMemo(() => {
    return caseStudies.map((study) => ({
      id: study.id,
      title: study.title,
      description: study.description,
      imageUrl: study.imageUrl || FluxlineLogoDarkMode.src,
      imageAlt: study.imageAlt || study.title,
      imageText: `${study.client} • ${study.industry}`,
    }));
  }, [caseStudies]);

  // Configure filters
  const filters: FilterConfig[] = [
    {
      type: 'multi',
      label: 'Industry',
      placeholder: 'All Industries',
      options: allIndustries.map((industry) => ({
        key: industry,
        text: industry,
      })),
      selectedKeys: selectedIndustries,
      onChange: setSelectedIndustries,
    },
  ];

  // Build results message
  const resultsMessage = `Showing ${caseStudies.length} ${caseStudies.length === 1 ? 'case study' : 'case studies'}${selectedIndustries.length > 0 ? ` in: ${selectedIndustries.join(', ')}` : ''}`;

  return (
    <ContentListingPage
      title='Case Studies'
      iconName={getIconForPath('/case-studies') || 'ReadingMode'}
      description='Explore our client success stories and discover how strategic transformation drives measurable results. From digital transformation to wellness platforms, see how we partner with organizations to achieve their most ambitious goals.'
      basePath='/case-studies'
      cards={cards}
      filters={filters}
      resultsMessage={resultsMessage}
      emptyStateTitle='No case studies found'
      emptyStateMessage='Check back soon for client success stories.'
      ctaSection={{
        title: 'Ready to Transform Your Business?',
        description:
          "Join the growing list of organizations achieving measurable results with Fluxline's strategic approach to transformation.",
        buttons: [
          {
            label: 'View Our Services',
            variant: 'primary',
            path: '/services',
          },
          {
            label: 'Start Your Transformation',
            variant: 'secondary',
            path: '/contact',
          },
        ],
      }}
    />
  );
}
