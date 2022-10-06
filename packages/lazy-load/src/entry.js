// 下拉组件导出
import LazySelect from "./LazySelect/lazy-select.vue";
// 指令导出
import VLazyLoad from "./vLazyLoad";

// 列表懒加载
import LazyList from "./LazyList/lazy-list.vue";

// 全部导入，install 方法
export default {
  install(app) {
    // lazy-select 下拉组件
    app.component(LazySelect.name, LazySelect);
    // 懒加载列表
    app.component(LazyList.name, LazyList);

    // 注册指令
    app.directive("lazy-load", VLazyLoad);
  },
};
