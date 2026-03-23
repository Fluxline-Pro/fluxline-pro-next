import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'Schedule a free consultation with Fluxline. Tell us about your needs and pick a time that works for you.',
  openGraph: {
    title: 'Book a Consultation - Fluxline',
    description:
      'Schedule a free consultation with Fluxline. Tell us about your needs and pick a time that works for you.',
    url: 'https://www.fluxline.pro/book',
    siteName: 'Fluxline',
    type: 'website',
  },
  alternates: {
    canonical: '/book',
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
