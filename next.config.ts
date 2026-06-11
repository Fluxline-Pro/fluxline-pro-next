import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Azure Static Web Apps
  output: 'export', // Static HTML export - no SSR
  trailingSlash: true,
  images: {
    // Disable image optimization for static export
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
  },
  reactCompiler: true,
};

export default nextConfig;
