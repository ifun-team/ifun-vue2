import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import IFunSeamlessScroll from "./entry";

// elementUI
Vue.use(ElementUI);
Vue.use(IFunSeamlessScroll);

new Vue({
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.data = new Array(100).fill(0).map((item, index) => ({
      value: index,
      label: "数据" + index,
    }));
  },
  render(h) {
    return h("IFunSeamlessScroll", {
      props: {
        data: this.data,
        virtual: true,
        options: {
          pageSize: 20,
        },
      },
      style: {
        height: "300px",
      },
    });
  },
}).$mount("#app");
