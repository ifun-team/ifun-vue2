<template>
  <div class="ifun-lazy-list" v-lazy-load="lazyOption">
    <ul class="list-box" ref="box">
      <li
        class="list-item"
        v-for="(item, index) in viewData"
        :key="item[options.value] || index"
      >
        <slot v-if="$attrs.params" :params="item"></slot>
        <span v-else>{{ item[options.label] || item }}</span>
      </li>
    </ul>
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
    // 渲染的属性
    options: {
      type: Object,
      default: () => ({
        value: "value",
        label: "label",
      }),
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
      const data = this.data.slice(0, this.size * this.page);
      return data;
    },
  },
  mounted() {},
  methods: {
    loadData() {
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
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .list-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .list-item {
      padding: 15px 10px;
    }
  }
}
</style>
