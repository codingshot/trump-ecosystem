/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pbs.twimg.com', 'placeholder.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig 