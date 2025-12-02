import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press Release',
  description:
    'Public announcements, media features, and milestone broadcasts from Fluxline Resonance Group.',
  openGraph: {
    title: 'Press Release - Fluxline Professional Services',
    description:
      'Public announcements, media features, and milestone broadcasts from Fluxline Resonance Group.',
    url: 'https://www.fluxline.pro/press-release',
    siteName: 'Fluxline Professional Services',
    type: 'website',
  },
  alternates: {
    canonical: '/press-release',
  },
};

export default function PressReleaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
