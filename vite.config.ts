import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // tsconfig.app.json의 "@/*" 경로 별칭과 같은 위치를 가리킨다.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
