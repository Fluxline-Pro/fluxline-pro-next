/**
 * Navigation Icon Utilities
 * Maps routes to their corresponding navigation icons for consistency
 */

import { navItems } from '@/theme/components/header/navigation.config';
import type { NavItem } from '@/theme/components/header/navigation.types';

/**
 * Flatten nav items including children for exhaustive lookup
 */
function flattenNavItems(items: NavItem[]): NavItem[] {
  return items.reduce<NavItem[]>((acc, item) => {
    acc.push(item);
    if (item.children) acc.push(...flattenNavItems(item.children));
    return acc;
  }, []);
}

const allNavItems = flattenNavItems(navItems);

/**
 * Get the icon name for a given path from the navigation configuration
 * @param path - The route path to look up (e.g., '/services', '/contact')
 * @returns The Fluent UI icon name, or undefined if not found
 */
export const getIconForPath = (path: string): string | undefined => {
  // Exact match first (including children)
  const exactMatch = allNavItems.find((item) => item.path === path);
  if (exactMatch) return exactMatch.iconName;

  // Check if path starts with any nav item path (for nested routes)
  const partialMatch = allNavItems.find((item) => {
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
  const exactMatch = allNavItems.find((item) => item.path === path);
  if (exactMatch) return exactMatch;

  const partialMatch = allNavItems.find((item) => {
    if (item.path === '/') return false;
    return path.startsWith(item.path);
  });

  return partialMatch;
};
