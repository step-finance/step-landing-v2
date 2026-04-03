import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: []
  },
  async redirects() {
    return [
      {
        source: "/security",
        destination: "/validator",
        permanent: false
      },
      {
        source: "/docs",
        destination: "/validator",
        permanent: false
      },
      {
        source: "/docs/:path*",
        destination: "/validator",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
