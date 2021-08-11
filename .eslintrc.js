// ESlint 检查配置
module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/prettier'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-properties': [
      1,
      {
        groups: ['props', 'data', 'methods', 'computed'],
      },
    ],

    'vue/no-mutating-props': 'off',
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none',
      },
    ],
    'vue/no-unused-components': 1,
  },
}
