import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'onku-dev-vlfjiejfi32r3jqp.s3.ap-northeast-2.amazonaws.com',
      },
    ],
    unoptimized: true,
    // 이미지 리사이징 설정
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // 캐시 설정
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1년
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
}

export default nextConfig
