/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../../node_modules/.vite/packages/common/ac-data-bridge',
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
    outDir: '../../../dist/packages/common/ac-data-bridge',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/ac-data-bridge.ts',
      name: 'acDataBridge',
      fileName: (format) => {
        if (format === 'es') return 'ac-data-bridge.js';
        if (format === 'cjs') return 'ac-data-bridge.cjs';
        if (format === 'umd') return 'ac-data-bridge.umd.js';
        return 'ac-data-bridge.js';
      },
      // Change this to the formats you want to support.
      // Don't forget to update your package.json as well.
      formats: ['es' as const, 'cjs' as const, 'umd' as const],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        "@autocode-ts/ac-data-dictionary",
        "@autocode-ts/ac-extensions",
        "@autocode-ts/autocode",
        "comlink",
        "xlsx",
      ],
    },
  },
}));
