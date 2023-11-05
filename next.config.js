/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ["vfytrjgnxarcftgsasko.supabase.co"],
    },
  };

module.exports = nextConfig
