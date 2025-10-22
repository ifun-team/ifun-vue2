<template>
  <div class="ifun-lazy-list" v-lazy-load="lazyOption">
    <template v-for="item in viewData">
      <slot v-bind="item"></slot>
    </template>
  </div>
</template>
<script>
export default {
  name: "IFunLazyList",
  inheritAttrs: false,
  props: {
    // 所有的数据源
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
    size: {
      type: Number,
      default: () => 15,
    },
    // 是否进行远程加载
    lazy: {
      type: Boolean,
      default: false,
    },
    // 分页查询时，调用外部函数
    load: {
      type: Function,
    },
  },
  data() {
    const $this = this;
    return {
      // 用户下拉选择
      page: 1,
      lazyOption: {
        loadData: $this.loadData,
        distance: 20,
        callback: (fn) => {
          // 这里是在组件销毁前, 移除监听事件.
          $this.$once("hook:beforeDestroy", () => fn());
        },
      },
    };
  },
  computed: {
    /**
     * 当前下拉展示的
     */
    viewData() {
      if (this.lazy) {
        return this.data;
      }
      const data = this.data.slice(0, this.size * this.page);
      return data;
    },
  },
  methods: {
    loadData() {
      if (this.lazy) {
        if (!this.load) {
          console.error("懒加载`lazy`数据时，加载函数`load`必须绑定！");
          this.load();
        }
        this.load();
        return;
      }
      if (this.size * this.page >= this.data.length) {
        return;
      }
      this.page++;
    },
  },
};
</script>
<style lang="less" scoped>
.ifun-lazy-list {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
