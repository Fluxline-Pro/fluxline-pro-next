import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact a Salt Lake City Coach & Consultant',
  description:
    'Contact Fluxline Resonance Group in Salt Lake City, Utah. Book a free consultation for coaching, business strategy, brand design, web development, or training.',
  openGraph: {
    title: 'Contact a Salt Lake City Coach & Consultant | Fluxline.pro',
    description:
      'Contact Fluxline Resonance Group in Salt Lake City, Utah. Book a free consultation for coaching, business strategy, brand design, web development, or training.',
    url: 'https://www.fluxline.pro/contact',
    siteName: 'Fluxline',
    type: 'website',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
