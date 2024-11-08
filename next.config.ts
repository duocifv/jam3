import type { NextConfig } from 'next'

const apiKey = `${process.env.NEXT_PUBLIC_API_URL}/graphql`

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/graphql',
        destination: apiKey,
      },
      {
        source: '/wc/cart',
        destination: 'http://jam.x10.bz/wp-json/graphql/cart',
      },
    ]
  },
}

export default nextConfig
