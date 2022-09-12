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
      type: [String, Array],
      default: "",
      // validator(value) {
      //   // 如果是多选则，绑定的值，必须是一个数组。
      //   //
      //   return this.$attrs.multiple && Array.isArray(value);
      // },
    },
    // 所有的数据源
    data: {
      type: Array,
      required: true,
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
    isMulti() {
      return this.$attrs.multiple;
    },
    /**
     * 当前下拉展示的
     */
    viewData() {
      let data = this.data.slice(0, this.size * this.page);
      if (
        this.checked === "" ||
        this.checked === undefined ||
        this.checked === null ||
        this.checked.length < 1
      ) {
        return data;
      }

      // 标记已有的数据
      let markValue = [];
      // 分割的数据是否有当前选中的数据
      let info = data.reduce((arr, item) => {
        let value = item[this.selectProps.value];
        let bool = false;
        // 多选
        if (this.isMulti) {
          bool = this.checked.includes(value);
        } else {
          bool = this.checked === value;
        }
        if (bool) {
          markValue.push(value);
          arr.push(item);
        }
        return arr;
      }, []);
      if (
        info &&
        (this.isMulti
          ? markValue.length === this.checked
          : markValue.length === 1)
      ) {
        return data;
      }
      // 总数据中是否有选中的数据
      info = this.data.reduce((arr, item) => {
        let value = item[this.selectProps.value];
        if (markValue.includes(value)) {
          return arr;
        }
        let bool = false;
        // 多选
        if (this.isMulti) {
          bool = this.checked.includes(value);
        } else {
          bool = this.checked === value;
        }
        if (bool) {
          arr.push(item);
        }
        return arr;
      }, []);
      if (info) {
        data.unshift(...info);
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
