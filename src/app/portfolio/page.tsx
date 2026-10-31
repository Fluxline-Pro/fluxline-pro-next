import {
  getAllPortfolioProjects,
  getAllPortfolioTags,
  getAllPortfolioTechnologies,
} from './lib/portfolioLoader';
import { PortfolioClientWrapper } from './PortfolioClientWrapper';

/**
 * Portfolio Page - Server Component
 *
 * Loads portfolio data from file system at build time
 * and passes it to the client wrapper for rendering
 */
export default function PortfolioPage() {
  const projects = getAllPortfolioProjects();
  const allTags = getAllPortfolioTags();
  const allTechnologies = getAllPortfolioTechnologies();

  return (
    <PortfolioClientWrapper
      projects={projects}
      allTags={allTags}
      allTechnologies={allTechnologies}
    />
  );
}

export const metadata = {
  title: 'Portfolio: Brand Identity & Web Development',
  description:
    'Brand identity, web development, and digital architecture projects, from a healthcare patient portal and enterprise intranet to design systems and dashboards.',
  keywords:
    'portfolio, web development, mobile apps, enterprise software, case studies, project showcase, technology solutions',
  openGraph: {
    title: 'Portfolio: Brand Identity & Web Development | Fluxline.pro',
    description:
      'Brand identity, web development, and digital architecture projects, from a healthcare patient portal and enterprise intranet to design systems and dashboards.',
    url: 'https://www.fluxline.pro/portfolio',
    siteName: 'Fluxline',
    type: 'website',
    images: [
      {
        url: '/images/FluxlineLogo.png',
        width: 1200,
        height: 630,
        alt: 'Fluxline Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio: Brand Identity & Web Development | Fluxline.pro',
    description:
      'Brand identity, web development, and digital architecture projects, from a healthcare patient portal and enterprise intranet to design systems and dashboards.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/portfolio',
  },
};
