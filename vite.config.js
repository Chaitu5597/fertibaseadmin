import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/fertibaseadmin/",
  server: {
    proxy: {
      '/api': {
        target: 'http://72.61.227.24:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
git add .
git commit -m "fix: resolved merge conflicts"
npm run build
