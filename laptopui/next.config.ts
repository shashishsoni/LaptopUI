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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure video handling
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
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
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
    config.module.rules.push(
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/videos/',
            outputPath: 'static/videos/',
            name: '[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/image/',
            outputPath: 'static/image/',
            name: '[name].[hash].[ext]',
          },
        },
      }
    );
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
