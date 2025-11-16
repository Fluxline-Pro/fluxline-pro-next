'use client';

/**
 * Breadcrumb Component
 * Navigation breadcrumbs for hierarchical page navigation
 */

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '@/theme/components/typography';
import { FluentIcon } from '@/theme/components/fluent-icon';
import { useAppTheme } from '@/theme/hooks/useAppTheme';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb Component
 * Automatically generates breadcrumbs from pathname or uses provided items
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  const { theme } = useAppTheme();
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if not provided
  const breadcrumbItems: BreadcrumbItem[] = React.useMemo(() => {
    if (items) return items;

    const paths = pathname.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
    ];

    let currentPath = '';
    paths.forEach((path) => {
      currentPath += `/${path}`;
      // Capitalize and format the path
      const label = path
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      crumbs.push({
        label,
        href: currentPath,
      });
    });

    return crumbs;
  }, [pathname, items]);

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li
              key={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {index > 0 && (
                <FluentIcon
                  iconName="ChevronRight"
                  size="xSmall"
                  color={theme.palette.neutralTertiary}
                />
              )}

              {isLast ? (
                <Typography
                  variant="p"
                  style={{
                    color: theme.palette.neutralPrimary,
                    fontSize: '0.875rem',
                    fontWeight: theme.typography.fontWeights.semiBold,
                  }}
                  aria-current="page"
                >
                  {item.label}
                </Typography>
              ) : (
                <Link
                  href={item.href}
                  style={{
                    color: theme.palette.neutralSecondary,
                    fontSize: '0.875rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.palette.themePrimary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.palette.neutralSecondary;
                  }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
