import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulting, Design & Coaching Case Studies',
  description:
    'Case studies in digital architecture, brand design, and coaching, including Azure and SharePoint infrastructure work for Intermountain Health.',
  openGraph: {
    title: 'Consulting, Design & Coaching Case Studies | Fluxline.pro',
    description:
      'Case studies in digital architecture, brand design, and coaching, including Azure and SharePoint infrastructure work for Intermountain Health.',
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
