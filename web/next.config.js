/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "ts"],
  swcMinify: true,
  transpilePackages: ["nextjs-components"],
};

module.exports = nextConfig;
