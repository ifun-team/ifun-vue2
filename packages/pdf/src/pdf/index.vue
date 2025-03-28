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
    // 是否自动适应屏幕大小，默认不开启
    fitView: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 总页码
      totalPages: 0,
      // 是否正在加载pdf文件
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
    getCanvas(index) {
      const page = this.$refs.container.children[index];
      if (!page) return;

      return page.querySelector("canvas");
    },
    // 获取pdf容器
    getPdf() {
      return {
        root: this.$refs.container,
        totalPages: this.totalPages,
        clear: () => {
          this.clear();
        },
        getCanvas: (index) => {
          return this.getCanvas(index);
        },
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

      const fragment = document.createDocumentFragment();
      try {
        this.loading = true;
        this.$emit("ready");
        const doc = await pdfjs.getDocument({
          ...this.options,
        }).promise;
        this.totalPages = doc.numPages;

        const container = this.$refs.container;
        const { width } = container.getBoundingClientRect();
        // 读取每一页
        for (let i = 0; i < this.totalPages; i++) {
          const page = await doc.getPage(i + 1);

          const viewport = page.getViewport(this.viewportOptions);
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          // 根据视口大小缩放到100%

          const { scale } = this.viewportOptions;
          // 缩放比例、正常大小
          let ratio = 1 / scale;
          // 正常比例的页面大小
          let scaleWidth = (viewport.width * 1) / scale;
          let scaleHeight = (viewport.height * 1) / scale;
          // 如果要是配屏幕大小

          if (this.fitView) {
            const fitViewRatio = width / scaleWidth;
            // + 偏移量
            if (
              (fitViewRatio < 1 && fitViewRatio < 0.95) ||
              (fitViewRatio > 1 && fitViewRatio > 1.05)
            ) {
              ratio = ratio * fitViewRatio;
              scaleWidth = scaleWidth * fitViewRatio;
              scaleHeight = scaleHeight * fitViewRatio;
            }
          }
          canvas.style = `transform:scale(${ratio});transform-origin:0 0;`;

          const context = canvas.getContext("2d");

          await page.render({
            canvasContext: context,
            viewport,
          });

          // 将页面追加到dom
          const div = document.createElement("div");
          div.appendChild(canvas);
          div.style.width = `${scaleWidth}px`;
          div.style.height = `${scaleHeight}px`;
          div.style.overflow = "hidden";
          //
          fragment.appendChild(div);
        }
        // 添加到页面中
        container.appendChild(fragment);

        this.$emit("finish", this.getPdf());
      } catch (err) {
        console.error(err);
        this.$emit("error", err);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.ifun.ifun-pdf {
  .pdf-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
