import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const withNextTranslate = require("next-translate-plugin");

module.exports = withNextTranslate(nextConfig);
