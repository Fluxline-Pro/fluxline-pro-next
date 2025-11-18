import { Metadata } from 'next';
import { PageWrapper } from '../../../components/PageWrapper';
import LegalPageLayout from '../../../components/LegalPageLayout';
import { content } from '../../../assets/legal/stewardship-contract';

export const metadata: Metadata = {
  title: 'Stewardship Contract - Fluxline Professional Services',
  description: 'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy and client relationship values.',
  keywords: 'stewardship, ethics, professional conduct, client rights, service commitment, Fluxline',
};

export default function StewardshipContractPage() {
  return (
    <PageWrapper>
      <LegalPageLayout
        title="Stewardship Contract"
        subtitle="Our Commitment to Ethical Service and Partnership"
        content={content}
        lastUpdated="January 1, 2025"
      />
    </PageWrapper>
  );
}
