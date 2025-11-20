import { Metadata } from 'next';
import { PageWrapper } from '../../../components/PageWrapper';
import LegalPageLayout from '../../../components/LegalPageLayout';
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
    <PageWrapper>
      <LegalPageLayout
        title='Terms of Use'
        subtitle='Service Terms and User Agreements'
        content={content}
      />
    </PageWrapper>
  );
}
