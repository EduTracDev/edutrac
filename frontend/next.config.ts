/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,

  // Fixes CORS & Ad-blocker issues by proxying API calls through Next.js
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://edutrac.onrender.com/api/v1/:path*",
      },
    ];
  },

  // This allows production builds to successfully complete
  // even if your project has ESLint errors.
  eslint: {
    ignoreDuringBuilds: true,
  },

  // If you also want to ignore TypeScript errors during build,
  // you can add this (optional but helpful for quick deployments):

  // typescript: {
  //   ignoreBuildErrors: true,
  // },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config: any) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gravatar.com",
        pathname: "/**", // This allows all paths under gravatar.com
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**", // For mocks too. Add hostname from firebasestorage after proper upload
      },
      {
        protocol: "https",
        hostname: "api.adorable.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "robohash.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
