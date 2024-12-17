import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  basePath: isProduction ? "/attachment-lyrics-matcher" : "",
  output: "export",
};

export default nextConfig;
