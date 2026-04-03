import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: []
  },
  async redirects() {
    return [
      { source: "/validator", destination: "/", permanent: false },
      { source: "/metrics", destination: "/", permanent: false },
      { source: "/about", destination: "/contributions", permanent: false },
      { source: "/faq", destination: "/", permanent: false },
      { source: "/status", destination: "/", permanent: false },
      { source: "/legal/privacy", destination: "/", permanent: false },
      { source: "/legal/terms", destination: "/", permanent: false },
      { source: "/security", destination: "/", permanent: false },
      { source: "/docs", destination: "/", permanent: false },
      { source: "/docs/:path*", destination: "/", permanent: false }
    ];
  }
};

export default nextConfig;
