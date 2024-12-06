<template>
  <div class="ifun ifun-pdf">
    <div class="pdf-container" ref="container"></div>
  </div>
</template>
<script>
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.min.mjs";
// 设置pdf.worker.js文件的引入地址
import pdfWork from "pdfjs-dist/legacy/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = pdfWork;

export default {
  name: "IFunPdf",
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      totalPages: 0,
      loading: false,
    };
  },
  watch: {
    options: {
      immediate: true,
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.initPdf();
        });
      },
    },
  },
  mounted() {
    // this.initPdf();
  },
  methods: {
    clear() {
      this.$refs.container.innerHTML = "";
    },
    async initPdf() {
      if (!this.options.url && !this.options.data) {
        this.clear();
        return;
      }
      const container = this.$refs.container;
      try {
        this.loading = true;
        this.$emit("ready");
        const doc = await pdfjs.getDocument({
          ...this.options,
        }).promise;
        this.totalPages = doc.numPages;
        // 读取每一页
        for (let i = 0; i < this.totalPages; i++) {
          const page = await doc.getPage(i + 1);

          const viewport = page.getViewport({ scale: 1.0 });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const context = canvas.getContext("2d");

          await page.render({
            canvasContext: context,
            viewport,
          });

          // 将页面追加到dom
          container.appendChild(canvas);
        }
        this.$emit("finish");
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.ifun.ifun-pdf {
  width: 100%;
  height: 100%;
  .pdf-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    text-align: center;
  }
}
</style>
