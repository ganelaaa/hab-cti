/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/hab-cti",
  assetPrefix: "/hab-cti",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
