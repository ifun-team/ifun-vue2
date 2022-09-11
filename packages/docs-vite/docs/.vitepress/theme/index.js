import Theme from "vitepress/dist/client/theme-default";

//
import IFunLazyLoad from "../../../../lazy-load/src/entry";

// demo block
import "vitepress-theme-demoblock/theme/styles/index.css";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(IFunLazyLoad);

    // md demo
    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
  },
};
