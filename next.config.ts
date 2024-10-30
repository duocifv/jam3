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
        destination: "http://localhost:3001/graphql", 
      },
    ];
  },
};

export default nextConfig;
