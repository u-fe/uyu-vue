import { addons } from '@storybook/addons'
import { themes, create } from '@storybook/theming'

addons.setConfig({
  theme: create({
    base: 'light',

    // colorPrimary: 'hotpink',
    // colorSecondary: 'deepskyblue',

    // UI
    // appBg: 'white',
    // appContentBg: 'silver',
    // // appBorderColor: 'grey',
    // appBorderRadius: 4,

    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',

    // Text colors
    // textColor: 'black',
    // textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    // barTextColor: 'silver',
    // barSelectedColor: 'black',
    // barBg: 'hotpink',

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    brandTitle: 'UYU-VUE',
    // brandUrl: 'https://example.com',
    // brandImage: 'https://place-hold.it/350x150',
  }),
})
