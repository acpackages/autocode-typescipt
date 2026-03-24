/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(({ command }) => {
  const tsconfig = command === 'build' ? 'tsconfig.lib.build.json' : 'tsconfig.lib.json';
  return {
    root: __dirname,
    cacheDir: '../../../node_modules/.vite/packages/node/ac-web-on-express',
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
      outDir: '../../../dist/packages/node/ac-web-on-express',
      emptyOutDir: true,
      reportCompressedSize: true,
      lib: {
        // Could also be a dictionary or array of multiple entry points.
        entry: 'src/ac-web-on-express.ts',
        name: 'acSqlNode',
        fileName: (format) => {
          if (format === 'es') return 'ac-web-on-express.js';
          if (format === 'cjs') return 'ac-web-on-express.cjs';
          return 'ac-web-on-express.js';
        },
        formats: ['es' as const, 'cjs' as const],
      },
      rollupOptions: {
        // External packages that should not be bundled into your library.
        external: [
          "@autocode-ts/autocode",
          "@autocode-ts/ac-web",
          'fs',
          'path',
          'https',
          "express",
          "cors",
          "cookie-parser",
          "multer"
        ],
        output: {
          globals: {
            "@autocode-ts/autocode": "autocode",
            "@autocode-ts/ac-web": "acWeb",
            express: 'express',
            cors: 'cors',
            'cookie-parser': 'cookieParser',
            multer: 'multer'
          }
        }
      },
    },
  };
});
