'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LoadingSpinner,
  SpinnerSize,
} from '@/theme/components/structural';
import { useAuth } from '@/lib/auth';

/**
 * MSAL redirect landing page (static-export compatible).
 *
 * The AuthProvider in the root layout runs `handleRedirectPromise()` on every
 * page load; this page just waits for that to settle and then returns the
 * user to the home page — the header avatar reflects the signed-in state.
 */
export default function AuthCallbackPage() {
  const { isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      router.replace('/');
    }
  }, [isLoading, router]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <LoadingSpinner
        size={SpinnerSize.large}
        label='Signing you in...'
        showLabel
      />
    </div>
  );
}
