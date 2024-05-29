import Vue from "vue";
import IFunPdf from "./entry";

import App from "./App.vue";
Vue.use(IFunPdf);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
