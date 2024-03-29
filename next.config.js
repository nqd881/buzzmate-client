/** @type {import('next').NextConfig} */
const path = require("path");
const withPlugins = require("next-compose-plugins");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@use "src/styles/variables.scss" as vars;`,
  },
  images: {
    domains: [
      "buzzmate.com",
      "buzzmate.fun",
      "wallpaperaccess.com",
      "34.101.174.235",
    ],
    minimumCacheTTL: 60,
  },
};

// module.exports = nextConfig;

module.exports = withPlugins([[withBundleAnalyzer]], nextConfig);
