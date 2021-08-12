const path = require('path')

module.exports = {
  stories: [
    '../stories/**/*.stories.@(js|mdx)',
    '../packages/**/*.stories.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
  ],
  // add this function to tweak the webpack config
  webpackFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...(config.resolve?.alias || {}),
      '~storybook': path.resolve(__dirname),
      '@': path.resolve(__dirname, '..'),
      '@uyu-vue/core': path.resolve(__dirname, '../packages/core'),
    }

    config.module.rules.push({
      test: /\.s(c|a)ss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              implementation: require('sass'),
              // indentedSyntax: true,
            },
            // prependData: "@import '@/src/scss/variables.scss'",
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    })

    return config
  },
}
