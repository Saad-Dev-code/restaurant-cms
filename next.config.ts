import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.6"],
  experimental: {
    serverActions: {
      bodySizeLimit: "10MB",
      allowedOrigins: ["192.168.1.6"],
    },
  },
};

export default nextConfig;
