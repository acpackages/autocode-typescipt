import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@autocode-ts/autocode': path.resolve(__dirname, 'packages/common/autocode/src'),
      '@autocode-ts/ac-data-dictionary': path.resolve(__dirname, 'packages/common/ac-data-dictionary/src'),
      '@autocode-ts/ac-sql': path.resolve(__dirname, 'packages/common/ac-sql/src'),
      '@autocode-ts/ac-extensions': path.resolve(__dirname, 'packages/common/ac-extensions/src'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
