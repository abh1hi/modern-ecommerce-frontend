// Minimal Vite config that runs in Node ≥18 without polyfills
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: { host: '0.0.0.0', port: 5173 },
  build: { target: 'esnext' }
})
