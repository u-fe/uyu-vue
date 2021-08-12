// rollup.config.js
const fs = require('fs-extra')
const path = require('path')
const rollup = require('rollup')

const resolve = require('@rollup/plugin-node-resolve').default
const babel = require('@rollup/plugin-babel').default
const commonjs = require('@rollup/plugin-commonjs')
const vuePlugins = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')
const css = require('rollup-plugin-css-only')
// import postcssScss from 'postcss-scss'
// import autoprefixer from 'autoprefixer'
// import base64 from 'postcss-base64'
// import url from 'rollup-plugin-url'

// import progress from 'rollup-plugin-progress'
// import filesize from 'rollup-plugin-filesize'

function isDir(dir) {
  return fs.lstatSync(dir).isDirectory()
}

// const buildPackages = []
// for (let name of packages) {
//   const file = packages[name]
//   buildPackages.push(createRollupConfig(file, name))
// }

module.exports = async function buildCore() {
  const currentWorkingPath = process.cwd()
  let packages = {
    'uyu-vue': path.join(currentWorkingPath, './lib/index.js'),
  }
  const dir = path.join(currentWorkingPath, './lib/packages')
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const absolutePath = path.join(dir, file)

    if (isDir(absolutePath)) {
      packages[file] = path.join(absolutePath, 'index.js')
    }
  })

  function createRollupConfig(file, name) {
    const config = {
      input: file,
      external: [
        'vue',
        'vuetify',
        'lodash.debounce',
        'lodash.throttle',
        '@uyu-vue/core/lib/packages/Pagination',
      ],

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
        commonjs(),
      ],
    }
    return config
  }

  async function build(packages) {
    for (let name in packages) {
      const file = packages[name]
      rollup.rollup(createRollupConfig(file, name)).then((bundle) => {
        return bundle.write({
          file: `dist/${name}.esm.js`,
          format: 'esm',
          name: name,
        })
      })
    }
  }

  await build(packages)
}
