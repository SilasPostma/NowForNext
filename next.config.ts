import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: "",
  assetPrefix: "",
};

export default nextConfig;