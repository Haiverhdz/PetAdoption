import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['mongoose'],
  images: {
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;

