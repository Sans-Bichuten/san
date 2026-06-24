import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // New admin APIs - route to local project backend folder
      '/bichuten_backend/admin': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace('/bichuten_backend', '/Bichuten_Data_Vault/backend'),
        secure: false,
      },
      // New public APIs - route to local project backend folder
      '/bichuten_backend/public': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace('/bichuten_backend', '/Bichuten_Data_Vault/backend'),
        secure: false,
      },
      // Uploads served from local project
      '/bichuten_backend/uploads': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace('/bichuten_backend', '/Bichuten_Data_Vault/backend'),
        secure: false,
      },
      // Legacy APIs (contact, newsletter) still in htdocs/bichuten_backend/
      '/bichuten_backend': {
        target: 'http://localhost',
        changeOrigin: true,
        rewrite: (path) => path.replace('/bichuten_backend', '/Bichuten_Data_Vault/backend'),
        secure: false,
      },
    },
  },
})