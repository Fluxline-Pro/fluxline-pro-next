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
  title: 'Portfolio',
  description:
    'Explore our portfolio of innovative projects spanning web applications, mobile apps, enterprise software, and more. See how we deliver high-quality, user-centered solutions.',
  keywords:
    'portfolio, web development, mobile apps, enterprise software, case studies, project showcase, technology solutions',
  openGraph: {
<<<<<<< HEAD
    title: 'Portfolio - Fluxline',
    description:
      'Explore our portfolio of innovative projects spanning web applications, mobile apps, enterprise software, and more.',
    url: 'https://www.fluxline.pro/portfolio',
    siteName: 'Fluxline',
=======
    title: 'Portfolio - Fluxline Professional Services',
    description:
      'Explore our portfolio of innovative projects spanning web applications, mobile apps, enterprise software, and more.',
    url: 'https://www.fluxline.pro/portfolio',
    siteName: 'Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
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
<<<<<<< HEAD
    title: 'Portfolio - Fluxline',
=======
    title: 'Portfolio - Fluxline Professional Services',
>>>>>>> 2c095a7 (Add SEO metadata to legal pages, portfolio, scrolls, and enhance root layout)
    description:
      'Explore our portfolio of innovative projects spanning web applications, mobile apps, enterprise software, and more.',
    images: ['/images/FluxlineLogo.png'],
  },
  alternates: {
    canonical: '/portfolio',
  },
};
