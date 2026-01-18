/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: '**.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.daiict.ac.in',
      },
      {
        protocol: 'https',
        hostname: 'www.bits-pilani.ac.in',
      },
      {
        protocol: 'https',
        hostname: 'prakashcbseschool.edu.in',
      },
      {
        protocol: 'https',
        hostname: 'a.sfdcstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.aboutamazon.com',
      },
    ],
  },
}

module.exports = nextConfig
