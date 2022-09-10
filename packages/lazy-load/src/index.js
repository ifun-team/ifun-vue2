import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import IFunLazyLoad from "./entry";

// elementUI
Vue.use(ElementUI);
Vue.use(IFunLazyLoad);

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
    return h("IFunLazySelect", {
      props: {
        data: this.data,
      },
    });
  },
}).$mount("#app");
