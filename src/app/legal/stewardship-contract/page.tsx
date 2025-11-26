import React from 'react';
import { Metadata } from 'next';
import StewardshipContractClientPage from './StewardshipContractClientPage';

export const metadata: Metadata = {
  title: 'Stewardship Contract - Fluxline Professional Services',
  description:
    'Our commitment to ethical service and mutual respect. Learn about our stewardship philosophy and client relationship values.',
  keywords:
    'stewardship, ethics, professional conduct, client rights, service commitment, Fluxline',
};

export default function StewardshipContractPage() {
  return <StewardshipContractClientPage />;
}
