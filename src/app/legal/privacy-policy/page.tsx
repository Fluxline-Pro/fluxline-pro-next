import { Metadata } from 'next';
import { PageWrapper } from '../../../components/PageWrapper';
import LegalPageLayout from '../../../components/LegalPageLayout';
import { content } from '../../../assets/legal/privacy-policy';

export const metadata: Metadata = {
  title: 'Privacy Policy - Fluxline Professional Services',
  description:
    'Privacy Policy for Fluxline Professional Services. Learn how we collect, use, and protect your personal information.',
  keywords:
    'privacy policy, data protection, GDPR, CCPA, privacy, personal information, Fluxline',
};

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <LegalPageLayout
        title='Privacy Policy'
        subtitle='Data Protection and Privacy Practices'
        content={content}
      />
    </PageWrapper>
  );
}
