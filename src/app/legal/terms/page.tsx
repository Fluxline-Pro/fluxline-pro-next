import { Metadata } from 'next';
import { UnifiedPageWrapper } from '../../../components/UnifiedPageWrapper';
import { content } from '../../../assets/legal/terms-of-use';

export const metadata: Metadata = {
  title: 'Terms of Use - Fluxline Professional Services',
  description:
    'Terms of Use for Fluxline Professional Services. Learn about our service terms, user responsibilities, and legal agreements.',
  keywords:
    'terms of use, terms and conditions, legal, service agreement, Fluxline',
};

export default function TermsOfUsePage() {
  return (
    <UnifiedPageWrapper
      layoutType='legal-document'
      legalPageConfig={{
        title: 'Terms of Use',
        subtitle: 'Service Terms and User Agreements',
        content,
        documentType: 'terms',
      }}
    />
  );
}
