<template>
  <div class="ifun-lazy-select">
    <el-select
      v-lazy-load="lazyOption"
      v-bind="$attrs"
      style="width: 100%"
      v-on="$listeners"
    >
      <el-option
        v-for="item in viewData"
        :key="item[selectProps.value]"
        :value="item[selectProps.value]"
        :label="item[selectProps.label]"
      />
    </el-select>
  </div>
</template>
<script>
import emitter from "element-ui/src/mixins/emitter";

export default {
  name: "IFunLazySelect",
  mixins: [emitter],
  inheritAttrs: false,
  props: {
    // 初始选中的值
    checked: {
      type: String,
      default: "",
    },
    // 所有的数据源
    data: {
      type: Array,
      default: () => [],
    },
    // 下拉渲染options的属性
    selectProps: {
      type: Object,
      default: () => ({
        value: "value",
        label: "label",
      }),
    },
  },
  data() {
    let $this = this;
    return {
      // 用户下拉选择
      page: 1,
      size: 15,
      lazyOption: {
        loadData: $this.loadData,
        distance: 20,
        scrollBody: ".el-scrollbar__wrap", // 为el-select 滚动容器的DOM元素的class选择器
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
      let data = this.data.slice(0, this.size * this.page);
      if (!this.checked) {
        return data;
      }
      // 分割的数据是否有当前选中的数据
      let info = data.find(
        (item) => item[this.selectProps.value] === this.checked
      );
      if (info) {
        return data;
      }
      // 总数据中是否有选中的数据
      info = this.data.find(
        (item) => item[this.selectProps.value] === this.checked
      );
      if (info) {
        data.unshift(info);
      }
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
<style scoped>
.ifun-lazy-select {
  width: 100%;
}
</style>
