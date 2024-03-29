<template>
  <div
    ref="scroll"
    class="ifun-seamless-scroll"
    @mouseenter="enter"
    @mouseleave="leave"
    @mousewheel="handleScroll"
  >
    <slot name="empty">
      <p v-if="total === 0">暂无数据</p>
    </slot>
    <div class="scroll-box" :style="boxStyle">
      <ul class="pre-data">
        <li
          v-for="item in preData"
          :key="item[scrollOptions.value]"
          :style="itemStyle"
          @click="handleClickItem(item, $event)"
        >
          <slot :params="item">
            {{ item[scrollOptions.label] }}
          </slot>
        </li>
      </ul>
      <ul class="next-data" v-if="scroll">
        <li
          v-for="item in nextData"
          :key="item[scrollOptions.value]"
          :style="itemStyle"
          @click="handleClickItem(item, $event)"
        >
          <slot :params="item">
            {{ item[scrollOptions.label] }}
          </slot>
        </li>
      </ul>
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
  // 元素占比 竖向滚动时为高度，横向滚动时为豪赌
  itemWidth: 30,
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
    // 是否为虚拟列表
    virtual: Boolean,
    // 滚轮支持 滚动
    whellScroll: {
      type: Boolean,
      default: true,
    },
    // 是否需要滚动
    scroll: {
      type: Boolean,
      default: true,
    },
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
      copyData: [],
      // 第一页数据
      preData: [],
      // 第二页数据
      nextData: [],
      // 动画帧对象
      animationFrame: null,
      // 被滚动元素样式
      translateY: 0,
      // 容器宽度、高度
      width: 0,
      height: 0,
      scrollOptions: {},
      total: 0,
    };
  },
  computed: {
    boxStyle() {
      return {
        transform: `translate(0, ${this.translateY}px )`,
      };
    },
    itemStyle() {
      const { itemWidth } = this.scrollOptions;
      return {
        height: `${itemWidth}px`,
      };
    },
    // 视口实际可看到的数据数量
    realCount() {
      return Math.round(this.height / this.scrollOptions.itemWidth);
    },
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newData) {
        this.preData = [];
        this.nextData = [];
        this.copyData = [...newData];
        this.translateY = 0;
        this.total = this.copyData.length;
        this.init();
      },
    },
    translateY() {
      this.handleDataScorll();
    },
  },
  mounted() {
    // 当前可视窗口尺寸
    const { width, height } = this.$refs.scroll.getBoundingClientRect();
    this.width = width;
    this.height = height;
  },
  methods: {
    /**
     * 实现滚动
     */
    handleScroll(event) {
      if (!this.whellScroll) {
        return;
      }
      if (event.deltaY > 0) {
        // 向下滚动
        this.translateY -= 5;
      } else {
        if (this.translateY > 0) {
          return;
        }
        this.translateY += 5;
      }
      //
    },
    handleClickItem(info) {
      this.$emit("click", info);
    },
    init() {
      this.scrollOptions = Object.assign({}, defaultOptions, this.options);

      if (!this.virtual || this.scrollOptions.pageSize > this.total) {
        // 非虚拟列表管滚动，则直接展示所有数据
        this.scrollOptions.pageSize = this.total;
      }
      if (this.total > 0) {
        this.splitData();
        this.move();
      }
    },
    move() {
      if (!this.scroll) {
        return;
      }
      this.stop();
      this.animationFrame = requestAnimationFrame(() => {
        if (this.total > 0) {
          this.translateY -= this.speed;
        }

        this.move();
      });
    },
    splitData() {
      if (!this.virtual) {
        this.preData = [...this.copyData];
        this.nextData = [...this.copyData];
        return;
      }
      // 只有在虚拟列表时，才调换数据位置
      this.copyData = [...this.copyData, ...this.preData];
      // pre
      this.preData = this.copyData.splice(0, this.scrollOptions.pageSize);
      // next
      this.nextData = this.copyData.slice(0, this.scrollOptions.pageSize);
      if (this.nextData.length < 1) {
        this.nextData = [...this.preData];
      }
    },
    /**
     * 监听滚动的距离
     */
    handleDataScorll() {
      if (
        Math.abs(this.translateY) <
        this.scrollOptions.pageSize * this.scrollOptions.itemWidth
      ) {
        return;
      }
      // this.stop();
      // 第一页已滚动完成
      if (this.virtual) {
        this.splitData();
      }
      this.translateY = 0;
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
  overflow: hidden;
  .scroll-box {
    transition: all 0ms ease-in 0s;
    overflow: hidden;
    display: block;
  }
  ul {
    margin: 0;
    list-style: none;
  }
}
</style>
