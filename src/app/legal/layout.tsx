import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal & Reference',
  description:
    'Access legal documents and reference materials for Fluxline Resonance Group, including terms of use, privacy policy, and glossary.',
  openGraph: {
    title: 'Legal & Reference - Fluxline',
    description:
      'Access legal documents and reference materials for Fluxline Resonance Group.',
    url: 'https://www.fluxline.pro/legal',
    siteName: 'Fluxline',
    type: 'website',
  },
  alternates: {
    canonical: '/legal',
  },
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
