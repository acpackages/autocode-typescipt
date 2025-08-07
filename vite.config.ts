import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@autocode-ts/autocode': path.resolve(__dirname, '../../packages/common/autocode/src'),
      // '@autocode-ts/ac-browser': path.resolve(__dirname, '../../packages/common/ac-browser/src'),
      '@autocode-ts/ac-data-dictionary': path.resolve(__dirname, '../../packages/common/ac-data-dictionary/src'),
      // add others as needed
    },
  },
});
