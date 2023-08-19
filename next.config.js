/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // ダミー画像を使用するための設定
  images: {
    domains: ["dummyimage.com"],
  },
};

module.exports = nextConfig;
