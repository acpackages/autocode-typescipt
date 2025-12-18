import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    angular({
      tsconfig: path.resolve(__dirname, './tsconfig.lib.json') // 👈 add this line
    }),
    dts({
      entryRoot: 'src',
      outDir: 'dist/packages/angular/ac-angular',
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/ac-angular.ts'),
      name: 'AcAngular',
      fileName: 'ac-angular',
      formats: ['es'],
    },
    outDir: 'dist/packages/angular/ac-angular',
    emptyOutDir: true,
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        "@angular/cdk",
        "@angular/core",
        "@angular/common",
        "@autocode-ts/ac-browser",
        "@autocode-ts/ac-extensions",
        "@autocode-ts/ac-template-engine",
        "@autocode-ts/autocode",
        "@primeng/themes",
        "tslib"
      ],
    },
  },
});
