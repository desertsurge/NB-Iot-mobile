import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  root: process.cwd(),
  base: isProduction ? '/tive-vue3-vite-demo/' : '/', // 如果是根目录部署请配置为 /
  // mode: process.env.NODE_ENV,
  publicDir: 'public',
  plugins: [
      vue(),
  ],
  resolve: {
    alias: [],
  },
  server: {
    port: '8090',
    strictPort: false,
    open: false,
    cors: true,
    proxy: {
      // 字符串简写写法
      '/foo': 'http://localhost:4567/foo',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, '')
      },
    },
  },
  build: {
    // outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    manifest: false,
    brotliSize: false,
  },
  optimizeDeps: {
    include: [
      "vue",
      // "vuex",
      // "vue-router",
      // "vant",
      // "axios",
    ],
  },
})
