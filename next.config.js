/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['pbs.twimg.com', 'placeholder.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig 