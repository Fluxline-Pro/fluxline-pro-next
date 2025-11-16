/**
 * Loading State for Individual Scroll Detail Page
 */

export default function ScrollDetailLoading() {
  return (
    <div className="flex flex-col gap-8 px-4 py-8 md:px-8 md:py-12 max-w-4xl mx-auto">
      {/* Breadcrumbs Skeleton */}
      <div className="flex items-center gap-2 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
      </div>

      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-2xl" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </div>

      {/* Metadata Skeleton */}
      <div className="flex gap-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40" />
      </div>

      {/* Tags Skeleton */}
      <div className="flex gap-2 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-28" />
      </div>

      {/* Download Section Skeleton */}
      <div className="p-6 rounded-lg border animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-6" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-48" />
      </div>
    </div>
  );
}
