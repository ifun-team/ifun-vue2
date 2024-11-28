<br />

<h1 align="center">IFunPdf</h1>
<p align='center'>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/pdf">
        <img src="https://img.shields.io/npm/v/@ifun-vue2/pdf" />
    </a>
    <a href="https://github.com/ifun-team/ifun-vue2/tree/main/packages/pdf#license">
        <img src="https://img.shields.io/npm/l/@ifun-vue2/pdf" />
    </a>
</p>
<a href="https://github.com/ifun-team/ifun-vue2/actions/workflows/main.yml">
        <img src="https://github.com/ifun-team/ifun-vue2/actions/workflows/main.yml/badge.svg" />
    </a>
<br />
<p>pdf文件预览.</p>

## 安装

```sh
npm i @ifun-vue2/pdf
```

使用

```js
import IFunPdf from "@ifun-vue2/pdf";
// 样式
import "@ifun-vue2/pdf/dist/style.css";
// 使用
Vue.use(IFunPdf);
```

局部注册，导入组件使用：

```js
import { IFunPdf } from "@ifun-vue2/pdf";
// 样式
import "@ifun-vue2/pdf/dist/style.css";
```

## 特点

- 实现 pdf 文件的预览

## 基本使用，数据滚动

通过传入`data`, 数据类型为数组。

```vue
<template>
  <div>
    <IFunPdf :options="options" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: {
        url: pdfUrl,
      },
    };
  },
};
</script>
```

## API 属性一览

| props   | 说明                                        | 默认值 |
| ------- | ------------------------------------------- | ------ |
| options | 初始化文档对象，同 API`getDocument`参数一致 |        |

## `options`

| props   | 说明                                                         | 默认值 |
| ------- | ------------------------------------------------------------ | ------ |
| url     | `String`pdf 文档地址，需要同源                               |        |
| data    | `TypedArray\|ArrayBuffer`,二进制数据、base64（需要`atob()`） |        |
| 其他... |                                                              |        |
