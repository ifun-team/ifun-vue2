import Vue from "vue";
import IFunSeamlessScroll from "./entry";

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
