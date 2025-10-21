import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Explicitly import Node crypto for dev to ensure getRandomValues exists
import crypto from 'node:crypto'
// Attach a Web Crypto–like shim early for Vite internals that expect it during resolveConfig
if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== 'function') {
  globalThis.crypto = {
    getRandomValues: (arr) => {
      const buf = crypto.randomBytes(arr.length)
      arr.set(buf)
      return arr
    }
  }
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    global: 'globalThis',
    // Some libs gate on process/browser flags
    'process.env': {},
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia']
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    target: 'esnext'
  }
})
