<template>
  <div class="app">
    <h2>IFun-Carousel</h2>
    <IFunCarousel :data="data" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.data = new Array(6).fill(0).map((item, index) => ({
      value: index + "",
      label: "数据" + index,
    }));
  },
};
</script>
