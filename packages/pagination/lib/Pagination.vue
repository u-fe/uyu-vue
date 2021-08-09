<template>
  <div class="u_pagination">
    <div class="u_pagination_total_text">共{{ total }}条</div>
    {{ $props }}
    <v-pagination
      v-model="pageNo"
      :length="pageCount"
      :total-visible="totalVisible"
      v-bind="{ ...$attrs, ...$props }"
      v-on="$listeners"
    />

    <v-select
      class="u_pagination_sizes_select"
      v-model="pageSize"
      dense
      :items="sizeOptions"
      item-text="label"
      item-value="value"
      outlined
      hide-details
      @change="handleChangeSizeSelect"
    />
  </div>
</template>

<script>
import { VPagination } from 'vuetify/lib'

console.log(VPagination.options.props)

export default {
  name: 'UPagination',

  props: {
    color: VPagination.options.props.color,
    circle: VPagination.options.props.circle,
    currentPageAriaLabel: VPagination.options.props.currentPageAriaLabel,
    dark: VPagination.options.props.dark,
    disabled: VPagination.options.props.disabled,
    light: VPagination.options.props.light,
    nextAriaLabel: VPagination.options.props.nextAriaLabel,
    nextIcon: VPagination.options.props.nextIcon,
    pageAriaLabel: VPagination.options.props.pageAriaLabel,
    prevIcon: VPagination.options.props.prevIcon,
    previousAriaLabel: VPagination.options.props.previousAriaLabel,
    totalVisible: VPagination.options.props.totalVisible,
    /** 发送验证码接口函数 */
    wrapperAriaLabel: {
      type: VPagination.options.props.wrapperAriaLabel.type,
    },
    /** 发送验证码接口函数 */
    value: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 20,
    },
    sizes: {
      type: Array,
      default: () => [10, 20, 30, 50, 100],
    },
    total: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      pageNo: this.value,
      pageSize: this.size,
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(nv) {
        this.pageNo = nv
      },
    },
    size: {
      immediate: true,
      handler(nv) {
        this.pageSize = nv
      },
    },
    pageNo(v) {
      /**
       * Passthrough click event
       * @type {Event}
       */
      this.$emit('input', v)
      /**
       * Passthrough click event asdfasdf asdafsdf
       * @type {Event}
       */
      this.$emit('page-change', v)
    },
    pageSize(v) {
      /**
       * Passthrough click event asdfasdf asdafsdf
       * @type {Event}
       */
      this.$emit('update:size', v)
      /**
       * Passthrough click event asdfasdf asdafsdf
       * @type {Event}
       */
      this.$emit('size-change', v)
    },
  },

  computed: {
    pageCount() {
      return Math.ceil(this.total / this.pageSize) || 1
    },

    sizeOptions() {
      return this.sizes.map((v) => ({
        label: `${v}`,
        value: v,
      }))
    },
  },

  methods: {
    handleChangeSizeSelect(value) {
      this.pageSize = value
    },
  },
}
</script>

<style lang="scss"  >
.u_pagination {
  display: flex;
  align-items: center;
  font-size: 14px;

  &_total_text {
    color: #666;
  }

  &_sizes_select {
    max-width: 100px;
  }
}
</style>
