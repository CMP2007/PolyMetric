import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import vitestGlobals from 'eslint-plugin-vitest-globals'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  // 1. Ignores globales (un objeto que solo tiene 'ignores' aplica a todo el proyecto)
  {
    ignores: ['**/dist/**', '**/node_modules/**'],
  },

  // 2. Reglas recomendadas base de JS
  js.configs.recommended,

  // 3. CONFIGURACIÓN DEL FRONTEND (React + Vite)
  {
    files: ['frontend/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...vitestGlobals.environments.env.globals,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      eqeqeq: 'error',
      'no-console': 'off',
    },
  },

  // 4. CONFIGURACIÓN DEL BACKEND (Node.js + Express)
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
      },
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      eqeqeq: 'error',
      'no-console': 'off',
    },
  },

  // 5. Prettier siempre al final para desactivar reglas de formato en conflicto
  eslintConfigPrettier,
]
