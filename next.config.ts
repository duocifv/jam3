import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  output: "export",
  experimental: {
    ppr: 'incremental',
  },
}
 
export default nextConfig