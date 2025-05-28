import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import path from 'path';
import pkg from './package.json' assert { type: 'json' };

const outputDir = '../../../dist/packages/common/autocode';

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
      name: 'Autocode',
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'fs','fs/promises', 'path'
  ],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.ts'],
    }),
    commonjs(),
    json(),
    globals(),
    builtins(),
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
    }),

  ]
};
