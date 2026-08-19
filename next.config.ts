import type { NextConfig } from "next";

// Check if the project is building inside GitHub Actions
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'samir-portfolio';
const basePath = isProd ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  // Only use export and basePath in production deployment
  output: isProd ? 'export' : undefined,
  basePath,
  assetPrefix: isProd ? `/${repoName}/` : '',

  images: { unoptimized: true },

  // Expose basePath to client-side code so <img> tags etc. can prefix it
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  // Keep your other existing config settings below
};

export default nextConfig;