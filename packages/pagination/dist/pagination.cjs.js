'use strict';

var vue = require('vue');

// import { VPagination } from 'vuetify'

// console.log(VPagination.options.props)

var script = {
  name: 'UPagination',

  props: {
    // color: VPagination.options.props.color,
    // circle: VPagination.options.props.circle,
    // currentPageAriaLabel: VPagination.options.props.currentPageAriaLabel,
    // dark: VPagination.options.props.dark,
    // disabled: VPagination.options.props.disabled,
    // light: VPagination.options.props.light,
    // nextAriaLabel: VPagination.options.props.nextAriaLabel,
    // nextIcon: VPagination.options.props.nextIcon,
    // pageAriaLabel: VPagination.options.props.pageAriaLabel,
    // prevIcon: VPagination.options.props.prevIcon,
    // previousAriaLabel: VPagination.options.props.previousAriaLabel,
    // totalVisible: VPagination.options.props.totalVisible,
    /** 发送验证码接口函数 */
    // wrapperAriaLabel: {
    //   type: VPagination.options.props.wrapperAriaLabel.type,
    // },
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
        this.pageNo = nv;
      },
    },
    size: {
      immediate: true,
      handler(nv) {
        this.pageSize = nv;
      },
    },
    pageNo(v) {
      /**
       * Passthrough click event
       * @type {Event}
       */
      this.$emit('input', v);
      /**
       * Passthrough click event asdfasdf asdafsdf
       * @type {Event}
       */
      this.$emit('page-change', v);
    },
    pageSize(v) {
      /**
       * Passthrough click event asdfasdf asdafsdf
       * @type {Event}
       */
      this.$emit('update:size', v);
      /**
       * Passthrough click event asdfasdf asdafsdf
       * @type {Event}
       */
      this.$emit('size-change', v);
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
      this.pageSize = value;
    },
  },
};

const _hoisted_1 = { class: "u_pagination" };
const _hoisted_2 = { class: "u_pagination_total_text" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.createVNode("div", _hoisted_2, "共" + vue.toDisplayString($props.total) + "条", 1 /* TEXT */),
    vue.createCommentVNode(" <v-pagination\n      v-model=\"pageNo\"\n      :length=\"pageCount\"\n      :total-visible=\"totalVisible\"\n      v-bind=\"{ ...$attrs, ...$props }\"\n      v-on=\"$listeners\"\n    />\n\n    <v-select\n      class=\"u_pagination_sizes_select\"\n      v-model=\"pageSize\"\n      dense\n      :items=\"sizeOptions\"\n      item-text=\"label\"\n      item-value=\"value\"\n      outlined\n      hide-details\n      @change=\"handleChangeSizeSelect\"\n    /> ")
  ]))
}

script.render = render;
script.__file = "lib/Pagination.vue";

script.install = function (Vue) {
  Vue.component(script.name, script);
};

module.exports = script;
