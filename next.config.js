/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    global: true,
  }
}

module.exports = nextConfig
