/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kuxaffboxknwphgulogp.supabase.co',
        port: '',
        pathname:
          '/storage/v1/object/public/camp_pic/blob:http:/localhost:3000/**',
      },
      {
        protocol: 'https',
        hostname: 'kuxaffboxknwphgulogp.supabase.co',
<<<<<<< HEAD
=======
      },
      {
        protocol: 'https',
        hostname: 'example.com',
>>>>>>> 8685b3e24f0590636f76d6094d3d81bd6129983d
      },
    ],
  },
};
module.exports = nextConfig;
