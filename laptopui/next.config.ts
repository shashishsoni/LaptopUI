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
  webpack: (config: Configuration) => {
    config.module?.rules?.push({
      test: /\.(mp4|webm)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          publicPath: '/_next',
          name: 'static/media/[name].[hash].[ext]',
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
