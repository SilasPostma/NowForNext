import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isGithubPages ? "/now_for_next_site" : "",
  assetPrefix: isGithubPages ? "/now_for_next_site/" : "",
  reactCompiler: true,
};

export default nextConfig;