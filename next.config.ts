import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Azure Static Web Apps
  output: 'export', // Static HTML export - no SSR
  trailingSlash: true,
  images: {
    // Static export ships original assets as-is: there is no server to run the
    // Next.js image optimizer. `formats`, `deviceSizes`, `imageSizes`, and
    // `qualities` are all no-ops while this is true, so they are omitted rather
    // than left in place implying optimization that isn't happening.
    // Restoring responsive sizing and AVIF/WebP requires a custom `loader`
    // pointing at an image CDN — tracked separately.
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
