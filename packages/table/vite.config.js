import { defineConfig } from "vite";
import path from "path";
// vue
import vue2 from "@vitejs/plugin-vue2";
import vueJsx from "@vitejs/plugin-vue2-jsx";

// rollup options
const rollupOptions = {
  external: ["vue", "ElementUI"],
  output: {
    globals: {
      vue: "Vue",
    },
    extend: true,
  },
};

// config vite

const config = {
  plugins: [vue2(), vueJsx()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // 库模式，编译打包
  build: {
    rollupOptions,
    minify: "terser",
    sourcemap: false,
    outDir: "./dist",
    // brotliSize: true,
    // cssCodeSplit: true,

    lib: {
      entry: "./src/entry.js",
      name: "table",
      fileName: "table",
      // 导出
      // 增加了umd，iife 会报错 it's recommanded to set `build.cssCodeSplit` to true.
      // formats: ["esm", "umd", "iife"],
      formats: ["esm", "umd", "iife"],
    },
  },
  // 单元测试
  test: {
    globals: true, // global API
    environment: "happy-dom", // 模拟真实DOM
    transformMode: {
      web: [/.[tj]sx$/], // 支持jsx语法
    },
    coverage: {
      provider: "istanbul", // 'c8'
      reporter: ["text", "json", "html"],
    },
  },
};

export default defineConfig(config);
