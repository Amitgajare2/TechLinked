import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // API_URL is only read server-side here — never embedded in client bundle
    // Auth routes are handled by the Route Handler at /app/api/auth/[...path]/route.ts
    // which correctly forwards Set-Cookie headers (rewrites silently drop them)
    const apiUrl = process.env.API_URL || "http://localhost:5000"
    return [
      {
        source: "/api/users/:path*",
        destination: `${apiUrl}/api/users/:path*`,
      },
      {
        source: "/api/profile/:path*",
        destination: `${apiUrl}/api/profile/:path*`,
      },
      {
        source: "/api/posts/:path*",
        destination: `${apiUrl}/api/posts/:path*`,
      },
    ];
  },
};

export default nextConfig;
