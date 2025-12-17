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
    cacheDir: '../../../node_modules/.vite/packages/browser/ac-browser',
    plugins: [
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md',
        {
          input: 'src/lib/components/ac-datagrid/css',
          glob: '**/*.css',
          output: 'css',
        },
        {
          input: 'src/lib/components/ac-tabs/css',
          glob: '**/*.css',
          output: 'css',
        }
      ]),
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
    resolve:{
      preserveSymlinks:true,
      external:['@autocode-ts/autocode']
    },
    build: {
      outDir: '../../../dist/packages/browser/ac-browser',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      lib: {
        // Could also be a dictionary or array of multiple entry points.
        entry: 'src/ac-browser.ts',
        name: 'acBrowser',
        fileName: (format) => {
          if (format === 'es') return 'ac-browser.js';
          if (format === 'cjs') return 'ac-browser.cjs';
          if (format === 'umd') return 'ac-browser.umd.js';
          return 'ac-browser.js';
        },
        formats: ['es' as const, 'cjs' as const, 'umd' as const],
      },
      rollupOptions: {
        // External packages that should not be bundled into your library.
        external: [
          "@autocode-ts/autocode",
          "@autocode-ts/ac-extensions",
          "@autocode-ts/ac-icons",
          "@popperjs/core"
        ],
      },
    },
  };
});
