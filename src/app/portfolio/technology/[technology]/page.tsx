import React from 'react';
import {
  getAllPortfolioProjects,
  getAllPortfolioTechnologies,
} from '../../lib/portfolioLoader';
import { PortfolioTechnologyClient } from './PortfolioTechnologyClient';
import { notFound } from 'next/navigation';

// Generate static params for all technologies
export async function generateStaticParams() {
  const technologies = getAllPortfolioTechnologies();

  // Ensure we return an array even if empty
  if (!technologies || technologies.length === 0) {
    console.warn('No portfolio technologies found for static generation');
    return [];
  }

  return technologies.map((technology) => ({
    technology: technology,
  }));
}

interface PortfolioTechnologyPageProps {
  params: Promise<{ technology: string }>;
}

/**
 * Portfolio Technology Filter Page - Server Component
 * Handles static generation and passes data to client component
 */
export default async function PortfolioTechnologyPage({
  params,
}: PortfolioTechnologyPageProps) {
  const { technology } = await params;
  const decodedTechnology = decodeURIComponent(technology);

  // Get all projects and filter by technology
  const allProjects = getAllPortfolioProjects();
  const projects = allProjects.filter((project) =>
    project.technologies.includes(decodedTechnology)
  );

  if (projects.length === 0) {
    notFound();
  }

  return (
    <PortfolioTechnologyClient
      technology={decodedTechnology}
      projects={projects}
    />
  );
}
