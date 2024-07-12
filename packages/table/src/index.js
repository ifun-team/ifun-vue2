import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import IFunTable from "./entry";
import App from "./App.vue";
// elementUI
Vue.use(ElementUI);
Vue.use(IFunTable);

new Vue(App).$mount("#app");
