import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore client success stories and discover how strategic transformation drives measurable results across various industries.',
  openGraph: {
    title: 'Case Studies - Fluxline',
    description:
      'Client success stories showcasing strategic transformation and measurable results.',
    url: 'https://www.fluxline.pro/case-studies',
    siteName: 'Fluxline',
    type: 'website',
  },
  alternates: {
    canonical: '/case-studies',
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
