import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
<<<<<<< HEAD



// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
=======

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
>>>>>>> e18385cbf38806269a14fa43a5d7b475a1245ce3
})
