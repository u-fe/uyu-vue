'use strict';

var debounce = require('lodash.debounce');
var throttle = require('lodash.throttle');
var UPagination = require('@uyu-vue/pagination');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var throttle__default = /*#__PURE__*/_interopDefaultLegacy(throttle);
var UPagination__default = /*#__PURE__*/_interopDefaultLegacy(UPagination);

var script = {
  name: 'UTable',
  components: {
    UPagination: UPagination__default['default'],
  },

  props: {
    /**
     * 是否显示分页
     * */
    showPagination: {
      type: Boolean,
      default: true,
    },

    /**
     * 分页参数 参考 @uyu-vue/pagination 文档
     * */
    paginationProps: {
      type: Object,
      default() {
        return {}
      },
    },

    /**
     * 远程请求函数， promise函数
     * 返回的数据必须是 `{ rows: [], total: 10 }`
     * */
    serveRequest: {
      type: Function,
      default: undefined,
    },

    /**
     * 请求参数
     * 当 参数变动 则分页复位第一页以及重新 触发远程请求
     * */
    requestParams: {
      type: Object,
      default() {
        return {}
      },
    },

    /**
     * 分页数量 （当前页面显示的数量）
     * */
    pageSize: {
      type: Number,
      default: 10,
    },

    /**
     * 模式
     * table: 表格
     * scroll: 滚动加载
     * */
    mode: {
      type: String,
      default: 'table',
    },

    /**
     * 前端分页数据
     * */
    data: {
      type: Array,
      default() {
        return []
      },
    },

    /**
     * 表格高度
     * */
    height: {
      type: [Number, String],
      default: undefined,
    },

    /**
     * 滚动加载状态下 距离底部多大距离触发下一页
     * */
    lowerThreshold: {
      type: Number,
      default: 80,
    },
  },

  data() {
    return {
      currentPage: 1,
      total: 0,
      dataSource: [],
      currentPageSize: this.showPagination ? this.pageSize : 999999999,
      loading: false,

      // 内容高度
      contentHeight: 0,
      // 滚动加载 高度是否计算结束
      heightCalcEnd: true,

      // 滚动容器
      scrollWrapperEl: null,
    }
  },

  computed: {
    pagination() {
      return {
        pageNum: this.currentPage,
        pageSize: this.currentPageSize,
      }
    },

    // 是否是远程
    isRemote() {
      return typeof this.serveRequest === 'function'
    },

    // 是否滚动加载
    isScroll() {
      return this.mode === 'scroll'
    },

    // 表格高度
    tableHeight() {
      return this.isScroll ? this.height ?? 300 : this.height
    },

    // 表格最大显示数量 如果是滚动则不限制
    tableMaxNumber() {
      return this.isScroll ? 999999999 : this.currentPageSize
    },

    slots() {
      const defaultNoDataSlotNames = [
        'footer.prepend',
        'loading',
        'no-data',
        'no-results',
        'progress',
      ];
      return Object.values(
        Object.keys(this.$scopedSlots).reduce(
          (r, v) => {
            const idx = defaultNoDataSlotNames.includes(v) ? 0 : 1;
            return {
              ...r,
              [idx]: [...r[idx], v],
            }
          },
          {
            0: [],
            1: [],
          }
        )
      )
    },
  },

  watch: {
    requestParams: {
      immediate: true,
      deep: true,
      handler() {
        if (this.isRemote) {
          // 远程则复位
          this.resetPaginationRequest();
        }
      },
    },
    pagination(v) {
      // if (v.pageNum === 1) {
      //   this.dataSource = []
      // }

      this.emitPagination();
      this.handleRequest();
    },

    data: {
      immediate: true,
      handler(nv) {
        if (!this.isRemote) {
          // 不是远程则复位
          this.resetPaginationRequest();
        }
      },
    },
  },

  created() {
    this.initScrollContainer();
  },

  mounted() {
    this.emitPagination();
  },

  methods: {
    handleScroll(e) {
      if (
        this.isScroll &&
        this.heightCalcEnd &&
        this.contentHeight - e.target.scrollTop - this.tableHeight <
          this.lowerThreshold &&
        this.dataSource.length < this.total
      ) {
        this.heightCalcEnd = false;
        this.currentPage++;
      }
    },

    handleRequest() {
      if (!this.isRemote) {
        this.handleLocalRequest();
      } else {
        this.handleRemoteRequeset();
      }
    },

    // 本地分页模拟请求（前端分页）
    handleLocalRequest() {
      const { pageNum, pageSize } = this.pagination;

      this.dataSource = this.data?.slice?.(
        this.isScroll ? 0 : (pageNum - 1) * pageSize,
        pageNum * pageSize
      );
      this.total = this.data?.length ?? 0;
    },

    // 远程接口请求
    handleRemoteRequeset() {
      this.loading = true;

      const requestFn = this.serveRequest?.({
        ...this.pagination,
        ...(this.requestParams || {}),
      });

      if (typeof requestFn?.then === 'function') {
        requestFn
          .then((data) => {
            if (this.isScroll) {
              if (this.pagination.pageNum === 1) {
                this.scrollWrapperEl.scrollTop = 0;
                this.dataSource = data.rows ?? [];
              } else {
                this.dataSource = [...this.dataSource, ...(data.rows ?? [])];
              }
            } else {
              this.dataSource = data.rows;
            }
            this.total = data.total;
          })
          .catch(() => {
            this.dataSource = [];
            this.total = 0;
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.loading = false;
      }
    },

    emitPagination() {
      /**
       * 分页变动触发
       * @type {Event}
       */
      this.$emit('onPagination', this.pagination);
    },

    resetPaginationRequest() {
      if (this.currentPage === 1) {
        // this.dataSource = []
        // this.total = 0
        this.handleRequest();
      } else {
        this.currentPage = 1;
      }
    },

    // 初始化滚动容器
    initScrollContainer() {
      this.$nextTick(() => {
        if (!this.isScroll || this.scrollWrapperEl) return
        // 只有滚动才执行下面操作
        const containerEl = this.$refs.table.querySelector(
          '.v-data-table__wrapper'
        );

        if (!containerEl) return

        const containerTableEl = containerEl.querySelector('table');

        const listenersScroll = debounce__default['default'](this.handleScroll, 100);

        const listenersHeight = throttle__default['default'](() => {
          let height = parseFloat(
            window.getComputedStyle(containerTableEl).getPropertyValue('height')
          );
          if (height !== this.contentHeight) {
            this.contentHeight = height;
            this.heightCalcEnd = true;
          }
        }, 500);

        containerTableEl.addEventListener('animationend', listenersHeight);
        containerTableEl.addEventListener('transitionend', listenersHeight);
        containerEl.addEventListener('scroll', listenersScroll);

        let observer = new MutationObserver(listenersHeight);
        observer.observe(containerTableEl, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
        });

        this.scrollWrapperEl = containerEl;

        this.$once('beforeDestroyed', () => {
          if (observer) {
            observer.disconnect();
          }
          containerTableEl.removeEventListener('animationend', listenersHeight);
          containerTableEl.removeEventListener('transitionend', listenersHeight);
          containerEl.removeEventListener('scroll', listenersScroll);
        });
      });
    },
  },
};

const _hoisted_1 = { ref: "table" };
const _hoisted_2 = {
  key: 0,
  class: "flex-box middle mt-4"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_v_data_table = vue.resolveComponent("v-data-table");
  const _component_u_pagination = vue.resolveComponent("u-pagination");

  return (vue.openBlock(), vue.createBlock("div", _hoisted_1, [
    vue.createVNode(_component_v_data_table, vue.mergeProps({
      "hide-default-footer": "",
      "fixed-header": ""
    }, _ctx.$attrs, {
      loading: $data.loading,
      items: $data.dataSource,
      "items-per-page": $options.tableMaxNumber,
      height: $options.tableHeight
    }, vue.toHandlers(_ctx.$listeners)), vue.createSlots({
      default: vue.withCtx(() => [
        (vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.slots[0], (name) => {
          return vue.renderSlot(_ctx.$slots, name, { slot: name })
        }), 256 /* UNKEYED_FRAGMENT */))
      ]),
      _: 2 /* DYNAMIC */
    }, [
      vue.renderList($options.slots[1], (name) => {
        return {
          name: name,
          fn: vue.withCtx((bindData) => [
            vue.renderSlot(_ctx.$slots, name, bindData)
          ])
        }
      })
    ]), 1040 /* FULL_PROPS, DYNAMIC_SLOTS */, ["loading", "items", "items-per-page", "height"]),
    (!$options.isScroll && $props.showPagination && !!$data.total)
      ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [
          vue.createVNode(_component_u_pagination, vue.mergeProps({
            modelValue: $data.currentPage,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ($data.currentPage = $event)),
            total: $data.total,
            "total-visible": 7,
            size: $data.currentPageSize
          }, $props.paginationProps), null, 16 /* FULL_PROPS */, ["modelValue", "total", "size"])
        ]))
      : vue.createCommentVNode("v-if", true)
  ], 512 /* NEED_PATCH */))
}

script.render = render;
script.__file = "lib/Table.vue";

script.install = function (Vue) {
  Vue.component(script.name, script);
};

module.exports = script;
