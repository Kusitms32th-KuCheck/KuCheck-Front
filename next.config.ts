import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
