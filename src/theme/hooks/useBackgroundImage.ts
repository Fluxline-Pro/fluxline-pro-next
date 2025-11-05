'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const BACKGROUND_STORAGE_KEY = 'home-background-toggle';

/**
 * useBackgroundImage Hook
 * 
 * Manages background image selection for the home page.
 * Always returns 'one' as the background image (darker background with portrait).
 * 
 * This hook is designed to work with Next.js App Router and maintains
 * compatibility with the original React Router implementation.
 */
export const useBackgroundImage = () => {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);
  const hasInitializedRef = useRef(false);

  // Always use 'one' and never toggle to 'two'
  const [currentBackground] = useState<'one' | 'two'>('one');

  const isHomePage = pathname === '/' || pathname === '/home';

  // Handle navigation-triggered background management
  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = pathname;
    const prevWasHome = prevPath === '/' || prevPath === '/home';

    // On first mount only, always use 'one'
    if (!hasInitializedRef.current) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(BACKGROUND_STORAGE_KEY, 'one');
      }
      hasInitializedRef.current = true;
      prevPathRef.current = currentPath;
      return;
    }

    // Only process actual navigation changes (not same path)
    if (prevPath === currentPath) {
      return;
    }

    // Returning TO home page (from non-home) - always use background 'one'
    if (!prevWasHome && isHomePage) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(BACKGROUND_STORAGE_KEY, 'one');
      }
    }

    prevPathRef.current = currentPath;
  }, [pathname, isHomePage]);

  return {
    backgroundImage: currentBackground,
  };
};

export default useBackgroundImage;
