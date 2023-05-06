/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    POLYGONSCAN_API_KEY: process.env.POLYGONSCAN_API_KEY,
  }
}

module.exports = nextConfig
