import { Metadata } from 'next';
import { UnifiedPageWrapper } from '../../../../components/UnifiedPageWrapper';
import { content } from '../../../../assets/legal/glossary-technical-terms';

export const metadata: Metadata = {
  title: 'Technical & Professional Terms - Fluxline Professional Services',
  description:
    "Comprehensive glossary of technical, business, and professional terminology used in Fluxline's services and documentation.",
  keywords:
    'technical terms, business glossary, professional services, development, consulting, legal terminology',
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
