<template>
  <div class="ifun-carousel">
    <ul class="list-box">
      <li class="list-item" v-for="(item, index) in data" :key="index">
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "IFunCarousel",
  inheritAttrs: false,
  props: {
    // 所有的数据源
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    // const $this = this;
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.ifun-carousel {
  width: 100%;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .list-box {
    .list-item {
      width: 100px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #fff;
      background: rgba(0, 0, 0, 0.3);
      &:nth-of-type(1) {
        transform: translate(600px, 0);
      }
      &:nth-of-type(2) {
        transform: translate(400px, 80px);
      }
      &:nth-of-type(3) {
        transform: translate(420px, 180px);
      }
      &:nth-of-type(4) {
        transform: translate(620px, 240px);
      }
      &:nth-of-type(5) {
        transform: translate(860px, 20px);
      }
      &:nth-of-type(6) {
        transform: translate(860px, -280px);
      }
    }
  }
}
</style>
