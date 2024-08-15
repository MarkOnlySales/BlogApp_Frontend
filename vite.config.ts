import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": `${path.resolve(__dirname, "src/components/")}`,
      "@images": `${path.resolve(__dirname, "src/images/")}`,
      "@pages": `${path.resolve(__dirname, "src/pages/")}`,
      "@utils": `${path.resolve(__dirname, "src/utils/")}`,
      "@lib": `${path.resolve(__dirname, "src/lib/")}`,
    }
  }
})
