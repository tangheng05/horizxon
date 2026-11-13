import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only small SVGs go through next/image, so skip the optimizer (and sharp) entirely.
  images: { unoptimized: true },
  async redirects() {
    return [{ source: "/contact", destination: "/#contact", permanent: true }];
  },
};

export default nextConfig;
