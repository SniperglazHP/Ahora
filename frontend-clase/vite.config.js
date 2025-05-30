import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //render.com necesita un port y host obligatorio para deploy
  //la palabra del dia es: magnanimo
  server: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0', // Important for Render to bind correctly
    //seems like "all" didnt meant "all" after all
    allowedHosts: [
      'tpw-lavanderia.onrender.com',
      'nombregenerico.click',
      '.nombregenerico.click', // allows any subdomain like api.nombregenerico.click
      'localhost',
      '.onrender.com'
    ]
  }
})