#!/usr/bin/env node
const rollup = require('rollup')
const path = require('path')
const resolve = require('@rollup/plugin-node-resolve').default
const babel = require('@rollup/plugin-babel').default
const commonjs = require('@rollup/plugin-commonjs')
const vuePlugins = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const css = require('rollup-plugin-css-only')
const buildCore = require('./buildCoreComponents')

const currentWorkingPath = process.cwd()
const { main, name } = require(path.join(currentWorkingPath, 'package.json'))

const inputPath = path.join(currentWorkingPath, main)

const fileName = name.replace('@uyu-vue/', '')

let inputOptions = {}

let outputOptions = []

if (fileName === 'core') {
  buildCore()
  // inputOptions = {
  //   input: inputPath,
  //   // external: ['vue', 'vuetify', './packages/*'],
  //   external: [
  //     'vue',
  //     'vuetify',
  //     'lodash.debounce',
  //     'lodash.throttle',
  //     {
  //       '@uyu-vue/core/lib/packages/Pagination':
  //         '@uyu-vue/core/dist/Pagination',
  //     },
  //   ],
  //   plugins: [
  //     resolve({
  //       extensions: ['.js', '.vue', '.json'],
  //       // alias: {
  //       //   '@uyu-vue/core': path.resolve(__dirname, '..'),
  //       // },
  //     }),
  //     postcss({
  //       modules: true,
  //     }),
  //     css(),
  //     vuePlugins({ css: false }),

  //     babel({
  //       presets: ['@babel/preset-env'],
  //       babelHelpers: 'bundled',
  //     }),
  //   ],
  // }
  // outputOptions = [
  //   {
  //     file: `dist/${fileName}.cjs.js`,
  //     format: 'cjs',
  //   },
  //   {
  //     file: `dist/${fileName}.esm.js`,
  //     format: 'es',
  //   },
  // ]

  return
} else {
  inputOptions = {
    input: inputPath,
    external: ['vue', 'vuetify'],
    plugins: [
      resolve({
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'element-ui': path.resolve(__dirname, './'),
        },
      }),
      // commonjs(),
      postcss({
        modules: true,
      }),
      css(),
      vuePlugins({ css: false }),

      babel({
        presets: ['@babel/preset-env'],
        babelHelpers: 'bundled',
      }),
    ],
  }
  outputOptions = [
    {
      file: `dist/${fileName}.cjs.js`,
      format: 'cjs',
    },
    {
      file: `dist/${fileName}.esm.js`,
      format: 'es',
    },
  ]
}

async function build() {
  const bundle = await rollup.rollup(inputOptions)
  outputOptions.forEach(async (options) => {
    await bundle.write(options)
  })
}

build()
