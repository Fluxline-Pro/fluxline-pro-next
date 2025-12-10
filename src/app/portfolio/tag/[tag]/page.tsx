import React from 'react';
import {
  getAllPortfolioProjects,
  getAllPortfolioTags,
} from '../../lib/portfolioLoader';
import { PortfolioTagClient } from './PortfolioTagClient';
import { notFound } from 'next/navigation';

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllPortfolioTags();
  return tags.map((tag) => ({
    tag: tag,
  }));
}

interface PortfolioTagPageProps {
  params: Promise<{ tag: string }>;
}

/**
 * Portfolio Tag Filter Page - Server Component
 * Handles static generation and passes data to client component
 */
export default async function PortfolioTagPage({
  params,
}: PortfolioTagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  // Get all projects and filter by tag
  const allProjects = getAllPortfolioProjects();
  const projects = allProjects.filter((project) =>
    project.tags.includes(decodedTag)
  );

  if (projects.length === 0) {
    notFound();
  }

  return <PortfolioTagClient tag={decodedTag} projects={projects} />;
}
