import React from 'react';
import FxAnnouncement from '@/theme/components/dsm/FxAnnouncement';
import { RCF_RELEASE_WINDOW, RCF_STORE_BOOK_URL } from '@/lib/resonanceCore';

/**
 * The book pre-order announcement: one copy of the wording and the store link
 * for every page that shows it (home, the framework page), so the two cannot
 * drift apart. `as` sets the title's heading level: h2 where the band stands
 * alone, h3 where it sits inside another section (home).
 */
export default function PreorderAnnouncement({
  as = 'h2',
}: {
  as?: 'h2' | 'h3';
}) {
  return (
    <FxAnnouncement
      as={as}
      label='Now open for pre-order'
      title='The Resonance Core Framework™, the book'
      ctaLabel='Pre-order the book'
      ctaHref={RCF_STORE_BOOK_URL}
    >
      Pre-orders are open on the Fluxline Store. Release is targeted for{' '}
      {RCF_RELEASE_WINDOW}.
    </FxAnnouncement>
  );
}
