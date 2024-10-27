require("dotenv").config({ path: "./.env.local" });
const nextTranslate = require("next-translate");
const path = require("path");
const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

const nextConfig = {
  lessLoaderOptions: { javascriptEnabled: true },
  env: {
    SERVER_IP: process.env.SERVER_IP,
    access_token: process.env.access_token,
  },
  pool,
  images: {
    remotePatterns: [
      {
        protocol: `${process.env.SERVER_PROTOCOL}`,
        hostname: `${process.env.SERVER_HOST}`,
      },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  connectionString,
  config: path.resolve("./config", "config.js"),
  "models-path": path.resolve("./models"),
  "seeders-path": path.resolve("./seeders"),
  "migrations-path": path.resolve("./migrations"),
  webpack: (config) => {
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[contenthash].[ext]",
            publicPath: "_next/static/worker",
            outputPath: "static/worker",
          },
        },
      ],
    });
    config.module.rules.push({ test: /\.svg$/, use: ["@svgr/webpack"] });
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
};

module.exports = nextConfig;
