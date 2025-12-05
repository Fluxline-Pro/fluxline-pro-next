import React from 'react';
import { getAllCaseStudies } from './lib/caseStudyLoader';
import CaseStudiesListingClient from './CaseStudiesListingClient';

/**
 * Case Studies Page - Server Component
 * Loads case studies from Markdown files and passes to client component
 */
export default async function CaseStudiesPage() {
  const allCaseStudies = getAllCaseStudies();

  return <CaseStudiesListingClient caseStudies={allCaseStudies} />;
}
