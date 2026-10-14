import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
// vitest/config의 defineConfig는 Vite 설정에 test 항목 타입을 더한 것이다.
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // tsconfig.app.json의 "@/*" 경로 별칭과 같은 위치를 가리킨다.
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // 순수 함수 테스트는 브라우저 객체가 필요 없으므로 Node 환경에서 실행한다.
    environment: 'node',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
