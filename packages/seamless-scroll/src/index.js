import Vue from "vue";
import IFunSeamlessScroll from "./entry";

import App from "./App.vue";
Vue.use(IFunSeamlessScroll);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
