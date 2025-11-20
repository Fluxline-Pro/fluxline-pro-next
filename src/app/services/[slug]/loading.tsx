'use client';

/**
 * Service Detail Loading State
 * Loading skeleton for service detail pages
 */

import React from 'react';
import { UnifiedPageWrapper } from '@/components/UnifiedPageWrapper';

export default function ServiceDetailLoading() {
  return (
    <UnifiedPageWrapper layoutType='responsive-grid'>
      <div className="space-y-12 animate-pulse">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />

        {/* Hero Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-12 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4 p-8 border border-gray-300 dark:border-gray-700 rounded-lg">
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        {/* Features Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-300 dark:bg-gray-700 rounded"
              />
            ))}
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-lg" />

        {/* Related Services Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-300 dark:bg-gray-700 rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </UnifiedPageWrapper>
  );
}
