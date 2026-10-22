import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : null;

const nextConfig: NextConfig = {
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      {
        source: "/projects/riyadh-logistics-perimeter",
        destination: "/projects/dubai-logistics-perimeter",
        permanent: true,
      },
      {
        source: "/projects/abudhabi-substation-palisade",
        destination: "/projects/dubai-substation-palisade",
        permanent: true,
      },
      {
        source: "/projects/sharjah-industrial-yard",
        destination: "/projects/dubai-industrial-yard",
        permanent: true,
      },
      {
        source: "/blog/choosing-perimeter-fencing-gcc",
        destination: "/blog/choosing-perimeter-fencing-dubai",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseHostname
      ? [{ protocol: "https", hostname: supabaseHostname }]
      : [],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
