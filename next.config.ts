import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.civicdays.in" },
      { protocol: "https", hostname: "**.datakeep.civicdays.in" },
    ],
  },
};

export default nextConfig;
