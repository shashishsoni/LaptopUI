import type { NextConfig } from "next";
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['your-image-domain.com'],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure proper video handling
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'video/mp4'
          }
        ],
      }
    ];
  },
  // Serve videos from public directory
  async rewrites() {
    return [
      {
        source: '/video/:file*',
        destination: '/video/:file*'
      }
    ];
  },
  // Update webpack config
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[name].[hash][ext]'
      }
    });
    return config;
  },
  // Add this to handle public assets
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
  experimental: {
    optimizeCss: false,
    optimizeImages: false,
  }
};

export default nextConfig;
