<template>
  <div class="u-pagination">
    <div class="u-pagination_total_text">共{{ total }}条</div>

    <v-pagination
      v-model="pageNo"
      :length="pageCount"
      v-bind="$attrs"
      :total="total"
      v-on="$listeners"
    />

    <v-select
      class="u-pagination_sizes_select"
      v-model="pageSize"
      dense
      :items="sizeOptions"
      item-text="label"
      item-value="value"
      outlined
      hide-details
      attach
      @change="handleChangeSizeSelect"
    />
  </div>
</template>

<script>
export default {
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
.u-pagination {
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