import { Metadata } from 'next';
import TermsClientPage from './TermsClientPage';

export const metadata: Metadata = {
  title: 'Terms of Use - Fluxline Professional Services',
  description:
    'Terms of Use for Fluxline Professional Services. Learn about our service terms, user responsibilities, and legal agreements.',
  keywords:
    'terms of use, terms and conditions, legal, service agreement, Fluxline',
};

export default function TermsOfUsePage() {
  return <TermsClientPage />;
}
