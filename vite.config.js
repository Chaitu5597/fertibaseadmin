import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
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
=======
  base: "/fertibaseadmin/", 
>>>>>>> 6e4784bd823d845afea01386f9916f8d79681e32
})
