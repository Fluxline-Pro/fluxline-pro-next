'use client';

import { useSyncExternalStore, type ReactNode } from 'react';

export interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Prevents hydration mismatches by only rendering children on the client.
 * Useful for components that use browser-only APIs or generate dynamic IDs.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
