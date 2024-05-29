// 下拉组件导出
import Pdf from "./pdf/index.vue";

// 全部导入，install 方法
export default {
  install(app) {
    // 组件
    app.component(Pdf.name, Pdf);
  },
};
