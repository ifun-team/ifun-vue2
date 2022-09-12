// 下拉组件导出
import SeamlessScroll from "./SeamlessScroll/seamless-scroll.vue";

// 全部导入，install 方法
export default {
  install(app) {
    // 组件
    app.component(SeamlessScroll.name, SeamlessScroll);
  },
};
