import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://newsapi.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/v2'),
      }
    },
    open: true,
  },
  build: {
    outDir: 'dist', // Ensure this is the correct output folder
    sourcemap: true,
  },
  plugins: [react()],
  base: '/', // This is important for Netlify
})
