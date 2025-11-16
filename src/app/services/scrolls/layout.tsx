/**
 * Scrolls Layout
 * Layout wrapper for scrolls section with SEO metadata
 */

import { ReactNode } from 'react';

export default function ScrollsLayout({ children }: { children: ReactNode }) {
  return <div className="scrolls-layout">{children}</div>;
}
