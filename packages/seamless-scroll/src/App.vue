<template>
  <div class="example">
    <div class="example-item">
      <p>1. 基础使用</p>
      <IFunSeamlessScroll :data="data" direction="horizontal" v-slot="info">
        <div class="scroll-item">
          <span>{{ info.label }}</span>
        </div>
      </IFunSeamlessScroll>
    </div>
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
    this.data = Array(40)
      .fill()
      .map((val, index) => ({
        value: "数据_" + index,
        label: "数据_" + index,
      }));
  },
};
</script>
<style lang="less" scoped>
.example {
  .example-item {
    width: 300px;
    height: 300px;
  }
}
</style>
