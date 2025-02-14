/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['your-image-domain.com'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig; 