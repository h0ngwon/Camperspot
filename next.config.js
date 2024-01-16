/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kuxaffboxknwphgulogp.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/camp_pic/blob:http:/localhost:3000/**',
      },
    ],
  },
}



module.exports = nextConfig;
