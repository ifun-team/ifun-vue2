<template>
  <div class="ifun ifun-pdf">
    <div class="pdf-container" ref="container"></div>
    <slot></slot>
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
    viewportOptions: {
      type: Object,
      default: () => ({ scale: 1 }),
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
    // 获取pdf容器
    getPdf() {
      return {
        root: this.$refs.container,
      };
    },
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

          const viewport = page.getViewport(this.viewportOptions);
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          // 根据视口大小缩放到100%

          const { scale } = this.viewportOptions;
          canvas.style = `transform:scale(${1 / scale});transform-origin:0 0;`;

          const context = canvas.getContext("2d");

          await page.render({
            canvasContext: context,
            viewport,
          });

          // 将页面追加到dom
          container.appendChild(canvas);
        }
        this.$emit("finish", { total: this.totalPages });
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
