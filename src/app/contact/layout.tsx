import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Fluxline for design, development, consulting, and training inquiries.',
  openGraph: {
    title: 'Contact - Fluxline Professional Services',
    description:
      'Get in touch with Fluxline for design, development, consulting, and training inquiries.',
    url: 'https://www.fluxline.pro/contact',
    siteName: 'Fluxline Professional Services',
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
