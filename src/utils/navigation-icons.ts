/**
 * Navigation Icon Utilities
 * Maps routes to their corresponding navigation icons for consistency
 */

import { navItems } from '@/theme/components/header/navigation.config';

/**
 * Get the icon name for a given path from the navigation configuration
 * @param path - The route path to look up (e.g., '/services', '/about')
 * @returns The Fluent UI icon name, or undefined if not found
 */
export const getIconForPath = (path: string): string | undefined => {
  // Exact match first
  const exactMatch = navItems.find((item) => item.path === path);
  if (exactMatch) return exactMatch.iconName;

  // Check if path starts with any nav item path (for nested routes)
  const partialMatch = navItems.find((item) => {
    // Skip root path for partial matching
    if (item.path === '/') return false;
    return path.startsWith(item.path);
  });

  return partialMatch?.iconName;
};

/**
 * Get the full nav item for a given path
 * @param path - The route path to look up
 * @returns The full NavItem object, or undefined if not found
 */
export const getNavItemForPath = (path: string) => {
  const exactMatch = navItems.find((item) => item.path === path);
  if (exactMatch) return exactMatch;

  const partialMatch = navItems.find((item) => {
    if (item.path === '/') return false;
    return path.startsWith(item.path);
  });

  return partialMatch;
};
