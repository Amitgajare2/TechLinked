import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl =
      process.env.API_URL || "http://localhost:5000";

    return [
      {
        source: "/api/users/:path*",
        destination: `${apiUrl}/api/users/:path*`,
      },
      {
        source: "/api/profile/:path*",
        destination: `${apiUrl}/api/profile/:path*`,
      },
    ];
  },
};

export default nextConfig;