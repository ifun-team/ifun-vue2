import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import IFunCarousel from "./entry";
import App from "./App.vue";

// elementUI
Vue.use(ElementUI);
Vue.use(IFunCarousel);

new Vue(App).$mount("#app");
