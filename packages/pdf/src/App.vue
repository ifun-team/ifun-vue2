<template>
  <div class="example">
    <div class="example-item">
      <p>1. 基础使用</p>
      <IFunPdf
        ref="pdf"
        :options="options"
        :viewportOptions="{ scale: 5 }"
        @finish="loadedPdf"
      />
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
  methods: {
    loadedPdf() {
      const { getCanvas } = this.$refs.pdf.getPdf();

      console.log(getCanvas(0));
    },
  },
};
</script>
<style lang="less" scoped>
.example {
}
</style>
