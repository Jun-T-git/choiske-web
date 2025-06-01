import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{ts,tsx}'],
    workspace: [
      {
        plugins: [
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          globals: true,
        },
      },
      {
        // ユニットテスト用のワークスペースを追加
        resolve: {
          alias: {
            '@': path.resolve(dirname, './src'),
          },
        },
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/tests/unit/**/*.{test,spec}.{ts,tsx}'],
          setupFiles: ['src/tests/setup.ts'],
          globals: true,
        },
      }
    ],
  },
});
