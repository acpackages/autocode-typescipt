/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(({command}) => {
  const tsconfig = command === 'build' ? 'tsconfig.lib.build.json' : 'tsconfig.lib.json';
  return {
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/packages/common/ac-sql',
  plugins: [
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, tsconfig),
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir: '../../../dist/packages/common/ac-sql',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
       entry: 'src/ac-sql.ts',
        name: 'acSql',
        fileName: (format) => {
          if (format === 'es') return 'ac-sql.js';
          if (format === 'cjs') return 'ac-sql.cjs';
          if (format === 'umd') return 'ac-sql.umd.js';
          return 'ac-sql.js';
        },
        formats: ['es' as const, 'cjs' as const, 'umd' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        "@autocode-ts/autocode",
        "@autocode-ts/ac-extensions",
        "@autocode-ts/ac-data-dictionary",
      ],
      output: {
          globals: {
            "@autocode-ts/autocode": "autocode",
            "@autocode-ts/ac-extensions": "acExtensions",
            "@autocode-ts/ac-data-dictionary": "acDataDictionary",
          }
        }
    },
  },
};});
