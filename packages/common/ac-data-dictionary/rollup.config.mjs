import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import path from 'path';
import fs from 'fs';
import pkg from './package.json' assert { type: 'json' };
const outputDir = '../../../dist/packages/common/ac-data-dictionary';
export default {
  input: path.resolve(process.cwd(), 'src/index.ts'),
  output: [
    {
      file: path.join(outputDir, 'index.cjs'),
      format: 'cjs',
      sourcemap: true
    },
    {
      file: path.join(outputDir, 'index.mjs'),
      format: 'esm',
      sourcemap: true
    },
    {
      file: path.join(outputDir, 'index.umd.js'),
      format: 'umd',
      name: 'Autocode Data Dictionary',
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.ts'],
      preserveSymlinks: true
    }),
    commonjs(),
    json(),
    typescript({
      tsconfig: path.resolve(process.cwd(), 'tsconfig.lib.json'),
      clean: true,
      useTsconfigDeclarationDir: true
    }),
    terser(),
    copy({
      targets: [
        { src: 'package.json', dest: outputDir },
        { src: 'README.md', dest: outputDir }
      ]
    })
  ]
};
