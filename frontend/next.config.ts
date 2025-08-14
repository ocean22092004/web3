import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ["wagmi", "@tanstack/react-query"] }
};
export default nextConfig;
