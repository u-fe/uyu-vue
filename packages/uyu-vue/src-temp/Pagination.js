/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 440:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ components_Pagination)
});

;// CONCATENATED MODULE: ../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Pagination/Pagination.vue?vue&type=template&id=fb82b462&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "d-flex align-center justify-center" },
    [
      _c("div", [_vm._v("共" + _vm._s(_vm.total) + "条")]),
      _vm._v(" "),
      _c(
        "v-pagination",
        _vm._g(
          _vm._b(
            {
              attrs: { length: _vm.pageCount, total: _vm.total },
              model: {
                value: _vm.pageNo,
                callback: function($$v) {
                  _vm.pageNo = $$v
                },
                expression: "pageNo"
              }
            },
            "v-pagination",
            _vm.$attrs,
            false
          ),
          _vm.$listeners
        )
      ),
      _vm._v(" "),
      _c("v-select", {
        staticStyle: { "max-width": "100px" },
        attrs: {
          dense: "",
          items: _vm.sizeOptions,
          "item-text": "label",
          "item-value": "value",
          outlined: "",
          "hide-details": ""
        },
        on: { change: _vm.handleChangeSizeSelect },
        model: {
          value: _vm.pageSize,
          callback: function($$v) {
            _vm.pageSize = $$v
          },
          expression: "pageSize"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true


;// CONCATENATED MODULE: ./src/components/Pagination/Pagination.vue?vue&type=template&id=fb82b462&

;// CONCATENATED MODULE: ../../node_modules/vue-loader/lib/index.js??vue-loader-options!./src/components/Pagination/Pagination.vue?vue&type=script&lang=js&
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
//

/* harmony default export */ const Paginationvue_type_script_lang_js_ = ({
  name: 'UPagination',

  props: {
    /** 当前页码 */
    value: {
      type: Number,
      default: 1,
    },
    /** 页面展示的数量 支持 .sync 修饰符 **/
    size: {
      type: Number,
      default: 20,
    },

    /** 每页显示数量 选择器的选项设置 **/
    sizes: {
      type: Array,
      default: () => [10, 20, 30, 50, 100],
    },

    /** 总条目数 **/
    total: {
      type: Number,
      default: 10,
    },
  },

  data() {
    return {
      pageNo: this.value,
      pageSize: this.size,
    }
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
       * 被绑定模型的更新（页码）
       * @type {Event}
       */
      this.$emit('input', v)
      /**
       * 修改当前页码 触发
       * @type {Event}
       */
      this.$emit('page-change', v)
    },
    pageSize(v) {
      /**
       * 更新绑定的页面数量
       * @type {Event}
       */
      this.$emit('update:size', v)
      /**
       * 需改页面数量 触发
       * @type {Event}
       */
      this.$emit('size-change', v)

      /**
       * 被绑定模型的更新（页码）
       * @type {Event}
       */
      this.$emit('input', 1)
      /**
       * 修改当前页码 触发
       * @type {Event}
       */
      this.$emit('page-change', 1)
    },
  },

  methods: {
    handleChangeSizeSelect(value) {
      this.pageSize = value
    },
  },
});

;// CONCATENATED MODULE: ./src/components/Pagination/Pagination.vue?vue&type=script&lang=js&
 /* harmony default export */ const Pagination_Paginationvue_type_script_lang_js_ = (Paginationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(440);
;// CONCATENATED MODULE: ./src/components/Pagination/Pagination.vue





/* normalize component */
;
var component = (0,componentNormalizer/* default */.Z)(
  Pagination_Paginationvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/components/Pagination/Pagination.vue"
/* harmony default export */ const Pagination = (component.exports);
;// CONCATENATED MODULE: ./src/components/Pagination/index.js


Pagination.install = function (Vue) {
  Vue.component(Pagination.name, Pagination)
}

/* harmony default export */ const components_Pagination = (Pagination);

})();

module.exports = __webpack_exports__;
/******/ })()
;