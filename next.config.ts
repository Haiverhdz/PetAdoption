import type { NextConfig } from 'neclext';

const nextConfig: NextConfig = {
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: {susets: ['latin']}},
    ],
  },
};

export default nextConfig;
