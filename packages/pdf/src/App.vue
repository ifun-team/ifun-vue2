<template>
  <div class="example">
    <div class="example-item">
      <p>1. 基础使用</p>
      <IFunPdf :options="options" />
    </div>
  </div>
</template>
<script>
import pdfUrl from "../demo/test.pdf?url";
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
