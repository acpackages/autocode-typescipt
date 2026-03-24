/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(({ command }) => {
  const tsconfig = 'tsconfig.lib.json';
  return {
    root: __dirname,
    cacheDir: '../../../node_modules/.vite/packages/node/ac-web',
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
    resolve: {
      preserveSymlinks: true,
      external: ['@autocode-ts/autocode']
    },
    build: {
      outDir: '../../../dist/packages/node/ac-web',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      lib: {
        // Could also be a dictionary or array of multiple entry points.
        entry: 'src/ac-web.ts',
        name: 'acWeb',
        fileName: (format) => {
          if (format === 'es') return 'ac-web.js';
          if (format === 'cjs') return 'ac-web.cjs';
          if (format === 'umd') return 'ac-web.umd.js';
          return 'ac-web.js';
        },
        formats: ['es' as const, 'cjs' as const, 'umd' as const],
      },
      rollupOptions: {
        // External packages that should not be bundled into your library.
        external: [
          "@autocode-ts/autocode",
          "@autocode-ts/ac-extensions",
          "@autocode-ts/ac-data-dictionary",
          "@autocode-ts/ac-sql-node",
          "@autocode-ts/ac-sql",
          "@sharp",
          "@tslib"
        ],
        output: {
          globals: {
            "@autocode-ts/autocode": "autocode",
            "@autocode-ts/ac-extensions": "acExtensions",
            "@autocode-ts/ac-data-dictionary": "acDataDictionary",
            "@autocode-ts/ac-sql-node": "acSqlNode",
            "@autocode-ts/ac-sql": "acSql"
          }
        }
      },
    },
  };
});
