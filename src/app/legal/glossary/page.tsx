import { Metadata } from 'next';
import { PageWrapper } from '../../../components/PageWrapper';
import LegalPageLayout from '../../../components/LegalPageLayout';
import { content } from '../../../assets/legal/glossary';

export const metadata: Metadata = {
  title: 'Glossary of Terms - Fluxline Professional Services',
  description:
    'Definitions of key terms used in Fluxline Professional Services documentation, contracts, and communications.',
  keywords:
    'glossary, terminology, definitions, business terms, technical terms, Fluxline',
};

export default function GlossaryPage() {
  return (
    <PageWrapper>
      <LegalPageLayout
        title='Glossary of Terms'
        subtitle='Key Terminology and Definitions'
        content={content}
        lastUpdated='October 12, 2025'
      />
    </PageWrapper>
  );
}
