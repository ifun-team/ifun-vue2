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
    // this.data = new Array(100).fill(0).map((item, index) => ({
    //   value: index,
    //   label: "数据" + index,
    // }));
    setTimeout(() => {
      this.data = new Array(100000).fill(0).map((item, index) => ({
          value: index,
          label: "数据" + index,
        }));
    }, 5000);
  },
  render(h) {
    return h("IFunSeamlessScroll", {
      props: {
        data: this.data,
        virtual: true,
        scroll: this.data.length > 10,
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
