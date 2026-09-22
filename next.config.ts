import type { NextConfig } from "next";

// Detect if the build is running on Cloudflare Pages
const isCloudflare = process.env.CF_PAGES === 'true';
const repoName = 'samir-portfolio';

// GitHub Pages needs the repo name path, Cloudflare doesn't
const basePath = isCloudflare ? '' : `/${repoName}`;
const assetPrefix = isCloudflare ? '' : `/${repoName}/`;

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix,

  images: { 
    unoptimized: true 
  },

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
