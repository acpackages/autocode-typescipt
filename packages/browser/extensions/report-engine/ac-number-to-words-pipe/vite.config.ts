/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir:
    '../../../../../node_modules/.vite/packages/browser/extensions/report-engine/ac-number-to-words-pipe',
  plugins: [
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    outDir:
      '../../../../../dist/packages/browser/extensions/report-engine/ac-number-to-words-pipe',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/ac-number-to-words-pipe.ts',
      name: 'acNumberToWordsPipe',
      fileName: (format) => {
        if (format === 'es') return 'ac-number-to-words-pipe.js';
        if (format === 'cjs') return 'ac-number-to-words-pipe.cjs';
        if (format === 'umd') return 'ac-number-to-words-pipe.umd.js';
        return 'ac-number-to-words-pipe.js';
      },
      formats: ['es' as const, 'cjs' as const, 'umd' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        "@autocode-ts/ac-report-engine"
      ],
      output: {
        globals: {
          "@autocode-ts/ac-report-engine": "acReportEngine"
        }
      },
    },
  },
}));
