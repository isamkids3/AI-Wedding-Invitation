import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ilya-alyaa-wedding-invite',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;