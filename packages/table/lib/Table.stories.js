import { storyFactory } from '~storybook/util/helpers'
import MyButton from './Table.vue'

export default storyFactory({
  title: 'components/Table',
  component: MyButton,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
})

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<my-button @onClick="onClick" v-bind="$props" />',
})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button',
}
