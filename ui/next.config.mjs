import path from 'path';
import fs from 'fs';

const cacheDir = path.resolve('./db');

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
}

const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  productionBrowserSourceMaps: false,
};

export default nextConfig;
