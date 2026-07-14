import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 静的エクスポートを有効にする
  images: {
    unoptimized: true, // GitHub Pagesでは画像最適化が動かないため無効化
  },
  // 下記は必要に応じて。リポジトリ名が 'portfolio' なので追加します
  basePath: '/portfolio',
};

export default nextConfig;