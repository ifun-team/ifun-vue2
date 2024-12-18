<template>
  <div class="example">
    <div class="example-item">
      <p>1. 基础使用</p>
      <IFunPdf :options="options" :viewportOptions="{ scale: 5 }" />
    </div>
  </div>
</template>
<script>
import pdfUrl from "../test.pdf?url";
export default {
  data() {
    return {
      options: {
        url: pdfUrl,
      },
    };
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.example {
}
</style>
