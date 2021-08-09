import { storyFactory } from '~storybook/util/helpers'
import Pagination from './Pagination.vue'

export default storyFactory({
  title: 'components/Pagination',
  component: Pagination,
  argTypes: {
    backgroundColor: { type: 'color', control: 'color' },
    size: {
      control: { type: 'select', options: ['small', 'medium', 'large'] },
    },
  },
  parameters: {
    actions: {
      handles: ['size-change', 'input'],
    },
  },
})

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Pagination },
  template: '<Pagination  @size-change="handleSizeChange" v-bind="$props" />',
  methods: {
    handleSizeChange(v) {
      console.log('asdfasdfa', v)
    },
  },
})

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button',
}
