// Imports for configuring Vuetify
import Vue from 'vue'
import i18n from '@/src/plugins/i18n'
import vuetify, { options } from '@/src/plugins/vuetify' // <== important

// this was the only thing here by default
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// THIS is my decorator
export const decorators = [
  (story, context) => {
    // wrap the passed component within the passed context
    const wrapped = story(context)
    // extend Vue to use Vuetify around the wrapped component

    return Vue.extend({
      vuetify,
      i18n,
      components: { wrapped },
      props: {
        dark: {
          type: Boolean,
          default: context.args.dark,
        },
        locale: {
          type: String,
          default: 'zh',
        },
      },
      watch: {
        dark: {
          immediate: true,
          handler(val) {
            this.$vuetify.theme.dark = val
          },
        },
        locale: {
          immediate: true,
          handler(val) {
            this.$i18n.locale = val
          },
        },
      },
      template: `
        <v-app id="${Math.random()}"> 
            <wrapped /> 
        </v-app>
      `,
    })
  },

  (story, context) => {
    // wrap the passed component within the passed context
    const wrapped = story(context)
    // extend Vue to use Vuetify around the wrapped component

    return Vue.extend({
      components: { wrapped },

      template: ` 
            <wrapped />  
      `,
    })
  },
]
