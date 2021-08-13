#! /usr/bin/env node
const shell = require('shelljs')
const compiler = require('vue-template-compiler')

module.exports = async function buildCore() {
  shell.rm('-rf', 'es5', 'lib', 'src-temp')
  shell.exec('yarn run webpack -c webpack.config.js')
  //   shell.cp('-R', 'src/', 'src-temp')
  //   shell.exec(
  //     'yarn run cross-env NODE_ENV=es5 babel src-temp --out-dir es5 --source-maps'
  //   )
  //   shell.exec(
  //     'yarn run cross-env NODE_ENV=lib babel src-temp --out-dir lib --source-maps -q'
  //   )

  //   shell.rm('-rf', 'src-temp')
}
