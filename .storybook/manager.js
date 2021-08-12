import { addons } from '@storybook/addons'
import { themes, create } from '@storybook/theming'

addons.setConfig({
  panelPosition: 'right',
  theme: create({
    base: 'light',

    fontBase: '"Open Sans", sans-serif',
    fontCode: 'monospace',

    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    brandTitle: 'UYU-VUE',
    // brandUrl: 'https://example.com',
    // brandImage: 'https://place-hold.it/350x150',
  }),
})
