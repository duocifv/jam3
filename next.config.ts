import type { NextConfig } from 'next'

const apiKey = `${process.env.NEXT_PUBLIC_API_URL}/graphql`

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/graphql',
  //       destination: apiKey,
  //     },
  //     {
  //       source: '/wc/cart',
  //       destination: 'http://test.jam.x10.bz/wp-json/graphql/cart',
  //     },
  //     {
  //       source: '/wc/orders',
  //       destination: 'http://test.jam.x10.bz/wp-json/wc/v3/orders',
  //     },
  //   ]
  // },
}

export default nextConfig
