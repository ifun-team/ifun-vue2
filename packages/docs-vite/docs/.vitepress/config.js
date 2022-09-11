// sidebar
const sidebar = {
  "/": [
    { text: "快速开始", link: "/" },
    {
      text: "lazy-load 数据懒加载",
      link: "/components/lazy-load/",
    },
    { text: "无缝滚动", link: "/components/seamless-scroll" },
  ],
};

// config
const config = {
  title: "IFun-Vue2",
  base: "/ifun-vue2/",
  description: "vue2 日常开发业务经验，常用组件封装",
  themeConfig: { sidebar },
  markdown: {
    config(md) {
      // 添加demoblock
      const { demoBlockPlugin } = require("vitepress-theme-demoblock");
      md.use(demoBlockPlugin);
    },
  },
};

// module.exports = {
//   markdown: {
//     config(md) {
//       // 添加demoblock
//       const { demoBlockPlugin } = require("vitepress-theme-demoblock");
//       md.use(demoBlockPlugin);
//     },
//   },
// };

export default config;
