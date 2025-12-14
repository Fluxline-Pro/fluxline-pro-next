import { Metadata } from 'next';
import TechnicalTermsClient from './TechnicalTermsClient';

export const metadata: Metadata = {
  title: 'Technical & Professional Terms',
  description:
    "Comprehensive glossary of technical, business, and professional terminology used in Fluxline's services and documentation.",
  keywords:
    'technical terms, business glossary, professional services, development, consulting, legal terminology',
  openGraph: {
    title: 'Technical & Professional Terms - Fluxline',
    description:
      "Comprehensive glossary of technical, business, and professional terminology used in Fluxline's services.",
    url: 'https://www.fluxline.pro/legal/glossary/technical-terms',
    siteName: 'Fluxline',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Technical & Professional Terms - Fluxline Resonance Group',
    description:
      "Comprehensive glossary of technical, business, and professional terminology used in Fluxline's services.",
  },
  alternates: {
    canonical: '/legal/glossary/technical-terms',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TechnicalTermsPage() {
  return <TechnicalTermsClient />;
}
