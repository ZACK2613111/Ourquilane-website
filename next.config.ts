import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push({
      canvas: "canvas", 
    });

    // Use null-loader for 'canvas' during tree-shaking to prevent bundling
    config.module.rules.push({
      test: /canvas/,
      use: "null-loader",
    });

    return config;
  },
  experimental: {
    turbo: {
      treeShaking: true,
    },
  },
};

export default nextConfig;
