import { Metadata } from 'next';
import { UnifiedPageWrapper } from '../../../../components/UnifiedPageWrapper';
import { content } from '../../../../assets/legal/glossary-technical-terms';

export const metadata: Metadata = {
  title: 'Technical & Professional Terms',
  description:
    "Comprehensive glossary of technical, business, and professional terminology used in Fluxline's services and documentation.",
  keywords:
    'technical terms, business glossary, professional services, development, consulting, legal terminology',
  openGraph: {
    title: 'Technical & Professional Terms - Fluxline Professional Services',
    description:
      "Comprehensive glossary of technical, business, and professional terminology used in Fluxline's services.",
    url: 'https://www.fluxline.pro/legal/glossary/technical-terms',
    siteName: 'Fluxline Professional Services',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Technical & Professional Terms - Fluxline Professional Services',
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
  return (
    <UnifiedPageWrapper
      layoutType='legal-document'
      legalPageConfig={{
        title: 'Technical & Professional Terms',
        subtitle: 'Business, Legal, and Technical Terminology',
        content,
        documentType: 'glossary',
      }}
    />
  );
}
