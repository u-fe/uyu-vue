#!/usr/bin/env node
const rollup = require('rollup')
const path = require('path')
const resolve = require('@rollup/plugin-node-resolve').default
const babel = require('@rollup/plugin-babel').default
const commonjs = require('@rollup/plugin-commonjs')
const vuePlugins = require('rollup-plugin-vue')

const currentWorkingPath = process.cwd()
const { main, name } = require(path.join(currentWorkingPath, 'package.json'))

const inputPath = path.join(currentWorkingPath, main)

const fileName = name.replace('@uyu-vue/', '')

const inputOptions = {
  input: inputPath,
  external: ['vue', 'vuetify'],
  plugins: [
    // resolve(),
    // commonjs(),
    vuePlugins(),
    babel({
      presets: ['@babel/preset-env'],
      babelHelpers: 'bundled',
    }),
  ],
}

const outputOptions = [
  {
    file: `dist/${fileName}.cjs.js`,
    format: 'cjs',
  },
  {
    file: `dist/${fileName}.esm.js`,
    format: 'esm',
  },
]

async function build() {
  const bundle = await rollup.rollup(inputOptions)
  outputOptions.forEach(async (options) => {
    await bundle.write(options)
  })
}

build()
