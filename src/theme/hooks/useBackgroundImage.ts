'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useUserPreferencesStore } from '@/store/store-specs/userPreferencesStore';

/**
 * useBackgroundImage Hook
 * 
 * Manages background image selection for the home page using Zustand store.
 * Integrates with userPreferencesStore to persist background selection.
 * 
 * This hook is designed to work with Next.js App Router and maintains
 * compatibility with the original React Router implementation.
 */
export const useBackgroundImage = () => {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);
  const hasInitializedRef = useRef(false);
  
  const { preferences, setBackgroundImage } = useUserPreferencesStore();
  const backgroundImage = (preferences.backgroundImage || 'one') as 'one' | 'two';

  const isHomePage = pathname === '/' || pathname === '/home';

  // Handle navigation-triggered background management
  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = pathname;
    const prevWasHome = prevPath === '/' || prevPath === '/home';

    // On first mount only, ensure we have a background set
    if (!hasInitializedRef.current) {
      if (!preferences.backgroundImage) {
        setBackgroundImage('one');
      }
      hasInitializedRef.current = true;
      prevPathRef.current = currentPath;
      return;
    }

    // Only process actual navigation changes (not same path)
    if (prevPath === currentPath) {
      return;
    }

    // Returning TO home page (from non-home) - use stored preference
    if (!prevWasHome && isHomePage) {
      if (!preferences.backgroundImage) {
        setBackgroundImage('one');
      }
    }

    prevPathRef.current = currentPath;
  }, [pathname, isHomePage, preferences.backgroundImage, setBackgroundImage]);

  return {
    backgroundImage,
    setBackgroundImage,
  };
};

export default useBackgroundImage;
