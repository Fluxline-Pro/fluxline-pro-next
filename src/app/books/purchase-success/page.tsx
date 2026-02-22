import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PurchaseSuccessClient } from './PurchaseSuccessClient';

export const metadata: Metadata = {
  title: 'Purchase Successful | Fluxline',
  description:
    'Thank you for your purchase. Your personalized PDF will be emailed to you shortly.',
  robots: { index: false, follow: false },
};

function PurchaseSuccessLoading() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
        fontSize: '1.25rem',
        color: '#666',
      }}
    >
      Loading...
    </div>
  );
}

export default function PurchaseSuccessPage() {
  return (
    <Suspense fallback={<PurchaseSuccessLoading />}>
      <PurchaseSuccessClient />
    </Suspense>
  );
}
