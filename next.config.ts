import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isGithubPages ? "/NowForNext" : "",
  assetPrefix: isGithubPages ? "/NowForNext/" : "",
  reactCompiler: true,
};

export default nextConfig;