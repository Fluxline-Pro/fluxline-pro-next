import type { Metadata } from 'next';
import { PurchaseSuccessClient } from './PurchaseSuccessClient';

export const metadata: Metadata = {
  title: 'Purchase Successful | Fluxline',
  description: 'Thank you for your purchase. Your personalized PDF will be emailed to you shortly.',
  robots: { index: false, follow: false },
};

export default function PurchaseSuccessPage() {
  return <PurchaseSuccessClient />;
}
