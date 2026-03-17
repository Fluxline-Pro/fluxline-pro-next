'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NewsletterState {
  /** Whether the user has permanently dismissed the newsletter popup */
  newsletterDismissed: boolean;
  /** Whether the user has already subscribed */
  newsletterSubscribed: boolean;
  /** Dismiss the popup permanently */
  dismissNewsletter: () => void;
  /** Mark the user as subscribed */
  setNewsletterSubscribed: (subscribed: boolean) => void;
}

export const useNewsletterStore = create<NewsletterState>()(
  persist(
    (set) => ({
      newsletterDismissed: false,
      newsletterSubscribed: false,
      dismissNewsletter: () => set({ newsletterDismissed: true }),
      setNewsletterSubscribed: (subscribed) =>
        set({ newsletterSubscribed: subscribed }),
    }),
    {
      name: 'fluxline-newsletter',
      skipHydration: typeof window === 'undefined',
    }
  )
);
