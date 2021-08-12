'use strict';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var debounce = require('lodash.debounce');

var throttle = require('lodash.throttle');

var UPagination = require('@uyu-vue/pagination');

var vue = require('vue');

function _interopDefaultLegacy$1(e) {
  return e && _typeof(e) === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var debounce__default = /*#__PURE__*/_interopDefaultLegacy$1(debounce);

var throttle__default = /*#__PURE__*/_interopDefaultLegacy$1(throttle);

var UPagination__default = /*#__PURE__*/_interopDefaultLegacy$1(UPagination);

var script = {
  name: 'UTable',
  components: {
    UPagination: UPagination__default['default']
  },
  props: {
    /**
     * 是否显示分页
     * */
    showPagination: {
      type: Boolean,
      "default": true
    },

    /**
     * 分页参数 参考 @uyu-vue/pagination 文档
     * */
    paginationProps: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },

    /**
     * 远程请求函数， promise函数
     * 返回的数据必须是 `{ rows: [], total: 10 }`
     * */
    serveRequest: {
      type: Function,
      "default": undefined
    },

    /**
     * 请求参数
     * 当 参数变动 则分页复位第一页以及重新 触发远程请求
     * */
    requestParams: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },

    /**
     * 分页数量 （当前页面显示的数量）
     * */
    pageSize: {
      type: Number,
      "default": 10
    },

    /**
     * 模式
     * table: 表格
     * scroll: 滚动加载
     * */
    mode: {
      type: String,
      "default": 'table'
    },

    /**
     * 前端分页数据
     * */
    data: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },

    /**
     * 表格高度
     * */
    height: {
      type: [Number, String],
      "default": undefined
    },

    /**
     * 滚动加载状态下 距离底部多大距离触发下一页
     * */
    lowerThreshold: {
      type: Number,
      "default": 80
    }
  },
  data: function data() {
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
      scrollWrapperEl: null
    };
  },
  computed: {
    pagination: function pagination() {
      return {
        pageNum: this.currentPage,
        pageSize: this.currentPageSize
      };
    },
    // 是否是远程
    isRemote: function isRemote() {
      return typeof this.serveRequest === 'function';
    },
    // 是否滚动加载
    isScroll: function isScroll() {
      return this.mode === 'scroll';
    },
    // 表格高度
    tableHeight: function tableHeight() {
      var _this$height;

      return this.isScroll ? (_this$height = this.height) !== null && _this$height !== void 0 ? _this$height : 300 : this.height;
    },
    // 表格最大显示数量 如果是滚动则不限制
    tableMaxNumber: function tableMaxNumber() {
      return this.isScroll ? 999999999 : this.currentPageSize;
    },
    slots: function slots() {
      var defaultNoDataSlotNames = ['footer.prepend', 'loading', 'no-data', 'no-results', 'progress'];
      return Object.values(Object.keys(this.$scopedSlots || {}).reduce(function (r, v) {
        var idx = defaultNoDataSlotNames.includes(v) ? 0 : 1;
        return _objectSpread2(_objectSpread2({}, r), {}, _defineProperty({}, idx, [].concat(_toConsumableArray(r[idx]), [v])));
      }, {
        0: [],
        1: []
      }));
    }
  },
  watch: {
    requestParams: {
      immediate: true,
      deep: true,
      handler: function handler() {
        if (this.isRemote) {
          // 远程则复位
          this.resetPaginationRequest();
        }
      }
    },
    pagination: function pagination(v) {
      // if (v.pageNum === 1) {
      //   this.dataSource = []
      // }
      this.emitPagination();
      this.handleRequest();
    },
    data: {
      immediate: true,
      handler: function handler(nv) {
        if (!this.isRemote) {
          // 不是远程则复位
          this.resetPaginationRequest();
        }
      }
    }
  },
  created: function created() {
    this.initScrollContainer();
  },
  mounted: function mounted() {
    this.emitPagination();
  },
  methods: {
    handleScroll: function handleScroll(e) {
      if (this.isScroll && this.heightCalcEnd && this.contentHeight - e.target.scrollTop - this.tableHeight < this.lowerThreshold && this.dataSource.length < this.total) {
        this.heightCalcEnd = false;
        this.currentPage++;
      }
    },
    handleRequest: function handleRequest() {
      if (!this.isRemote) {
        this.handleLocalRequest();
      } else {
        this.handleRemoteRequeset();
      }
    },
    // 本地分页模拟请求（前端分页）
    handleLocalRequest: function handleLocalRequest() {
      var _this$data, _this$data$slice, _this$data$length, _this$data2;

      var _this$pagination = this.pagination,
          pageNum = _this$pagination.pageNum,
          pageSize = _this$pagination.pageSize;
      this.dataSource = (_this$data = this.data) === null || _this$data === void 0 ? void 0 : (_this$data$slice = _this$data.slice) === null || _this$data$slice === void 0 ? void 0 : _this$data$slice.call(_this$data, this.isScroll ? 0 : (pageNum - 1) * pageSize, pageNum * pageSize);
      this.total = (_this$data$length = (_this$data2 = this.data) === null || _this$data2 === void 0 ? void 0 : _this$data2.length) !== null && _this$data$length !== void 0 ? _this$data$length : 0;
    },
    // 远程接口请求
    handleRemoteRequeset: function handleRemoteRequeset() {
      var _this$serveRequest,
          _this = this;

      this.loading = true;
      var requestFn = (_this$serveRequest = this.serveRequest) === null || _this$serveRequest === void 0 ? void 0 : _this$serveRequest.call(this, _objectSpread2(_objectSpread2({}, this.pagination), this.requestParams || {}));

      if (typeof (requestFn === null || requestFn === void 0 ? void 0 : requestFn.then) === 'function') {
        requestFn.then(function (data) {
          if (_this.isScroll) {
            if (_this.pagination.pageNum === 1) {
              var _data$rows;

              _this.scrollWrapperEl.scrollTop = 0;
              _this.dataSource = (_data$rows = data.rows) !== null && _data$rows !== void 0 ? _data$rows : [];
            } else {
              var _data$rows2;

              _this.dataSource = [].concat(_toConsumableArray(_this.dataSource), _toConsumableArray((_data$rows2 = data.rows) !== null && _data$rows2 !== void 0 ? _data$rows2 : []));
            }
          } else {
            _this.dataSource = data.rows;
          }

          _this.total = data.total;
        })["catch"](function () {
          _this.dataSource = [];
          _this.total = 0;
        })["finally"](function () {
          _this.loading = false;
        });
      } else {
        this.loading = false;
      }
    },
    emitPagination: function emitPagination() {
      /**
       * 分页变动触发
       * @type {Event}
       */
      this.$emit('onPagination', this.pagination);
    },
    resetPaginationRequest: function resetPaginationRequest() {
      if (this.currentPage === 1) {
        // this.dataSource = []
        // this.total = 0
        this.handleRequest();
      } else {
        this.currentPage = 1;
      }
    },
    // 初始化滚动容器
    initScrollContainer: function initScrollContainer() {
      var _this2 = this;

      this.$nextTick(function () {
        if (!_this2.isScroll || _this2.scrollWrapperEl) return; // 只有滚动才执行下面操作

        var containerEl = _this2.$refs.table.querySelector('.v-data-table__wrapper');

        if (!containerEl) return;
        var containerTableEl = containerEl.querySelector('table');
        var listenersScroll = debounce__default['default'](_this2.handleScroll, 100);
        var listenersHeight = throttle__default['default'](function () {
          var height = parseFloat(window.getComputedStyle(containerTableEl).getPropertyValue('height'));

          if (height !== _this2.contentHeight) {
            _this2.contentHeight = height;
            _this2.heightCalcEnd = true;
          }
        }, 500);
        containerTableEl.addEventListener('animationend', listenersHeight);
        containerTableEl.addEventListener('transitionend', listenersHeight);
        containerEl.addEventListener('scroll', listenersScroll);
        var observer = new MutationObserver(listenersHeight);
        observer.observe(containerTableEl, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true
        });
        _this2.scrollWrapperEl = containerEl;

        _this2.$once('beforeDestroyed', function () {
          if (observer) {
            observer.disconnect();
          }

          containerTableEl.removeEventListener('animationend', listenersHeight);
          containerTableEl.removeEventListener('transitionend', listenersHeight);
          containerEl.removeEventListener('scroll', listenersScroll);
        });
      });
    }
  }
};
var _hoisted_1 = {
  ref: "table"
};
var _hoisted_2 = {
  key: 0,
  "class": "flex-box middle mt-4"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_v_data_table = vue.resolveComponent("v-data-table");

  var _component_u_pagination = vue.resolveComponent("u-pagination");

  return vue.openBlock(), vue.createBlock("div", _hoisted_1, [vue.createVNode(_component_v_data_table, vue.mergeProps({
    "hide-default-footer": "",
    "fixed-header": ""
  }, _ctx.$attrs, {
    loading: $data.loading,
    items: $data.dataSource,
    "items-per-page": $options.tableMaxNumber,
    height: $options.tableHeight
  }, vue.toHandlers(_ctx.$listeners)), vue.createSlots({
    "default": vue.withCtx(function () {
      return [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList($options.slots[0], function (name) {
        return vue.renderSlot(_ctx.$slots, name, {
          slot: name
        });
      }), 256
      /* UNKEYED_FRAGMENT */
      ))];
    }),
    _: 2
    /* DYNAMIC */

  }, [vue.renderList($options.slots[1], function (name) {
    return {
      name: name,
      fn: vue.withCtx(function (bindData) {
        return [vue.renderSlot(_ctx.$slots, name, bindData)];
      })
    };
  })]), 1040
  /* FULL_PROPS, DYNAMIC_SLOTS */
  , ["loading", "items", "items-per-page", "height"]), !$options.isScroll && $props.showPagination && !!$data.total ? (vue.openBlock(), vue.createBlock("div", _hoisted_2, [vue.createVNode(_component_u_pagination, vue.mergeProps({
    modelValue: $data.currentPage,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.currentPage = $event;
    }),
    total: $data.total,
    "total-visible": 7,
    size: $data.currentPageSize
  }, $props.paginationProps), null, 16
  /* FULL_PROPS */
  , ["modelValue", "total", "size"])])) : vue.createCommentVNode("v-if", true)], 512
  /* NEED_PATCH */
  );
}

script.render = render;
script.__file = "lib/Table.vue";

script.install = function (Vue) {
  Vue.component(script.name, script);
};

module.exports = script;
