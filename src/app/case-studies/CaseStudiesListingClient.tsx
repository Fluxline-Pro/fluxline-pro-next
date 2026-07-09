'use client';

import React from 'react';
import {
  ContentListingPage,
  FilterConfig,
} from '@/components/ContentListingPage';
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
  const [selectedIndustry, setSelectedIndustry] = React.useState<
    string | undefined
  >();

  // Get all unique industries
  const allIndustries = React.useMemo(() => {
    const industries = new Set(allCaseStudies.map((study) => study.industry));
    return Array.from(industries).sort();
  }, [allCaseStudies]);

  // Filter case studies based on selected industry
  const caseStudies = React.useMemo(() => {
    if (!selectedIndustry) return allCaseStudies;
    return allCaseStudies.filter((study) => study.industry === selectedIndustry);
  }, [allCaseStudies, selectedIndustry]);

  // Transform case studies to card format
  const cards = React.useMemo(() => {
    return caseStudies.map((study) => ({
      id: study.id,
      title: study.title,
      description: study.description,
      imageUrl: study.imageUrl || FluxlineLogoDarkMode.src,
      imageAlt: study.imageAlt || study.title,
      imageText: `${study.client} • ${study.industry}`,
      date: study.publishedDate,
      category: study.industry,
    }));
  }, [caseStudies]);

  // Configure filters
  const filters: FilterConfig[] = [
    {
      type: 'single',
      label: 'Industry',
      options: [
        { key: '', text: 'All' },
        ...allIndustries.map((industry) => ({
          key: industry,
          text: industry,
        })),
      ],
      value: selectedIndustry,
      onChange: setSelectedIndustry,
    },
  ];

  return (
    <ContentListingPage
      title="Impact in Practice"
      kicker="Case Studies"
      subhead="Strategies and results across industries."
      description="Explore our client success stories and discover how strategic transformation drives measurable results."
      basePath="/case-studies"
      cards={cards}
      filters={filters}
      emptyStateTitle="No case studies found"
      emptyStateMessage="Check back soon for client success stories."
      onClearFilters={() => setSelectedIndustry(undefined)}
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
