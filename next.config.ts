import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      root: __dirname,
    },
  } as any,
};

export default nextConfig;
