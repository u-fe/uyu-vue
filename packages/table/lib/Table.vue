<template>
  <div ref="table">
    <v-data-table
      ref="vTable"
      hide-default-footer
      fixed-header
      v-bind="$attrs"
      :loading="loading"
      :items="dataSource"
      :items-per-page="tableMaxNumber"
      :height="tableHeight"
      v-on="$listeners"
    >
      <template v-for="name of Object.keys($scopedSlots)" #[name]="bindData">
        <slot :name="name" v-bind="bindData" />
      </template>
    </v-data-table>
    <div
      v-if="!isScroll && showPagination && !!total"
      class="flex-box middle mt-4"
    >
      <u-pagination
        v-model="currentPage"
        :total="total"
        :total-visible="7"
        :size.sync="currentPageSize"
        v-bind="paginationProps"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import UPagination from '@uyu-vue/pagination'

export default {
  name: 'UTable',
  components: {
    UPagination,
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
  },

  watch: {
    requestParams: {
      immediate: true,
      deep: true,
      handler() {
        if (this.isRemote) {
          // 远程则复位
          this.resetPaginationRequest()
        }
      },
    },
    pagination(v) {
      // if (v.pageNum === 1) {
      //   this.dataSource = []
      // }
      this.emitPagination()
      this.handleRequest()
    },

    data: {
      immediate: true,
      handler(nv) {
        if (!this.isRemote) {
          // 不是远程则复位
          this.resetPaginationRequest()
        }
      },
    },
  },

  created() {
    this.initScrollContainer()
  },

  mounted() {
    this.emitPagination()
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
        this.heightCalcEnd = false
        this.currentPage++
      }
    },

    handleRequest() {
      if (!this.isRemote) {
        this.handleLocalRequest()
      } else {
        this.handleRemoteRequeset()
      }
    },

    // 本地分页模拟请求（前端分页）
    handleLocalRequest() {
      const { pageNum, pageSize } = this.pagination

      this.dataSource = this.data?.slice?.(
        this.isScroll ? 0 : (pageNum - 1) * pageSize,
        pageNum * pageSize
      )
      this.total = this.data?.length ?? 0
    },

    // 远程接口请求
    handleRemoteRequeset() {
      this.loading = true

      const requestFn = this.serveRequest?.({
        ...this.pagination,
        ...(this.requestParams || {}),
      })

      if (typeof requestFn?.then === 'function') {
        requestFn
          .then((data) => {
            if (this.isScroll) {
              if (this.pagination.pageNum === 1) {
                this.scrollWrapperEl.scrollTop = 0
                this.dataSource = data.rows ?? []
              } else {
                this.dataSource = [...this.dataSource, ...(data.rows ?? [])]
              }
            } else {
              this.dataSource = data.rows
            }
            this.total = data.total
          })
          .catch(() => {
            this.dataSource = []
            this.total = 0
          })
          .finally(() => {
            this.loading = false
          })
      } else {
        this.loading = false
      }
    },

    emitPagination() {
      this.$emit('onPagination', this.pagination)
      this.$emit('update:paginationParams', this.pagination)
    },

    resetPaginationRequest() {
      if (this.currentPage === 1) {
        // this.dataSource = []
        // this.total = 0
        this.handleRequest()
      } else {
        this.currentPage = 1
      }
    },

    // 初始化滚动容器
    initScrollContainer() {
      this.$nextTick(() => {
        if (!this.isScroll || this.scrollWrapperEl) return
        // 只有滚动才执行下面操作
        const containerEl = this.$refs.table.querySelector(
          '.v-data-table__wrapper'
        )

        if (!containerEl) return

        const containerTableEl = containerEl.querySelector('table')

        const listenersScroll = _.debounce(this.handleScroll, 100)

        const listenersHeight = _.throttle(() => {
          let height = parseFloat(
            window.getComputedStyle(containerTableEl).getPropertyValue('height')
          )
          if (height !== this.contentHeight) {
            this.contentHeight = height
            this.heightCalcEnd = true
          }
        }, 500)

        containerTableEl.addEventListener('animationend', listenersHeight)
        containerTableEl.addEventListener('transitionend', listenersHeight)
        containerEl.addEventListener('scroll', listenersScroll)

        let observer = new MutationObserver(listenersHeight)
        observer.observe(containerTableEl, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
        })

        this.scrollWrapperEl = containerEl

        this.$once('beforeDestroyed', () => {
          if (observer) {
            observer.disconnect()
          }
          containerTableEl.removeEventListener('animationend', listenersHeight)
          containerTableEl.removeEventListener('transitionend', listenersHeight)
          containerEl.removeEventListener('scroll', listenersScroll)
        })
      })
    },
  },
}
</script>
