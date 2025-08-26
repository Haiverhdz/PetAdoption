import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  fontLoaders: [
    { loader: '@next/font/google', options: {susets: ['latin']}},
  ],
  reactStrictMode: true,
};

export default nextConfig;

