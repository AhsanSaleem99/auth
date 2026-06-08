import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  typescript: {
    // Build ke dauran TypeScript errors ko ignore karne ke liye
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
