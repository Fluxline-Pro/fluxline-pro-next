import type { Metadata } from 'next';

/**
 * The unsubscribe form is a utility page: it gets its own canonical (it used
 * to inherit the home page's) and stays out of search results.
 */
export const metadata: Metadata = {
  title: 'Unsubscribe',
  description:
    'Remove your email address from The Resonant Identity newsletter.',
  alternates: {
    canonical: '/unsubscribe',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function UnsubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
