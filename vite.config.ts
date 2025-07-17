import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  test: {
    setupFiles: ['./src/utils/tests/setup-env.ts', './src/utils/tests/custom-matchers.ts'],
    env: loadEnv(mode, process.cwd(), ''),
    globals: true,
    exclude: [...configDefaults.exclude, 'dist/**', 'build/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    projects: [
      {
        name: 'node',
        extends: true,
        test: {
          environment: 'happy-dom',
          include: ['src/**/*.unit.test.tsx'],
        },
      },
      {
        name: 'browser',
        extends: true,
        test: {
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          include: ['tests/browser/**/*.browser.test.ts'],
        },
      },
    ],
  },
}));
