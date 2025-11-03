import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SSR enabled - no static export
  trailingSlash: true,
  images: {
    // Azure Static Web Apps supports Next.js image optimization
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  env: {
    AZURE_STORAGE_CONNECTION_STRING:
      process.env.AZURE_STORAGE_CONNECTION_STRING,
    AZURE_STORAGE_ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  },
  reactCompiler: true,
};

export default nextConfig;
