import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import IFunTable from "./entry";

// elementUI
Vue.use(ElementUI);
Vue.use(IFunTable);

new Vue({
  data() {
    return {
      tableOptions: {
        data: [],
        columns: [],
      },
      pageOptions: {
        total: 100,
        pageSize: 10,
        pageNum: 1,
        background: true,
        layout: "total,sizes, prev, pager, next, jumper",
      },
    };
  },
  created() {
    this.tableOptions.columns = [
      {
        prop: "id",
        label: "id",
      },
      {
        prop: "name",
        label: "名称",
      },
      {
        prop: "address",
        label: "地址",
      },
    ];
    this.tableOptions.data = new Array(20).fill(0).map((item, index) => ({
      id: index,
      name: "数据" + index,
      address: "北京朝阳大妈跳舞广场",
    }));
  },
  render(h) {
    return h("IFunTable", {
      props: {
        tableOptions: this.tableOptions,
        pageOptions: this.pageOptions,
      },
    });
  },
}).$mount("#app");
