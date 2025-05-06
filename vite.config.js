import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  build: {
    outDir: 'dist', // Ensure this is the correct output folder
    sourcemap: true,
  },
  plugins: [react()],
  base: '/', // This is important for Netlify
})
