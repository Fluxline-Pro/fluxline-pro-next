import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consulting & Coaching Services',
  description:
    'Five offerings for founders and leaders: Resonance Core Framework™ coaching, business strategy consulting, brand design, web development, and personal training.',
  openGraph: {
    title: 'Consulting & Coaching Services | Fluxline Resonance Group',
    description:
      'Five offerings for founders and leaders: Resonance Core Framework™ coaching, business strategy consulting, brand design, web development, and personal training.',
    url: 'https://www.fluxline.pro/services',
    siteName: 'Fluxline',
    type: 'website',
  },
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
