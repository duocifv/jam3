import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "http://localhost/graphql", 
      },
    ];
  },
};

export default nextConfig;
