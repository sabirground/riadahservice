/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: [],
    remotePatterns: [],
  },
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
