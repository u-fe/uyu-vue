const path = require('path')
const fs = require('fs-extra')
const { VueLoaderPlugin } = require('vue-loader')

function isDir(dir) {
  return fs.lstatSync(dir).isDirectory()
}
const currentWorkingPath = process.cwd()
let packages = {}
const dir = path.join(currentWorkingPath, './src/components')
const files = fs.readdirSync(dir)

files.forEach((file) => {
  const absolutePath = path.join(dir, file)

  if (isDir(absolutePath)) {
    packages[file] = path.join(absolutePath, 'index.js')
  }
})

module.exports = {
  mode: 'production',
  entry: packages,
  output: {
    path: path.resolve(process.cwd(), './src-temp'),
    filename: '[name].js',
    // chunkFilename: '[id].js',
    libraryTarget: 'commonjs2',
  },
  externals: ['vue', 'vuetify', 'lodash.debounce', 'lodash.throttle'],
  resolve: {
    extensions: ['.js', '.vue', '.json'],

    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  performance: {
    hints: false,
  },
  stats: 'none',
  optimization: {
    minimize: false,
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
  ],
}
