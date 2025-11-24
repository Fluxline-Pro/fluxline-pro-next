import {
  getAllPortfolioProjects,
  getAllPortfolioTags,
  getAllPortfolioTechnologies,
} from './lib/portfolioLoader';
import PortfolioPageClient from './PortfolioPageClient';

/**
 * Portfolio Page - Server Component
 *
 * Loads portfolio data from file system at build time
 * and passes it to the client component for rendering
 * Mirrors the blog page pattern for consistency
 */
export default function PortfolioPage() {
  const projects = getAllPortfolioProjects();
  const allTags = getAllPortfolioTags();
  const allTechnologies = getAllPortfolioTechnologies();

  return (
    <PortfolioPageClient
      projects={projects}
      allTags={allTags}
      allTechnologies={allTechnologies}
    />
  );
}

export const metadata = {
  title: 'Portfolio | Fluxline Resonance Group',
  description:
    'Explore our portfolio of innovative projects spanning web applications, mobile apps, enterprise software, and more. See how we deliver high-quality, user-centered solutions.',
  openGraph: {
    title: 'Portfolio | Fluxline Resonance Group',
    description:
      'Explore our portfolio of innovative projects spanning web applications, mobile apps, enterprise software, and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Fluxline Resonance Group',
    description:
      'Explore our portfolio of innovative projects spanning web applications, mobile apps, enterprise software, and more.',
  },
};
