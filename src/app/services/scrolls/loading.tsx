/**
 * Loading State for Scrolls Pages
 */

export default function ScrollsLoading() {
  return (
    <div className="flex flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-96 max-w-full" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-3xl" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 max-w-2xl" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 p-6 border rounded-lg animate-pulse"
          >
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
