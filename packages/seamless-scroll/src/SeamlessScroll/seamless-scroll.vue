<template>
  <div
    ref="scroll"
    class="ifun-seamless-scroll"
    @mouseenter="enter"
    @mouseleave="leave"
  >
    <slot name="empty">
      <p class="empty" v-if="viewData.length < 1">暂无数据</p>
    </slot>
    <div
      ref="box"
      class="scroll-box"
      :class="{ horizontal: isHorizontal }"
      :style="boxStyle"
    >
      <template v-for="item in viewData">
        <slot v-bind="item"></slot>
      </template>
    </div>
  </div>
</template>
<script>
/**
 * 默认配置项
 */
const defaultOptions = {
  // 数据取值key
  value: "value",
  label: "label",
  // 默认低于100 虚拟滚动时一页展示多少
  pageSize: 100,
  // 设置一个用于可以铺满可视窗口的数据数量
  fullSize: 20,
};
export default {
  name: "IFunSeamlessScroll",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 滚动方向
    direction: {
      type: String,
      default: "vertical",
      validator: (value) => ["vertical", "horizontal"].includes(value),
    },
    // 是否为虚拟列表
    virtual: Boolean,
    speed: {
      type: Number,
      default: () => 1,
    },
    options: {
      type: Object,
      default: () => defaultOptions,
    },
  },
  data() {
    return {
      // 动画帧对象
      animationFrame: null,
      // 被滚动元素样式
      translate: 0,
      scrollOptions: {},
      viewData: [],
    };
  },
  computed: {
    boxStyle() {
      let x = 0;
      let y = 0;
      if (this.isHorizontal) {
        x = this.translate;
      } else {
        y = this.translate;
      }
      return {
        transform: `translate(${x}px, ${y}px )`,
      };
    },
    isHorizontal() {
      return this.direction === "horizontal";
    },
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newData) {
        this.translate = 0;
        this.scrollOptions = Object.assign({}, defaultOptions, this.options);
        this.viewData = [...newData];
        if (this.scrollOptions.fullSize <= newData.length) {
          this.viewData.push(...newData.slice(0, this.scrollOptions.fullSize));
        }
        // 初始化创建
        this.init();
      },
    },
  },
  mounted() {},
  methods: {
    init() {
      // this.splitData();
      this.$nextTick(() => {
        this.move();
      });
    },
    move() {
      if (this.viewData.length < 1) {
        return;
      }
      this.stop();
      this.animationFrame = requestAnimationFrame(() => {
        const { offsetHeight, offsetWidth } = this.$refs.scroll;
        const { scrollHeight, scrollWidth } = this.$refs.box;

        if (
          (scrollHeight === offsetHeight && !this.isHorizontal) ||
          (scrollWidth === offsetWidth && this.isHorizontal)
        ) {
          return;
        }
        if (
          Math.abs(this.translate + offsetHeight) >
            scrollHeight - offsetHeight &&
          !this.isHorizontal
        ) {
          this.translate = -offsetHeight;
        }

        if (
          Math.abs(this.translate + (offsetWidth * 3) / 4) >
            scrollWidth - offsetWidth &&
          this.isHorizontal
        ) {
          this.translate = (-offsetWidth * 3) / 4;
        }
        this.translate -= this.speed;

        this.move();
      });
    },
    stop() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
    },
    enter() {
      this.stop();
    },
    leave() {
      this.move();
    },
  },
};
</script>
<style lang="less" scoped>
.ifun-seamless-scroll {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .scroll-box {
    display: flex;
    flex-direction: column;
    &.horizontal {
      flex-direction: row;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
