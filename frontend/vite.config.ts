import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  base: '',
  server: {
    port: 4173,
    strictPort: true,
    cors: true,
    host: true,
    fs: {
      strict: false
    }
  },
  preview: {
    port: 4173,
    strictPort: true,
    cors: true,
    host: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

