/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kuxaffboxknwphgulogp.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig;
