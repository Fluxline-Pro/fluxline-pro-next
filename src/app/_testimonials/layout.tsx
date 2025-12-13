import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials',
  description:
    'Read client testimonials and success stories from businesses and individuals transformed through Fluxline consulting, training, and development services.',
  openGraph: {
    title: 'Testimonials - Fluxline Resonance Group',
    description:
      'Hear from clients transformed through strategic consulting, training, and development services.',
    url: 'https://www.fluxline.pro/testimonials',
    siteName: 'Fluxline Resonance Group',
    type: 'website',
  },
  alternates: {
    canonical: '/testimonials',
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
