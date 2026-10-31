import type { Metadata } from 'next';

export const metadata: Metadata = {
  // A plain string title here would drop the root '%s | Fluxline.pro'
  // template for every detail page below this layout.
  title: {
    default: 'Consulting, Design & Coaching Case Studies',
    template: '%s | Fluxline.pro',
  },
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
