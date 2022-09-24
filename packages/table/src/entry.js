// 组件导出
import Table from "./Table/table.vue";

// 全部导入，install 方法
export default {
  install(app) {
    // 组件
    app.component(Table.name, Table);
  },
};
