import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Tells Next.js to export static HTML instead of needing a server
  basePath: '/samir-portfolio', // Fixes link routing for GitHub sub-folders
  images: {
    unoptimized: true, // Required because GitHub Pages cannot dynamically resize images
  },
};

export default nextConfig;
