import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 部署於子路徑時，透過環境變數 GHPAGES_BASE 或自動偵測設定 base。
// 例如部署到 https://user.github.io/german-step-by-step/ 時 base 應為 '/german-step-by-step/'
const base = process.env.GHPAGES_BASE || '/german-step-by-step/';

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
