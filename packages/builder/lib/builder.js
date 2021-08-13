#!/usr/bin/env node
const rollup = require('rollup')
const path = require('path')
const fs = require('fs-extra')
const shell = require('shelljs')
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

function isDir(dir) {
  return fs.lstatSync(dir).isDirectory()
}

function createRollupConfig(file, name) {
  const config = {
    input: file,
    external: ['vue', 'vuetify', 'lodash.debounce', 'lodash.throttle'],

    plugins: [
      resolve({
        extensions: ['.js', '.vue', '.json'],
      }),
      postcss({
        modules: true,
      }),
      css(),
      vuePlugins({ css: false }),

      babel({
        presets: ['@babel/preset-env'],
        babelHelpers: 'bundled',
      }),
      // commonjs(),
    ],
  }
  return config
}

const defaultOutputConfig = [
  { dir: 'lib', format: 'esm' },
  // { dir: 'es5', format: 'cjs' },
]

if (fileName === 'core') {
  // shell.exec(
  //   `yarn run cross-env NODE_ENV=es5 babel src  --out-dir es5  --source-maps --ignore "src/components/**/*" --presets=@babel/preset-env`
  // )
  shell.exec(
    `yarn run cross-env NODE_ENV=lib babel src  --out-dir lib  --source-maps --ignore "src/components/**/*"`
  )

  const dir = path.join(currentWorkingPath, './src/components')

  if (isDir(dir)) {
    const files = fs.readdirSync(dir)
    files.forEach((componentName) => {
      const absolutePath = path.join(dir, componentName)
      if (isDir(absolutePath)) {
        rollup
          .rollup(createRollupConfig(path.join(absolutePath, 'index.js')))
          .then((bundle) =>
            Promise.all(
              defaultOutputConfig.map((item) =>
                bundle.write({
                  file: `${item.dir}/components/${componentName}/index.js`,
                  format: item.format,
                  name: componentName,
                })
              )
            )
          )
      }
    })
  }

  // buildCore()
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
    external: (id) => {
      return ['lodash.debounce', 'lodash.throttle', './pagination'].includes(id)
    },
    // external: [
    //   'vue',
    //   'vuetify',
    //   'lodash.debounce',
    //   'lodash.throttle',
    //   (id) => ,
    // ],
    plugins: [
      resolve({
        extensions: ['.js', '.vue', '.json'],
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
      format: 'esm',
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
