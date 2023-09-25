/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    EMAIL: process.env.EMAIL,
  },
};

module.exports = nextConfig;
