import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    target: 'node18', // or node20
    lib: {
      entry: 'src/main.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `main.${format}.js`,
    },
    rollupOptions: {
      external: [
        // Node built-ins
        'fs',
        'path',
        'http',
        'https',
        'url',
        'stream',
        'zlib',

        // Dependencies (DO NOT bundle these)
        'express',
        'cors',
        'cookie-parser',
        'multer',
        'sharp'
      ],
    },
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true,
  },

  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: './tsconfig.app.json', // important for Nx
    }),
  ],
});
