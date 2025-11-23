import {
  getAllPortfolioProjects,
  getAllPortfolioTags,
  getAllPortfolioTechnologies,
} from './portfolioData';
import PortfolioPageClient from './PortfolioPageClient';

/**
 * Portfolio Page - Server Component
 * 
 * This server component loads portfolio data at build time
 * and passes it to the client component for rendering
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
