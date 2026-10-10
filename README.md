# React + TypeScript + Vite

## 학습 프로젝트 실행과 mock 데이터

```bash
npm ci
npm run dev
```

별도 터미널에서 `npm run mock`을 실행하면 사용자 API 서버가
`http://localhost:3001`에서 시작됩니다. `premock`은 `mock` 실행 전에 npm이
자동으로 실행하는 script이며, `db.json`이 없을 때만 기본 데이터를 복사합니다.
서버를 다시 시작해도 기존 실행 데이터는 유지됩니다.

- `db.seed.json`: Git으로 관리하는 기본 샘플 사용자 두 명
- `db.json`: 등록·수정·삭제가 반영되는 실행 데이터. Git에서는 제외합니다.

실행 파일만 준비하려면 `npm run mock:init`을 사용합니다.
기본 데이터로 되돌리려면 mock 서버를 `Ctrl+C`로 중지하고
`npm run mock:reset`을 실행한 뒤 `npm run mock`으로 다시 시작합니다.
초기화하면 기존 테스트 데이터는 기본 샘플 데이터로 교체됩니다.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
