import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {}, // Polyfill for older libraries that rely on `process.env`
  },
  build: {
        chunkSizeWarningLimit: 1600
  },
  base: '/sherlocked/',
  server: {
	port: 4173
}
})
