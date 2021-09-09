'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var debounce = require('lodash.debounce');

var throttle = require('lodash.throttle');

function _interopDefaultLegacy(e) {
  return e && _typeof(e) === 'object' && 'default' in e ? e : {
    'default': e
  };
}

var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);

var throttle__default = /*#__PURE__*/_interopDefaultLegacy(throttle); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var script$1 = {
  name: 'UPagination',
  props: {
    /** 当前页码 */
    value: {
      type: Number,
      "default": 1
    },

    /** 页面展示的数量 支持 .sync 修饰符 **/
    size: {
      type: Number,
      "default": 20
    },

    /** 每页显示数量 选择器的选项设置 **/
    sizes: {
      type: Array,
      "default": function _default() {
        return [10, 20, 30, 50, 100];
      }
    },

    /** 总条目数 **/
    total: {
      type: Number,
      "default": 10
    }
  },
  data: function data() {
    return {
      pageNo: this.value,
      pageSize: this.size
    };
  },
  computed: {
    pageCount: function pageCount() {
      return Math.ceil(this.total / this.pageSize) || 1;
    },
    sizeOptions: function sizeOptions() {
      return this.sizes.map(function (v) {
        return {
          label: "".concat(v),
          value: v
        };
      });
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler(nv) {
        this.pageNo = nv;
      }
    },
    size: {
      immediate: true,
      handler: function handler(nv) {
        this.pageSize = nv;
      }
    },
    pageNo: function pageNo(v) {
      /**
       * 被绑定模型的更新（页码）
       * @type {Event}
       */
      this.$emit('input', v);
      /**
       * 修改当前页码 触发
       * @type {Event}
       */

      this.$emit('page-change', v);
    },
    pageSize: function pageSize(v) {
      /**
       * 更新绑定的页面数量
       * @type {Event}
       */
      this.$emit('update:size', v);
      /**
       * 需改页面数量 触发
       * @type {Event}
       */

      this.$emit('size-change', v);
      /**
       * 被绑定模型的更新（页码）
       * @type {Event}
       */

      this.$emit('input', 1);
      /**
       * 修改当前页码 触发
       * @type {Event}
       */

      this.$emit('page-change', 1);
    }
  },
  methods: {
    handleChangeSizeSelect: function handleChangeSizeSelect(value) {
      this.pageSize = value;
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}
/* script */


var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__$1() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "d-flex align-center justify-center"
  }, [_c("div", [_vm._v("共" + _vm._s(_vm.total) + "条")]), _vm._v(" "), _c("v-pagination", _vm._g(_vm._b({
    attrs: {
      length: _vm.pageCount,
      total: _vm.total
    },
    model: {
      value: _vm.pageNo,
      callback: function callback($$v) {
        _vm.pageNo = $$v;
      },
      expression: "pageNo"
    }
  }, "v-pagination", _vm.$attrs, false), _vm.$listeners)), _vm._v(" "), _c("v-select", {
    staticStyle: {
      "max-width": "100px"
    },
    attrs: {
      dense: "",
      items: _vm.sizeOptions,
      "item-text": "label",
      "item-value": "value",
      outlined: "",
      "hide-details": ""
    },
    on: {
      change: _vm.handleChangeSizeSelect
    },
    model: {
      value: _vm.pageSize,
      callback: function callback($$v) {
        _vm.pageSize = $$v;
      },
      expression: "pageSize"
    }
  })], 1);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined); //


var script = {
  name: 'UTable',
  components: {
    UPagination: __vue_component__$1
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
     * 指定 v-data-table 的 ref
     * */
    tableRef: {
      type: String,
      "default": ''
    },

    /**
     * 分页参数 参考 [Vuetify Pagination](https://vuetifyjs.com/components/paginations) 文档
     * */
    paginationProps: {
      type: Object,
      "default": function _default() {
        return {};
      }
    },

    /**
     * 远程请求函数， promise函数
     * 返回的数据必须是 **`{ rows: [], total: 10 }`**
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
        return _objectSpread(_objectSpread({}, r), {}, _defineProperty({}, idx, [].concat(_toConsumableArray(r[idx]), [v])));
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
      var requestFn = (_this$serveRequest = this.serveRequest) === null || _this$serveRequest === void 0 ? void 0 : _this$serveRequest.call(this, _objectSpread(_objectSpread({}, this.pagination), this.requestParams || {}));

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

        var containerEl = _this2.$refs.tableWrapper.querySelector('.v-data-table__wrapper');

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
/* script */

var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    ref: "tableWrapper"
  }, [_c("v-data-table", _vm._g(_vm._b({
    ref: _vm.tableRef,
    attrs: {
      "hide-default-footer": "",
      "fixed-header": "",
      loading: _vm.loading,
      items: _vm.dataSource,
      "items-per-page": _vm.tableMaxNumber,
      height: _vm.tableHeight
    },
    scopedSlots: _vm._u([_vm._l(_vm.slots[1], function (name) {
      return {
        key: name,
        fn: function fn(bindData) {
          return [_vm._t(name, null, null, bindData)];
        }
      };
    })], null, true)
  }, "v-data-table", _vm.$attrs, false), _vm.$listeners), [_vm._l(_vm.slots[0], function (name) {
    return _vm._t(name, null, {
      slot: name
    });
  })], 2), _vm._v(" "), !_vm.isScroll && _vm.showPagination && !!_vm.total ? _c("div", {
    staticClass: "flex-box middle mt-4"
  }, [_c("u-pagination", _vm._b({
    attrs: {
      total: _vm.total,
      "total-visible": 7,
      size: _vm.currentPageSize
    },
    on: {
      "update:size": function updateSize($event) {
        _vm.currentPageSize = $event;
      }
    },
    model: {
      value: _vm.currentPage,
      callback: function callback($$v) {
        _vm.currentPage = $$v;
      },
      expression: "currentPage"
    }
  }, "u-pagination", _vm.paginationProps, false))], 1) : _vm._e()], 1);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

__vue_component__.install = function (Vue) {
  Vue.component(__vue_component__.name, __vue_component__);
};

module.exports = __vue_component__;
//# sourceMappingURL=index.js.map