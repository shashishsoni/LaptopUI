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
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add this to properly handle videos
  async headers() {
    return [
      {
        source: '/video/:path*',
        headers: [
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          },
          {
            key: 'Content-Type',
            value: 'video/mp4'
          }
        ],
      },
    ];
  },
  // Update webpack config
  webpack: (config: Configuration) => {
    config.module?.rules?.push({
      test: /\.(mp4|webm)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos',
          outputPath: 'static/videos',
          name: '[name].[hash].[ext]',
        },
      }],
    });
    return config;
  },
  // Add this to handle public assets
  publicRuntimeConfig: {
    staticFolder: '/static',
  }
};

export default nextConfig;
