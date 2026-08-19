import type { NextConfig } from "next";

// Check if the project is building inside GitHub Actions
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'samir-portfolio';

const nextConfig: NextConfig = {
  // Only use export and basePath in production deployment
  output: isProd ? 'export' : undefined,
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',

  images: { unoptimized: true },

  // Keep your other existing config settings below
};

export default nextConfig;