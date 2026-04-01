import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: "",
  assetPrefix: "",
  reactCompiler: true,
};

export default nextConfig;