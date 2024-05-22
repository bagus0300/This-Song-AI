/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**"
      }
    ]
  },
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_VERCEL_ENV != "development"
  },
  reactStrictMode: false
};

module.exports = nextConfig;
