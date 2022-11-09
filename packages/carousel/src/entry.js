// 下拉组件导出
import Carousel from "./Carousel/carousel.vue";

// 全部导入，install 方法
export default {
  install(app) {
    // 轮播组件
    app.component(Carousel.name, Carousel);
  },
};
