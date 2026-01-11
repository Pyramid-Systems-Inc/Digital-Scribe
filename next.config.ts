import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* React strict mode for highlighting potential problems */
  reactStrictMode: true,

  /* Enable experimental features */
  experimental: {
    /* Enable typed routes for better type safety */
    typedRoutes: true,
  },

  /* Image optimization configuration */
  images: {
    /* Allow SVG images */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    /* Supported image formats */
    formats: ["image/avif", "image/webp"],
  },

  /* Headers for security */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;