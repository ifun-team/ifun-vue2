import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
// elementUI
Vue.use(ElementUI);

new Vue(App).$mount("#app");
